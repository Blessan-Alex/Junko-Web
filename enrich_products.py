import re
import json
import os

# Paths
PRODUCTS_FILE = r"c:\Users\blaze\Downloads\Junko-Web\src\data\products.ts"
MARKDOWN_FILE = r"c:\Users\blaze\Downloads\Junko-Web\docs\Junko Products.md"

def load_current_products():
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    match = re.search(r'export const allProducts: Product\[\] = (\[.*\]);', content, re.DOTALL)
    if not match:
        print("Could not find allProducts array.")
        return [], content
        
    json_str = match.group(1)
    # Fix trailing commas
    json_str = re.sub(r',\s*]', ']', json_str)
    json_str = re.sub(r',\s*}', '}', json_str)
    
    try:
        products = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return [], content

    return products, content

def parse_markdown():
    with open(MARKDOWN_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    extracted_data = [] 
    current_item = None
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_item:
                current_item["description"] += "\n"
            continue
            
        if re.match(r'^(?:#+\s*).*', line):
            # Header line - always a boundary
            if current_item:
                extracted_data.append(current_item)
                current_item = None
            
            # If it's a "Below are" header, we just skip it as a separator
            if "below are" in line.lower():
                continue
            
            # If it's a distinct product header (e.g. #### [**Name**]), we might want to parse name from it?
            # Existing specific regexes below might handle parsing, but we ensured boundary break here.
            # Let fall through to see if it matches model patterns?
            # But wait, logic below checks specific patterns. 
            # If we don't 'continue' here, logic below runs.
            # But logic below does regex searches.
            # Let's simple break boundary, then let logic proceed?
            # But "Below are" should definitively valid continue.
            
        # Robust "Below are" check (handles #### Below are, etc) - ALREADY COVERED BY ABOVE if we add check
        # But let's keep specific structure for clarity:
        
        # 1. Boundary Check: Header or Below Are
        is_header = re.match(r'^(?:#+\s*)', line)
        if is_header:
             if current_item:
                 extracted_data.append(current_item)
                 current_item = None
             
             if "below are" in line.lower():
                 continue
                 
             # If it's a header but NOT "Below are", it might be a product name header 
             # e.g. #### [**Animal Scale**]
             # We let it fall through to pattern matchers below.
             
        # Pattern 1: Standard Model Header - allow colon or semicolon
        model_match = re.search(r'^(?:#+\s*)?(?:Model|model|MOdel|Image name)\s*[:;]?\s*(.*)', line)
        
        # Pattern 2: Name (image name: ...)
        paren_match = re.search(r'^(.+?)\s*\(\s*(?:image|Image)\s*(?:name|naem)\s*[:=]\s*(.+?)\s*\)', line)
        
        # Pattern 3: Multi-line explicit keys
        key_value_match = re.match(r'^(Image|Iamge|Imae|Model|Modell|Descripotn|Description|Desc|Name|Use name as)\s*(?:name|naem)?\s*[:;]\s*(.*)', line, re.IGNORECASE)
        use_name_match = re.match(r'^Use name as\s*(.*)', line, re.IGNORECASE)

        # START NEW ITEM DETECTION LOGIC
        is_new_start = False
        
        if paren_match:
             is_new_start = True
        elif use_name_match:
             if current_item and (current_item["description"].strip() or current_item["features"]):
                 is_new_start = True
             elif not current_item:
                 is_new_start = True
                 
        elif key_value_match:
             key = key_value_match.group(1).lower()
             
             if "model" in key or "name" in key or "image" in key or "iamge" in key or "imae" in key:
                 if current_item:
                     has_seen_key_type = False
                     seen = current_item.get("_seen_keys", [])
                     
                     if "image" in key and any("image" in k for k in seen): has_seen_key_type = True
                     if "model" in key and any("model" in k for k in seen): has_seen_key_type = True
                     
                     if current_item["description"].strip() or current_item["features"] or has_seen_key_type:
                         is_new_start = True
                 else:
                     is_new_start = True
                     
        elif model_match and not paren_match: 
             # Check if this is just text that looks like a model but isn't?
             # If key_value_match failed, maybe it's just a line "Model A" without color?
             # Our regex requires Model...
             
             if not key_value_match:
                 if current_item and (current_item["description"].strip() or current_item["features"]):
                      is_new_start = True
                 elif not current_item:
                      is_new_start = True

        if is_new_start and current_item:
            extracted_data.append(current_item)
            current_item = None
        # END NEW ITEM DETECTION LOGIC

        if paren_match:
             name_part = paren_match.group(1).strip()
             image_part = paren_match.group(2).strip()
             
             current_item = {
                "names": [name_part, image_part], 
                "description": "",
                "features": [],
                "_seen_keys": ["paren"]
             }
        
        elif use_name_match:
             val = use_name_match.group(1).strip()
             if current_item:
                 current_item["names"].insert(0, val)
             else:
                 current_item = { "names": [val], "description": "", "features": [], "_seen_keys": ["use_name"] }

        elif key_value_match:
             key = key_value_match.group(1).lower()
             val = key_value_match.group(2).strip()
             
             if not current_item:
                 current_item = { "names": [], "description": "", "features": [], "_seen_keys": [] }
             
             current_item.setdefault("_seen_keys", []).append(key)
             
             if "model" in key or "name" in key or "iamge" in key or "imae" in key or "image" in key:
                 if val:
                    current_item["names"].append(val)
                      
             elif "desc" in key:
                 current_item["description"] += val + "\n"
        
        elif model_match and not paren_match: 
             if not key_value_match:
                 if not current_item: 
                     # Should have been created above if is_new_start
                     # Create fall back
                     raw_names = model_match.group(1)
                     names = [n.strip() for n in raw_names.split("aka")]
                     current_item = {
                          "names": names,
                          "description": "",
                          "features": [],
                          "_seen_keys": ["model_fallback"]
                     }

        elif current_item:
            if line.startswith("* ") or line.startswith("- "):
                current_item["features"].append(line[2:].strip())
            elif line.startswith("**") and ":" in line: 
                current_item["description"] += line + "\n"
            else:
                current_item["description"] += line + "\n"

    if current_item:
        extracted_data.append(current_item)
        
    return extracted_data

def normalize(text):
    return text.lower().replace("_", " ").replace("-", " ").strip()

def main():
    products, original_content = load_current_products()
    markdown_data = parse_markdown()
    
    matches = 0
    
    for product in products:
        p_name = normalize(product["name"])
        p_image_base = normalize(os.path.splitext(os.path.basename(product["image"]))[0])
        
        found_data = None
        
        for item in markdown_data:
            for alias in item["names"]:
                norm_alias = normalize(alias)
                
                # Check 1: Exact Match
                if norm_alias == p_name or norm_alias == p_image_base:
                    found_data = item
                    break
                
                # Check 2: Substring Match (Strict)
                # length > 5 AND strictly in image base
                if len(norm_alias) > 5 and norm_alias in p_image_base: 
                     found_data = item
                     break
            if found_data:
                break
        
        if found_data:
            matches += 1
            desc = found_data["description"].strip()
            if desc.lower() == "no description" or desc.lower() == "no desc":
               desc = ""
               
            product["description"] = desc
            product["features"] = found_data["features"]
            
            official_name = found_data["names"][0].strip()
            
            # Clean up name (remove "Image name:" prefix if somehow leaked)
            official_name = re.sub(r'^(?:Model|model|MOdel|Image name)\s*[:;]?\s*', '', official_name, flags=re.IGNORECASE)
            
            if "no model name" not in official_name.lower() and "image name" not in official_name.lower():
                 if official_name:
                    product["name"] = official_name

    print(f"Enriched {matches} products.")
    
    new_json = json.dumps(products, indent=4, ensure_ascii=False)
    
    split_marker = 'export const allProducts: Product[] ='
    parts = original_content.split(split_marker)
    
    if len(parts) >= 2:
        prefix = parts[0]
        new_content = prefix + split_marker + " " + new_json + ";\n"
        with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated products.ts")
    else:
        print("Could not split file correctly. Aborting write.")

if __name__ == "__main__":
    main()
