import re

ts_path = "src/data/products.ts"

with open(ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: image line without comma, followed by spaces/newline then specs
# We want to add comma to image line
# content like: image: '...'\n        specs:
# Regex: (image: '.*')(\s+specs:)
# Replace val: \1,\2

new_content = re.sub(r"(image:\s*'[^']+')(\s+specs:)", r"\1,\2", content)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed commas in products.ts")
