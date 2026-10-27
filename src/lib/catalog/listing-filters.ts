import type { Product } from '@/data/products';

/** Match ProductsClient category filter (case-insensitive). */
export function filterProductsByCategory(
  allProducts: Product[],
  category: string | null | undefined,
): Product[] {
  if (!category) return allProducts;
  const cat = category.toLowerCase();
  return allProducts.filter(
    (product) => product.category.toLowerCase() === cat,
  );
}

export function getFirstPageProducts(
  filtered: Product[],
  pageSize: number,
): Product[] {
  return filtered.slice(0, pageSize);
}
