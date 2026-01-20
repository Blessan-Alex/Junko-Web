import re

md_path = "docs/products.md"

def normalize_name_key(name):
    return name.lower().strip().replace("_", "-").replace(" ", "-")

def debug_hierarchy():
    if not hasattr(__builtins__, 'open'):
        # For environment where I can't run this easily? 
        # I am running in python env.
        pass
        
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_category = "NONE"
    current_subcategory = "NONE"
    
    print("--- PARSING START ---")
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith('##'):
            print(f"CATEGORY DETECTED: {line}")
            current_category = line.replace('##', '').strip()
            current_subcategory = "General" 
            continue
            
        if line.startswith('**') and line.endswith('**'):
            print(f"SUBCATEGORY DETECTED: {line}")
            current_subcategory = line.replace('**', '').strip()
            continue
            
        if line.startswith('*'):
            model_name = line.lstrip('* ').strip()
            print(f"MODEL: {model_name} -> [{current_category}] / [{current_subcategory}]")

debug_hierarchy()
