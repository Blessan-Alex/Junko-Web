import "server-only";

import { unstable_cache } from "next/cache";
import type { Product } from "./types";
import { getCatalogSource } from "./source";
import { fetchRelatedProductsFromFirestore } from "./fetch-firestore";
import { getFileCatalogRelatedProducts } from "./catalog-fallback";
import { isFirestoreQuotaExceeded } from "./firestore-quota";

const CACHE_REVALIDATE_SECONDS = 3600;


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
    return getFileCatalogRelatedProducts(product);
  }
  try {
    return await getFirestoreRelatedProductsCached(product);
  } catch (error) {
    if (isFirestoreQuotaExceeded(error)) {
      console.error(
        "Firestore quota exceeded; serving file catalog related-products fallback",
      );
      return getFileCatalogRelatedProducts(product);
    }
    throw error;
  }
}
