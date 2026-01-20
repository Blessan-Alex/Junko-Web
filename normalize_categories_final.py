import os

# Map of literal string (inside single quotes) to REPLACE with strict UPPERCASE version
# This avoids parsing logic errors by just doing raw string replacement.

REPLACEMENTS = {
    "'Bag Closing Machines'": "'BAG CLOSING MACHINES'",
    "'Bag Closing Machine'": "'BAG CLOSING MACHINES'",
    
    "'Portable Bag Closers'": "'PORTABLE BAG CLOSERS'",
    "'Portable Bag Closer'": "'PORTABLE BAG CLOSERS'",
    
    "'Carpet Overedging'": "'CARPET OVEREDGING MACHINES'",
    "'Carpet Overedging Machines'": "'CARPET OVEREDGING MACHINES'",
    
    "'Consumables & Parts'": "'CONSUMABLES'",
    "'Consumables'": "'CONSUMABLES'", # Case insensitive check below will catch mixed case
    
    "'Filling & Packing'": "'FILLING AND PACKING MACHINES'",
    "'Filling And Packing Machines'": "'FILLING AND PACKING MACHINES'",
    "'Filling and Packing machines'": "'FILLING AND PACKING MACHINES'",
    
    "'Packaging Materials'": "'PACKAGING MATERIALS'",
    
    "'Packaging Tools'": "'PACKAGING TOOLS'",
    "'Strapping Tools'": "'PACKAGING TOOLS'",
    
    "'Sealing Machines'": "'SEALING MACHINES'",
    "'Sealings Machines'": "'SEALING MACHINES'",
    
    "'Weighing Scales'": "'WEIGHING SCALES'",
    
    "'Spring Balancer'": "'SPRING BALANCER'",
    
    "'Spare Parts'": "'SPARE PARTS'",
    
    "'Sewing Machines'": "'SEWING MACHINES'",
    "'Sevwing Machines'": "'SEWING MACHINES'",
}

def brute_force_normalize(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # First pass: Direct replacements from map
    for old, new in REPLACEMENTS.items():
        # Replace exact matches (which handles the mixed case ones if they match the keys)
        # Note: keys in map are capitalized as seen in file. 
        # But to be safe, I will look for string literals disregarding case if simple replace fails? 
        # Actually simple replace is case sensitive.
        # Let's add more variations to the map to be safe.
        
        content = content.replace(old, new)
        
    # Second pass: Scan for 'CategoryName' pattern and force upper if it looks like one of our target words
    # but wasn't caught (e.g. slight spacing diffs).
    # Actually, let's just do case-insensitive replacement for the quoted strings.
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if "category:" in line:
            # Check if it matches any strict category in a case-insensitive way
            # STRICT LIST
            targets = [
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
            
            # Extract content of quotes
            import re
            m = re.search(r"category:\s*'([^']+)'", line)
            if m:
                val = m.group(1)
                upper_val = val.upper()
                
                # Special Legacy Handling for Case-Insensitive Matching
                if upper_val == "BAG CLOSING MACHINES": upper_val = "BAG CLOSING MACHINES"
                elif upper_val == "PORTABLE BAG CLOSERS": upper_val = "PORTABLE BAG CLOSERS"
                elif "CARPET" in upper_val: upper_val = "CARPET OVEREDGING MACHINES"
                elif "CONSUMABLES" in upper_val: upper_val = "CONSUMABLES"
                elif "FILLING" in upper_val and "PACKING" in upper_val: upper_val = "FILLING AND PACKING MACHINES"
                elif "STRAPPING" in upper_val: upper_val = "PACKAGING TOOLS"
                elif "WEIGHING" in upper_val: upper_val = "WEIGHING SCALES"
                elif "SPRING" in upper_val and "BALANCER" in upper_val: upper_val = "SPRING BALANCER"
                elif "SEALING" in upper_val: upper_val = "SEALING MACHINES"
                
                # If we have a match in strict list
                if upper_val in targets:
                    indent = line.split("category:")[0]
                    line = f"{indent}category: '{upper_val}',"
        
        new_lines.append(line)
        
    final_content = '\n'.join(new_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("Brute force normalization complete.")

if __name__ == "__main__":
    brute_force_normalize("src/data/products.ts")
