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

# Explicit map for old legacy names to new strict names
CATEGORY_MAPPING = {
    "Bag Closing Machines": "BAG CLOSING MACHINES",
    "Portable Bag Closers": "PORTABLE BAG CLOSERS",
    "Carpet Overedging": "CARPET OVEREDGING MACHINES",
    "Consumables & Parts": "CONSUMABLES",
    "Filling & Packing": "FILLING AND PACKING MACHINES",
    "Strapping Tools": "PACKAGING TOOLS", # Based on user list assumption
    "Weighing Scales": "WEIGHING SCALES",
    "Spring Balancer": "SPRING BALANCER",
    "Spare Parts": "SPARE PARTS",
    "Sevwing Machines": "SEWING MACHINES",
    # Add variations found
    "Carpet Overedging Machines": "CARPET OVEREDGING MACHINES",
    "Filling and Packing Machines": "FILLING AND PACKING MACHINES",
    "Sealing Machines": "SEALING MACHINES",
    "Bag Closing Thread": "BAG CLOSING THREAD",
    "Packaging Materials": "PACKAGING MATERIALS",
    "Packaging Tools": "PACKAGING TOOLS",
}

def update_products_ts(ts_path):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_lines = []
    lines = content.split('\n')
    
    product_block = []
    in_product = False
    
    # Track stats
    updated_count = 0
    
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith("{") and not in_product:
             in_product = True
             product_block = [line]
             continue
             
        if in_product:
            product_block.append(line)
            
            if stripped.startswith("},") or stripped == "}":
                in_product = False
                
                # Analyze block
                modified_block = []
                
                # Check category line
                cat_line_idx = -1
                current_cat = None
                
                for idx, bl in enumerate(product_block):
                    cat_match = re.search(r"category:\s*'([^']+)'", bl)
                    if cat_match:
                        cat_line_idx = idx
                        current_cat = cat_match.group(1)
                
                if current_cat:
                    # Check if it needs update
                    new_cat = None
                    
                    # 1. Exact match in strictly keys? (Already correct?)
                    if current_cat in STRICT_CATEGORIES:
                        new_cat = current_cat # Keep
                    
                    # 2. Map lookup
                    if not new_cat:
                        if current_cat in CATEGORY_MAPPING:
                            new_cat = CATEGORY_MAPPING[current_cat]
                        # Trim/Strip lookup
                        elif current_cat.strip() in CATEGORY_MAPPING:
                             new_cat = CATEGORY_MAPPING[current_cat.strip()]
                    
                    # 3. Case insensitive strict lookup
                    if not new_cat:
                        for sc in STRICT_CATEGORIES:
                            if sc.lower() == current_cat.lower():
                                new_cat = sc
                                break
                                
                    # 4. Partial/Fuzzy legacy cleanups
                    if not new_cat:
                        if "Carpet" in current_cat: new_cat = "CARPET OVEREDGING MACHINES"
                        elif "Consumable" in current_cat: new_cat = "CONSUMABLES"
                        elif "Filling" in current_cat: new_cat = "FILLING AND PACKING MACHINES"
                        elif "Strapping" in current_cat: new_cat = "PACKAGING TOOLS"
                    
                    if new_cat and new_cat != current_cat:
                        # Replace logic
                        # Rebuild block
                        updated_count += 1
                        for bl in product_block:
                            if "category:" in bl:
                                indent = bl.split("category:")[0]
                                modified_block.append(f"{indent}category: '{new_cat}',")
                            else:
                                modified_block.append(bl)
                    else:
                        modified_block = product_block
                else:
                    modified_block = product_block

                new_lines.extend(modified_block)
                product_block = []
            continue
            
        new_lines.append(line)
        
    print(f"Updated {updated_count} products.")
    return '\n'.join(new_lines)

if __name__ == "__main__":
    new_ts = update_products_ts("src/data/products.ts")
    with open("src/data/products.ts", 'w', encoding='utf-8') as f:
        f.write(new_ts)
        
    print("Done v5 updating")
