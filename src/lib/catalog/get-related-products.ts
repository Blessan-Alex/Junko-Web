import "server-only";

import { unstable_cache } from "next/cache";
import { allProducts } from "@/data/products";
import type { Product } from "./types";
import { getCatalogSource } from "./source";
import { fetchRelatedProductsFromFirestore } from "./fetch-firestore";

const CACHE_REVALIDATE_SECONDS = 3600;

function getRelatedProductsFromFile(product: Product): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategory === product.subcategory ||
          p.category === product.category),
    )
    .slice(0, 4);
}

async function getFirestoreRelatedProductsCached(
  product: Product,
): Promise<Product[]> {
  const tags: string[] = [];
  if (product.category) {
    tags.push(`related:category:${product.category}`);
  }
  if (product.subcategory) {
    tags.push(`related:subcategory:${product.subcategory}`);
  }

  return unstable_cache(
    async () => fetchRelatedProductsFromFirestore(product),
    ["related-products-v1", product.id],
    {
      tags,
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}

export async function getRelatedProducts(
  product: Product,
): Promise<Product[]> {
  if (getCatalogSource() === "file") {
    return getRelatedProductsFromFile(product);
  }
  return getFirestoreRelatedProductsCached(product);
}
