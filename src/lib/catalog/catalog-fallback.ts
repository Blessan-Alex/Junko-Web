import "server-only";

import { categories, allProducts } from "@/data/products";
import type { Catalog, Product } from "./types";

/** Emergency read-only catalog when Firestore quota is exceeded (not used for normal requests). */
export function getFileCatalogFallback(): Catalog {
  return { categories, allProducts };
}

export function findFileCatalogProductBySlug(slug: string): Product | null {
  return (
    allProducts.find((p) => p.slug === slug || p.id === slug) ?? null
  );
}

export function getFileCatalogRelatedProducts(product: Product): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategory === product.subcategory ||
          p.category === product.category),
    )
    .slice(0, 4);
}
