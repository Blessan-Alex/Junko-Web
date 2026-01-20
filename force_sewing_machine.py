import re

# Final script to ensure SEWING MACHINE has at least one item.
# Force specific known items.

def force_sewing_machine(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will simply find the block for a specific suitable machine and change its category.
    # Candidate: '80800rl' (Union Special 80800RL) -> SEWING MACHINE?
    # Or 'n600a-12v'?
    # Let's use '80800rl' as the "Sewing Machine" representative if user insists.
    
    # Actually, let's search for "Sewing" in description.
    
    lines = content.split('\n')
    new_lines = []
    
    forced_count = 0
    
    product_block = []
    in_product = False
    
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
                
                # Check block
                block_str = "".join(product_block)
                
                # Logic: If category is BAG CLOSING MACHINES and description mentions "sewing" or "stitch"
                # AND we haven't forced one yet (or force all suitable ones?)
                # User wants a category, let's put at least one.
                # Let's pick '80800rl' explicitly.
                
                if "'id': '80800rl'" in block_str or "'id': '80800RL'" in block_str or "id: '80800rl'" in block_str:
                     # CHANGE CATEGORY
                     modified_block = []
                     for bl in product_block:
                         if "category:" in bl:
                             indent = bl.split("category:")[0]
                             modified_block.append(f"{indent}category: 'SEWING MACHINE',")
                             forced_count += 1
                         else:
                             modified_block.append(bl)
                     product_block = modified_block
                
                new_lines.extend(product_block)
                product_block = []
            continue
            
        new_lines.append(line)
        
    print(f"Forced {forced_count} products to SEWING MACHINE")
    return '\n'.join(new_lines)

if __name__ == "__main__":
    new_ts = force_sewing_machine("src/data/products.ts")
    with open("src/data/products.ts", 'w', encoding='utf-8') as f:
        f.write(new_ts)
