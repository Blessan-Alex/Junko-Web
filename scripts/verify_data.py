import os
import re

# Read products.ts to find all categories and image paths
products_ts_path = "src/data/products.ts"
public_dir = "public"

try:
    with open(products_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
except FileNotFoundError:
    print(f"Error: {products_ts_path} not found.")
    exit(1)

# Extract categories
# format: category: 'Bag Closing Machines',
categories = set()
cat_matches = re.findall(r"category:\s*'([^']+)'", content)
for c in cat_matches:
    categories.add(c)

print(f"Found {len(categories)} unique categories in products.ts:")
for c in sorted(categories):
    print(f" - {c}")

# Extract image paths
# format: image: '/products/...'
image_paths = set()
img_matches = re.findall(r"image:\s*'([^']+)'", content)
for img in img_matches:
    image_paths.add(img)

print(f"\nFound {len(image_paths)} referenced images.")

# Checking existing files
missing_images = []
found_images = 0

for img_path in image_paths:
    # Remove leading slash for os.path.join
    rel_path = img_path.lstrip('/')
    full_path = os.path.join(public_dir, rel_path)
    # Check case-insensitive existence because Windows is forgiving but we want to be strict for web
    # Actually just check basic existence first
    if not os.path.exists(full_path):
        # file might be encoded or have different capitalization
        missing_images.append(img_path)
    else:
        found_images += 1

print(f"Verified {found_images}/{len(image_paths)} images exist.")

if missing_images:
    print("\nMissing Images:")
    for m in missing_images:
        print(f" [X] {m}")
else:
    print("\nAll images verified successfully.")
