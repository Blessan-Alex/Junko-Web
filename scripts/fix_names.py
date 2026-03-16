
import json
import re
import os

PRODUCTS_FILE = r"c:\Users\blaze\Downloads\Junko-Web\src\data\products.ts"

def fix_names():
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    match = re.search(r'export const allProducts: Product\[\] = (\[.*\]);', content, re.DOTALL)
    if not match:
        print("Could not find allProducts array.")
        return
        
    json_str = match.group(1)
    # Fix trailing commas logic same as enrich script
    json_str = re.sub(r',\s*]', ']', json_str)
    json_str = re.sub(r',\s*}', '}', json_str)
    
    try:
        products = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return

    fixed_count = 0
    bad_names = ["DE-DA", "Bag Infeed", "; FRM-1120LD", "BOPP Tape", "brown-packaging-tape-500x500-1", "Manual Counter Weighing Scale", "Table Top Weighing Scale"]
    
    for p in products:
        if p["name"] in bad_names:
            # Derive name from ID
            # ID format: CATEGORY_Sub_Model
            # We want the last part, but sometimes ID is complex.
            # Usually the part after the last underscore IF it looks like a model
            # Or the part after the subcategory?
            
            # Simple heuristic: Take the suffix after the last few underscores?
            # Or better: Replace underscores with spaces for the whole ID suffix logic
            
            parts = p["id"].split("_")
            # Try to find where the model name starts.
            # Usually ID is CATEGORY_SUBCATEGORY_Model
            # But subcategory can have underscores.
            
            # Use the image filename base name?
            # Image: .../Name.png
            img_base = os.path.splitext(os.path.basename(p["image"]))[0]
            new_name = img_base.replace("-", " ").replace("_", " ")
            
            print(f"Fixing {p['id']}: {p['name']} -> {new_name}")
            p["name"] = new_name
            p["description"] = "" # Reset description as it might be wrong too
            fixed_count += 1

    if fixed_count > 0:
        new_json = json.dumps(products, indent=4)
        split_marker = 'export const allProducts: Product[] ='
        parts = content.split(split_marker)
        if len(parts) >= 2:
            prefix = parts[0]
            new_content = prefix + split_marker + " " + new_json + ";\n"
            with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {fixed_count} products.")
        else:
            print("Write failed.")
    else:
        print("No bad names found to fix.")

if __name__ == "__main__":
    fix_names()
