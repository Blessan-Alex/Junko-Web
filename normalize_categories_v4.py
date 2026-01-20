import re
import os

# Strict categories check (13 items)
STRICT_CATEGORIES = [
    "BAG CLOSING MACHINES",
    "BAG CLOSING THREAD",
    "CARPET OVEREDGING MACHINES",
    "CONSUMABLES",
    "FILLING AND PACKING MACHINES",
    "PACKAGING MATERIALS",
    "PACKAGING TOOLS",
    "PORTABLE BAG CLOSERS",
    "SEALING MACHINES",
    "WEIGHING SCALES",
    "SPRING BALANCER",
    "SPARE PARTS",
    "SEWING MACHINES"
]

def normalize_name_key(name):
    n = name.lower()
    n = re.sub(r'[^a-z0-9]', '', n)
    return n

def cleanup_model_name_for_matching(name):
    name = re.sub(r'\bmodel\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\baka\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\bjunko\b', '', name, flags=re.IGNORECASE) 
    return normalize_name_key(name)

def parse_hierarchy(md_path):
    hierarchy_map = {}
    current_category = None
    current_subcategory = "General" 
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith('##'):
            raw_cat = line.replace('##', '').strip()
            # Default mapping
            found_sc = None
            for sc in STRICT_CATEGORIES:
                if sc.lower() == raw_cat.lower():
                    found_sc = sc
                    break
            
            if found_sc:
                current_category = found_sc
            else:
                current_category = raw_cat 
                
            current_subcategory = "General"
            continue
            
        if line.startswith('**') and line.endswith('**'):
            current_subcategory = line.replace('**', '').strip()
            continue
            
        if line.startswith('*'):
            model_name = line.lstrip('* ').strip()
            key = normalize_name_key(model_name)
            hierarchy_map[key] = (current_category, current_subcategory)
            clean_name = cleanup_model_name_for_matching(model_name)
            hierarchy_map[clean_name] = (current_category, current_subcategory)
            
            parts = model_name.split()
            first = parts[0]
            if any(c.isdigit() for c in first) and len(first) > 3:
                hierarchy_map[normalize_name_key(first)] = (current_category, current_subcategory)

    return hierarchy_map

def update_products_ts(ts_path, hierarchy_map):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_lines = []
    lines = content.split('\n')
    
    product_block = []
    in_product = False
    
    current_id = None
    current_name = None
    
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith("{") and not in_product:
             in_product = True
             product_block = [line]
             current_id = None
             current_name = None
             continue
             
        if in_product:
            product_block.append(line)
            
            id_match = re.search(r"id:\s*'([^']+)'", line)
            if id_match:
                current_id = id_match.group(1)
            
            name_match = re.search(r"name:\s*'([^']+)'", line)
            if name_match:
                current_name = name_match.group(1)
                
            if stripped.startswith("},") or stripped == "}":
                in_product = False
                
                found = None
                
                # Manual Checks
                manual_cat = None
                manual_sub = None
                check_str = (str(current_id) + " " + (current_name or "")).lower()
                
                if "spring balancer" in check_str or "suspended spring" in check_str:
                    manual_cat = "SPRING BALANCER"
                    manual_sub = "General"
                elif "spare part" in check_str:
                    manual_cat = "SPARE PARTS"
                    manual_sub = "General"
                elif "industrial stitching machine" in check_str:
                    manual_cat = "SEWING MACHINES"
                    manual_sub = "Industrial"
                
                if manual_cat:
                    found = (manual_cat, manual_sub)
                
                # Hierarchy Map Check
                if not found:
                    if current_id:
                        k = normalize_name_key(current_id)
                        if k in hierarchy_map:
                            found = hierarchy_map[k]
                    if not found and current_name:
                        k = normalize_name_key(current_name)
                        if k in hierarchy_map:
                            found = hierarchy_map[k]
                        else:
                            clean_n = cleanup_model_name_for_matching(current_name)
                            if clean_n in hierarchy_map:
                                found = hierarchy_map[clean_n]
                
                # Fallback: Normalize EXISTING category
                if not found:
                    # Scan block for category
                    existing_cat = None
                    existing_sub = "General"
                    for bl in product_block:
                        cat_match = re.search(r"category:\s*'([^']+)'", bl)
                        if cat_match:
                            existing_cat = cat_match.group(1)
                        sub_match = re.search(r"subcategory:\s*'([^']+)'", bl)
                        if sub_match:
                            existing_sub = sub_match.group(1)
                            
                    if existing_cat:
                        # Try to match to STRICT
                        for sc in STRICT_CATEGORIES:
                            if sc.lower() == existing_cat.lower():
                                found = (sc, existing_sub) # Use strict name
                                break
                
                # Apply updates
                if found:
                    cat, sub = found
                    
                    cleaned_block = []
                    inserted_cats = False
                    
                    for bl in product_block:
                        if "category:" in bl or "subcategory:" in bl or "subsubcategory:" in bl:
                            continue
                            
                        cleaned_block.append(bl)
                        
                        if "name:" in bl and not inserted_cats:
                            indent = bl.split("name:")[0]
                            cleaned_block.append(f"{indent}category: '{cat}',")
                            cleaned_block.append(f"{indent}subcategory: '{sub}',")
                            inserted_cats = True
                            
                    if not inserted_cats:
                        final_block = []
                        for bl in cleaned_block:
                            final_block.append(bl)
                            if "id:" in bl and not inserted_cats:
                                indent = bl.split("id:")[0]
                                final_block.append(f"{indent}category: '{cat}',")
                                final_block.append(f"{indent}subcategory: '{sub}',")
                                inserted_cats = True
                        cleaned_block = final_block
                        
                    new_lines.extend(cleaned_block)
                else:
                    # Still unmapped and no strict category match
                    print(f"STILL UNMAPPED: {current_id}")
                    new_lines.extend(product_block)
                
                product_block = []
            continue
            
        new_lines.append(line)
        
    return '\n'.join(new_lines)

if __name__ == "__main__":
    h_map = parse_hierarchy("docs/products.md")
    
    manual_overrides = {
        "bcm3": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "bcm4": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "mw65": ("SPRING BALANCER", "General"),
        "sm1": ("SEALING MACHINES", "Heavy Duty & Specialty"),
        "gk352c": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "bcms": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "80800c": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
    }
    h_map.update(manual_overrides)
    
    new_ts = update_products_ts("src/data/products.ts", h_map)
    with open("src/data/products.ts", 'w', encoding='utf-8') as f:
        f.write(new_ts)
        
    print("Done v4 updating")
