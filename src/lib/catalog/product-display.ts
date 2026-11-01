import type { Product } from '@/data/products';
import { peersWithSameName } from '@/lib/catalog/product-seo';

function titleCaseSegment(segment: string): string {
  return segment
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Visible line under H1 when multiple SKUs share the same product name. */
export function getProductH1Disambiguator(
  product: Product,
  allProducts: Product[],
): string | null {
  const peers = peersWithSameName(product, allProducts);
  if (peers.length <= 1) return null;

  const sub = product.subcategory?.trim();
  const segment =
    sub && sub.toLowerCase() !== 'general'
      ? titleCaseSegment(sub)
      : titleCaseSegment(product.category);
  const slug = product.slug || product.id;
  return `${slug} · ${segment}`;
}
