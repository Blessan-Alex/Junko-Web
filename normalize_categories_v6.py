import re

# Logic to manually force items into the missing categories based on ID or Name keywords

def manual_recategorization(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    lines = content.split('\n')
    new_lines = []
    
    product_block = []
    in_product = False
    
    stats = {
        "BAG CLOSING THREAD": 0,
        "PACKAGING MATERIALS": 0,
        "SPARE PARTS": 0,
        "SEWING MACHINE": 0,
        "SPRING BALANCER": 0 # Just to check
    }
    
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
                
                # Analyze block for recategorization
                current_id = ""
                current_name = ""
                current_cat = ""
                
                for bl in product_block:
                    m_id = re.search(r"id:\s*'([^']+)'", bl)
                    if m_id: current_id = m_id.group(1).lower()
                    
                    m_name = re.search(r"name:\s*'([^']+)'", bl)
                    if m_name: current_name = m_name.group(1).lower()
                    
                    m_cat = re.search(r"category:\s*'([^']+)'", bl)
                    if m_cat: current_cat = m_cat.group(1)
                
                # Default Keep
                new_cat = current_cat
                
                # 1. BAG CLOSING THREAD
                if "thread" in current_name or "thread" in current_id or "crepe tape" in current_name:
                    # Exclude machines
                    if "machine" not in current_name and "closer" not in current_name:
                         # But wait, Crepe Tape Cutter Head is a machine.
                         # Crepe Paper Tape is a consumable -> Thread/Tape
                         if "cutter" not in current_name:
                            new_cat = "BAG CLOSING THREAD"

                # 2. PACKAGING MATERIALS
                # bopp tape, polycord, polylash, polystrap, polytex
                p_materials = ["bopp tape", "polycord", "polylash", "polystrap", "polytex", "strap"]
                if any(m in current_name for m in p_materials) or any(m in current_id for m in p_materials):
                    # exclude tools
                    if "tool" not in current_name and "tensioner" not in current_name and "sealer" not in current_name and "machine" not in current_name:
                        new_cat = "PACKAGING MATERIALS"

                # 3. SEWING MACHINE (User asked for "SEWING MACHINE" singular)
                # Specific items? 
                if "sewing machine" in current_name or "sewing machine" in current_id or "lock stitch" in current_name:
                    # Exclude oil
                    if "oil" not in current_name:
                        new_cat = "SEWING MACHINE"
                
                # 4. SPARE PARTS
                if "needles" in current_name or "needle" in current_id or "looper" in current_name:
                    new_cat = "SPARE PARTS"

                # 5. SPRING BALANCER (already done, just enforcing)
                if "spring balancer" in current_name:
                    new_cat = "SPRING BALANCER"

                # Apply Change
                if new_cat != current_cat:
                    if new_cat in stats: stats[new_cat] += 1
                    
                    modified_block = []
                    for bl in product_block:
                         if "category:" in bl:
                             indent = bl.split("category:")[0]
                             modified_block.append(f"{indent}category: '{new_cat}',")
                         else:
                             modified_block.append(bl)
                    product_block = modified_block
                
                new_lines.extend(product_block)
                product_block = []
            continue
            
        new_lines.append(line)

    print("Recategorization Stats:", stats)
    return '\n'.join(new_lines)


if __name__ == "__main__":
    new_ts = manual_recategorization("src/data/products.ts")
    with open("src/data/products.ts", 'w', encoding='utf-8') as f:
        f.write(new_ts)
