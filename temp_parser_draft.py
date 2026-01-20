import re
import json

# Placeholder for the structure matching products.ts
products = []

def parse_markdown(md_path):
    product_specs = {}
    current_product = None
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        # Very sensitive heuristic: "Model: ..." 
        # This will be refined based on the markdown structure I saw
        match = re.search(r'(?:Model|model)\s*:\s*(.+)', line)
        if match:
            model_name = match.group(1).strip()
            # Normalize model name for key (remove "aka", spaces, etc.)
            key = re.split(r'\s+aka\s+', model_name)[0].strip().lower()
            current_product = key
            product_specs[current_product] = {}
            continue
            
        if current_product and ':' in line:
            parts = line.split(':', 1)
            if len(parts) == 2:
                k = parts[0].strip()
                v = parts[1].strip()
                if k and v:
                    product_specs[current_product][k] = v
                    
    return product_specs

# This is just a scaffolding. I will write the real script in next turn.
