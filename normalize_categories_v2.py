import re
import os

# Strict categories check
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
    "WEIGHING SCALES"
]

def normalize_name_key(name):
    # Aggressive normalization
    # Remove special chars, lowercase
    n = name.lower()
    n = re.sub(r'[^a-z0-9]', '', n)
    return n

def cleanup_model_name_for_matching(name):
    # Remove common prefixes like 'model', 'aka'
    name = re.sub(r'\bmodel\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\baka\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\bjunko\b', '', name, flags=re.IGNORECASE) # if present
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
            current_category = line.replace('##', '').strip()
            for sc in STRICT_CATEGORIES:
                if sc.lower() == current_category.lower():
                    current_category = sc
                    break
            current_subcategory = "General"
            continue
            
        if line.startswith('**') and line.endswith('**'):
            current_subcategory = line.replace('**', '').strip()
            continue
            
        if line.startswith('*'):
            model_name = line.lstrip('* ').strip()
            
            # 1. Full normalized name
            key = normalize_name_key(model_name)
            hierarchy_map[key] = (current_category, current_subcategory)
            
            clean_name = cleanup_model_name_for_matching(model_name)
            hierarchy_map[clean_name] = (current_category, current_subcategory)

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
        
        # Robust detection logic
        if stripped.startswith("{") and not in_product:
             in_product = True
             product_block = [line]
             current_id = None
             current_name = None
             continue
             
        if in_product:
            product_block.append(line)
            
            # Extract ID
            id_match = re.search(r"id:\s*'([^']+)'", line)
            if id_match:
                current_id = id_match.group(1)
            
            # Extract Name
            name_match = re.search(r"name:\s*'([^']+)'", line)
            if name_match:
                current_name = name_match.group(1)
                
            if stripped.startswith("},") or stripped == "}":
                in_product = False
                
                # Match logic
                found = None
                
                # Try ID
                if current_id:
                    k = normalize_name_key(current_id)
                    if k in hierarchy_map:
                        found = hierarchy_map[k]
                        
                # Try Name
                if not found and current_name:
                    k = normalize_name_key(current_name)
                    if k in hierarchy_map:
                        found = hierarchy_map[k]
                    else:
                        clean_n = cleanup_model_name_for_matching(current_name)
                        if clean_n in hierarchy_map:
                            found = hierarchy_map[clean_n]
                            
                # If found, replace category and subcategory lines
                if found:
                    cat, sub = found
                    
                    # We reconstruct the block
                    updated_block = []
                    has_sub = False
                    
                    for bl in product_block:
                        if "category:" in bl:
                            indent = bl.split("category:")[0]
                            updated_block.append(f"{indent}category: '{cat}',")
                        elif "subcategory:" in bl:
                            indent = bl.split("subcategory:")[0]
                            updated_block.append(f"{indent}subcategory: '{sub}',")
                            has_sub = True
                        else:
                            updated_block.append(bl)
                            
                    if not has_sub:
                        # Add subcategory after category
                        final_block = []
                        for bl in updated_block:
                            final_block.append(bl)
                            if "category:" in bl:
                                indent = bl.split("category:")[0]
                                final_block.append(f"{indent}subcategory: '{sub}',")
                        updated_block = final_block
                        
                    new_lines.extend(updated_block)
                else:
                    # Print unmapped
                    # print(f"UNMAPPED: ID={current_id}, Name={current_name}")
                    new_lines.extend(product_block)
                
                product_block = []
            continue
            
        new_lines.append(line)
        
    return '\n'.join(new_lines)

if __name__ == "__main__":
    h_map = parse_hierarchy("docs/products.md")
    
    # Specific overrides
    manual_overrides = {
        "bcm3": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "bcm4": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "mw65": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "sm1": ("SEALING MACHINES", "Heavy Duty & Specialty"),
        # Map common mismatches
        "gk352c": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
        "bcms": ("BAG CLOSING MACHINES", "Machine Heads & Systems"),
    }
    h_map.update(manual_overrides)
    
    new_ts = update_products_ts("src/data/products.ts", h_map)
    with open("src/data/products.ts", 'w', encoding='utf-8') as f:
        f.write(new_ts)
        
    print("Done updating")
