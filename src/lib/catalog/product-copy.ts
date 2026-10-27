import type { Product } from '@/data/products';

export function getProductDescriptionForDisplay(product: Product): string {
  const trimmed = product.description?.trim();
  if (trimmed) return trimmed;
  return `High quality ${product.name} designed for industrial applications. Part of our premium ${product.category} line.`;
}
