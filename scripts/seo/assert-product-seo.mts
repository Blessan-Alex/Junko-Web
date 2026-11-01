import { allProducts } from '../../src/data/products';
import {
  buildProductPageTitle,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  truncateProductTitle,
} from '../../src/lib/catalog/product-seo';

let failures = 0;

for (const product of allProducts) {
  const title = buildProductPageTitle(product, allProducts);
  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    console.error(`FAIL ${product.id}: title length ${title.length} — ${title}`);
    failures += 1;
  }
}

const long =
  'Very Long Product Name For Testing | Bag Closing Machines | Junko FZE';
const truncated = truncateProductTitle(long);
if (truncated.length > MAX_TITLE_LENGTH || !truncated.includes('Junko FZE')) {
  console.error('FAIL truncateProductTitle');
  failures += 1;
}

const byName = new Map<string, string[]>();
for (const p of allProducts) {
  const key = p.name.trim().toLowerCase();
  const titles = byName.get(key) ?? [];
  titles.push(buildProductPageTitle(p, allProducts));
  byName.set(key, titles);
}
for (const [name, titles] of byName) {
  if (titles.length > 1 && new Set(titles).size === 1) {
    console.error(`FAIL duplicate titles for name "${name}"`);
    failures += 1;
  }
}

if (failures > 0) {
  process.exit(1);
}
console.log('product-seo assertions OK');
