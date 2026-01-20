import re
import os

def normalize_id(model_name):
    # Same logic as before to match IDs
    name = model_name.replace("Model:", "").strip()
    name = re.split(r'\s+aka\s+', name, flags=re.IGNORECASE)[0]
    return name.lower().replace("_", "-").replace(" ", "-").strip()

def parse_features(md_path):
    features_map = {}
    current_model = None
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
            
        # Detect Model start
        model_match = re.match(r'^(?:Model|model)\s*:\s*(.+)', line)
        if model_match:
            raw_model = model_match.group(1)
            current_model = normalize_id(raw_model)
            features_map[current_model] = []
            continue
            
        if current_model:
            # Strategies to find features:
            
            # 1. "Feature :" line
            if line.lower().startswith('feature'):
                # Extract value after colon
                parts = line.split(':', 1)
                if len(parts) > 1:
                    feat = parts[1].strip()
                    if feat:
                        features_map[current_model].append(feat)
                continue

            # 2. Bullet points that are NOT specs
            # Specs usually have a colon "Weight : 29kg"
            # Features might be bullets " * Self-lubricating"
            if line.startswith('*') or line.startswith('-'):
                content = line.lstrip('*- ').strip()
                if ':' not in content and len(content) > 3 and len(content) < 100:
                    features_map[current_model].append(content)
                elif ':' in content:
                    # check if it looks like a spec (e.g. "Speed: 100rpm") vs feature "Motor: Powerful"
                    # If we already parsed specs in previous pass, maybe we ignore?
                    # But user wants features. 
                    # Let's count "Self-lubricating" (no colon) as feature.
                    pass
            
            # 3. Short descriptive lines that aren't specs or known headers
            if ':' not in line and len(line) < 60 and not line.lower().startswith(('model', 'below', 'introduction')):
                # Check previous line was empty or also short?
                # This is risky. "Self-lubricating" on line 45 of doc is just a line.
                features_map[current_model].append(line)

    return features_map

def enrich_products_ts(ts_path, features_map):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_lines = []
    lines = content.split('\n')
    current_id = None
    
    for line in lines:
        id_match = re.search(r"id:\s*'([^']+)'", line)
        if id_match:
            current_id = id_match.group(1)
            new_lines.append(line)
            continue
            
        # Insert features after specs or image if no specs
        # We look for the closing brace of the object OR start of next object
        # Easier: insert after 'image: ...' or 'specs: { ... },'
        
        # If we see 'specs: {', we wait until we see '},'. 
        # But my previous script put specs AFTER image.
        # So commonly:
        # image: ...
        # specs: { ... },
        
        # I'll check if I can insert after specs closing brace.
        
        new_lines.append(line)
        
        # Determine strict insertion point?
        # A simple state machine is safer but let's try a heuristic:
        # If line contains 'image:' and no specs follow immediately? 
        # Or if line contains '},' (end of specs).
        
        # Let's search for features for this ID
        feats = features_map.get(current_id)
        if not feats and current_id:
             # Try fallback 
             feats = features_map.get(current_id.replace("-", "_"))
        
        if feats and current_id:
            # We want to insert 'features: [...],'
            # We need to know WHERE.
            # 1. If specs exist, insert after specs.
            # 2. If no specs, insert after image.
            
            # Since I process line by line, it's hard to know if specs are COMING.
            # Actually, I can just accumulate features and insert them right before the closing '},' of the product object?
            # '},' is ambiguous (specs end or product end). Product end usually is '    },' (indentation 4). Specs end is '        },' (indentation 8).
            
            pass

    # Re-reading logic to be robust:
    # Read entire blocks.
    
    # Alternative: Use regex to find product blocks and inject features.
    
    result_content = content
    for pid, feats in features_map.items():
        if not feats:
            continue
            
        # format features
        feats_str = "        features: [\n"
        for f in feats:
            feats_str += f"            '{f.replace(chr(39), '')}',\n"
        feats_str += "        ],"
        
        # Regex to find the object.
        # Look for id: 'pid' ... description: ... image: ... (optional specs) ... }
        # We want to insert before the last '}' of the object.
        
        # Find the product block. 
        # We can find `id: 'pid'` and then find the next `    },` (start of line + 4 spaces + })?
        
        # Using string search might be safer than complex multiline regex
        start_idx = result_content.find(f"id: '{pid}'")
        if start_idx == -1:
            continue
            
        # Find the END of this object. The next '    },' after start_idx
        end_idx = result_content.find("\n    },", start_idx)
        
        if end_idx != -1:
            # Check if features already exist?
            # If `features:` in substring, skip.
            block = result_content[start_idx:end_idx]
            if "features:" in block:
                continue
                
            # Insert before end_idx (which is newline + closing brace)
            # We add a comma to the previous line if needed? 
            # My previous scripts ensured commas on image/specs.
            
            # Check char before end_idx (ignoring whitespace)?
            # Easier: Just replace `\n    },` with `,\n{feats_str}\n    },`
            # But wait, the previous line might not have a comma.
            # `specs: { ... },` has comma. `image: '...'` might depend.
            
            # Let's just prepending a comma to be safe? `,\n` might make double comma `,,\n` which is valid-ish or we clean it.
            # Actually, let's just insert.
            
            insertion = f",\n{feats_str}"
            # We insert at end_idx
            result_content = result_content[:end_idx] + insertion + result_content[end_idx:]
            
    return result_content

if __name__ == "__main__":
    md_path = "docs/Junko Products.md"
    ts_path = "src/data/products.ts"
    
    if os.path.exists(md_path) and os.path.exists(ts_path):
        feats = parse_features(md_path)
        print(f"Found features for {len(feats)} models.")
        
        new_ts = enrich_products_ts(ts_path, feats)
        
        # Clean up potential double commas strictly
        new_ts = new_ts.replace(",,", ",")
        new_ts = new_ts.replace("\n,", ",\n") # unlikely but possible
        
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(new_ts)
            
        print("Updated products.ts with features")
