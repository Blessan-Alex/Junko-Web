import re
import os

def normalize_id(model_name):
    # Try to match the ID format in products.ts (e.g., BCM_4 -> bcm-4)
    # Remove "Model:" prefix if present
    name = model_name.replace("Model:", "").strip()
    # Remove "aka ..."
    name = re.split(r'\s+aka\s+', name, flags=re.IGNORECASE)[0]
    # Simple normalization: lowercase, replace _ with -
    return name.lower().replace("_", "-").replace(" ", "-").strip()

def parse_markdown(md_check_path):
    specs_map = {}
    current_model = None
    
    with open(md_check_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect Model start
        model_match = re.match(r'^(?:Model|model)\s*:\s*(.+)', line)
        if model_match:
            raw_model = model_match.group(1)
            current_model = normalize_id(raw_model)
            specs_map[current_model] = {}
            continue
            
        # Detect Spec line (Key : Value)
        # We assume specs are lines with a colon, but not the Model line
        if current_model and ':' in line:
            parts = line.split(':', 1)
            if len(parts) == 2:
                key = parts[0].strip(' *#-') # Clean markdown formatting
                val = parts[1].strip()
                
                # Filter out obvious non-specs
                if key.lower() in ['model', 'desc', 'image name', 'below are']:
                    continue
                    
                if key and val and len(val) < 100: # heuristic to avoid long descriptions
                    specs_map[current_model][key] = val
                    
    return specs_map

def enrich_products_ts(ts_path, specs_map):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We will iterate manually to find ids and insert specs
    new_lines = []
    lines = content.split('\n')
    current_id = None
    
    for line in lines:
        # Check for ID line: id: 'bcm-4',
        id_match = re.search(r"id:\s*'([^']+)'", line)
        if id_match:
            current_id = id_match.group(1)
            new_lines.append(line)
            continue
            
        # Check for end of object (or start of features/image where we want to insert)
        # We'll insert after 'image: ...' line to be safe
        if current_id and "image:" in line:
            new_lines.append(line)
            
            # Look up specs
            # Try exact match or slight variations
            specs = specs_map.get(current_id)
            if not specs and current_id.replace("-", "_") in specs_map:
                 specs = specs_map.get(current_id.replace("-", "_"))
            
            if specs:
                # Format specs as TS object
                specs_str = "        specs: {\n"
                for k, v in specs.items():
                    specs_str += f"            '{k}': '{v.replace(chr(39), '')}',\n"
                specs_str += "        },"
                new_lines.append(specs_str)
            
            current_id = None # Reset so we don't insert twice
            continue
            
        new_lines.append(line)
        
    return '\n'.join(new_lines)

if __name__ == "__main__":
    md_path = "docs/Junko Products.md"
    ts_path = "src/data/products.ts"
    
    if os.path.exists(md_path) and os.path.exists(ts_path):
        specs = parse_markdown(md_path)
        print(f"Found specs for {len(specs)} models.")
        
        new_ts = enrich_products_ts(ts_path, specs)
        
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(new_ts)
            
        print("Updated products.ts")
    else:
        print("Files not found.")
