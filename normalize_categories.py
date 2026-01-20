import re
import os

# The 10 strict categories
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
    # Normalize model names for matching
    # e.g. "Fischbein Model 100" -> "fischbein model 100"
    # "BCM-1" -> "bcm-1"
    return name.lower().strip().replace("_", "-").replace(" ", "-")

def parse_hierarchy(md_path):
    # Map: normalized_model_name -> (Category, Subcategory)
    hierarchy_map = {}
    
    current_category = None
    current_subcategory = "General" # Default subcategory if none specified
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # H2 is Category
        if line.startswith('##'):
            cat_name = line.replace('##', '').strip()
            # Verify it matches one of strict categories (case insensitive check?)
            # The docs/products.md seems to match the user list exactly (UPPERCASE)
            current_category = cat_name
            current_subcategory = "General" # Reset subcategory
            continue
            
        # Bold line is Subcategory
        # **Subcategory**
        if line.startswith('**') and line.endswith('**'):
            current_subcategory = line.replace('**', '').strip()
            continue
            
        # List item is Model
        if line.startswith('*'):
            model_name = line.lstrip('* ').strip()
            # Also handle things like "Model (AKA ...)"
            # Let's normalize
            # We map the exact string from markdown to the cat/subcat
            # BUT products.ts has IDs and Names. We need to match against one of them.
            # Usually products.ts Names match these bullet points approximately.
            
            # Let's store a few variations for matching
            key = normalize_name_key(model_name)
            hierarchy_map[key] = (current_category, current_subcategory)
            
            # Also store just the ID part if possible? 
            # e.g. "FBK-332C" -> "fbk-332c"
            # e.g. "Union Special 80800RL" -> "union-special-80800rl" AND "80800rl"
            parts = model_name.split()
            for p in parts:
                if len(p) > 3 and any(c.isdigit() for c in p):
                     hierarchy_map[normalize_name_key(p)] = (current_category, current_subcategory)

    return hierarchy_map

def update_products_ts(ts_path, hierarchy_map):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We parse the TS content manually or regex
    # We want to replace `category: '...'` and `subcategory: '...'`
    # for each product block.
    
    # It's better to reconstruct the blocks or iterate line by line tracking state.
    
    new_lines = []
    lines = content.split('\n')
    
    current_id = None
    current_name = None
    
    # Buffer lines for a single product object so we can modify it before flushing
    product_block = []
    in_product = False
    
    for line in lines:
        # Detect start of product object
        if line.strip().startswith('{') and not in_product:
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
                
            # Detect End of product object
            if line.strip().startswith('}') or line.strip().startswith('},'):
                in_product = False
                
                # Now verify/update category/subcategory for this block
                found_match = None
                
                # Try matching by ID first
                if current_id:
                    k = normalize_name_key(current_id)
                    if k in hierarchy_map:
                        found_match = hierarchy_map[k]
                
                # Try matching by Name
                if not found_match and current_name:
                    k = normalize_name_key(current_name)
                    # Try exact match
                    if k in hierarchy_map:
                        found_match = hierarchy_map[k]
                    else:
                        # Try partial match (substring)
                        for hk in hierarchy_map:
                            if hk in k or k in hk:
                                # Safe length check to avoid "a" matching "apple"
                                if len(hk) > 3:
                                    found_match = hierarchy_map[hk]
                                    break
                
                if found_match:
                    new_cat, new_sub = found_match
                    
                    # Rebuild the block lines
                    updated_block = []
                    for bl in product_block:
                        if "category:" in bl:
                            # retain indentation
                            indent = bl.split("category:")[0]
                            updated_block.append(f"{indent}category: '{new_cat}',")
                        elif "subcategory:" in bl:
                            indent = bl.split("subcategory:")[0]
                            updated_block.append(f"{indent}subcategory: '{new_sub}',")
                        else:
                            updated_block.append(bl)
                            
                    # If subcategory was missing in original but we have it?
                    # The current products.ts usually has subcategory field.
                    # If not, we might need to insert it. 
                    # Assuming mostly present or we just updated existing lines.
                    
                    # For safety, let's assume we replaced existing lines. 
                    # If subcategory line didn't exist, we might have skipped adding it.
                    # Let's check.
                    has_sub = any("subcategory:" in l for l in updated_block)
                    if not has_sub and new_sub:
                        # Insert after category
                        final_block = []
                        for bl in updated_block:
                            final_block.append(bl)
                            if "category:" in bl:
                                indent = bl.split("category:")[0]
                                final_block.append(f"{indent}subcategory: '{new_sub}',")
                        updated_block = final_block

                    new_lines.extend(updated_block)
                else:
                    # No match found, keep original
                    # Or flag it?
                    # For now keep original
                    print(f"Warning: Could not map product {current_id} / {current_name}")
                    new_lines.extend(product_block)
                
                product_block = []
            continue
            
        new_lines.append(line)
        
    return '\n'.join(new_lines)

if __name__ == "__main__":
    md_path = "docs/products.md"
    ts_path = "src/data/products.ts"
    
    if os.path.exists(md_path) and os.path.exists(ts_path):
        h_map = parse_hierarchy(md_path)
        print(f"Built hierarchy map with {len(h_map)} entries.")
        
        # normalized keys for debugging
        # for k, v in h_map.items():
        #    print(f"{k} -> {v}")
            
        new_ts = update_products_ts(ts_path, h_map)
        
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(new_ts)
            
        print("Updated products.ts with normalized categories.")
    else:
        print("Files not found.")

