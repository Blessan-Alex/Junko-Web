import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { allProducts } from "@/data/products";
import type { Catalog, Product } from "./types";
import { getCatalogSource } from "./source";
import {
  fetchCatalogFromFirestore,
  fetchCatalogFromProjection,
  fetchProductBySlugOrId,
} from "./fetch-firestore";
import {
  findFileCatalogProductBySlug,
  getFileCatalogFallback,
} from "./catalog-fallback";
import { isFirestoreQuotaExceeded } from "./firestore-quota";

export const CACHE_REVALIDATE_SECONDS = 3600;

function getFileCatalog(): Catalog {
  return getFileCatalogFallback();
}

async function loadFirestoreCatalog(): Promise<Catalog> {
  const projected = await fetchCatalogFromProjection();
  if (projected) return projected;
  console.warn(
    "catalog/listing projection missing; falling back to full Firestore scan",
  );
  return fetchCatalogFromFirestore();
}

async function getFirestoreCatalogCached(): Promise<Catalog> {
  return unstable_cache(
    async () => loadFirestoreCatalog(),
    ["catalog-firestore-v2"],
    {
      tags: ["catalog"],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}

export async function getCatalog(): Promise<Catalog> {
  if (getCatalogSource() === "file") {
    return getFileCatalog();
  }
  try {
    return await getFirestoreCatalogCached();
  } catch (error) {
    if (isFirestoreQuotaExceeded(error)) {
      console.error(
        "Firestore quota exceeded; serving read-only file catalog fallback",
      );
      return getFileCatalogFallback();
    }
    throw error;
  }
}

function findProductBySlug(products: Product[], slug: string): Product | null {
  return (
    products.find((p) => p.slug === slug || p.id === slug) ?? null
  );
}

async function getFirestoreProductBySlugCached(
  slug: string,
): Promise<Product | null> {
  return unstable_cache(
    async () => fetchProductBySlugOrId(slug),
    ["catalog-product-v5", slug],
    {
      tags: [`product:${slug}`],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}

const getProductBySlugRequest = cache(async (slug: string): Promise<Product | null> => {
  if (getCatalogSource() === "file") {
    return findProductBySlug(allProducts, slug);
  }
  return getFirestoreProductBySlugCached(slug);
});

async function getProductBySlugWithQuotaFallback(
  slug: string,
): Promise<Product | null> {
  try {
    return await getProductBySlugRequest(slug);
  } catch (error) {
    if (isFirestoreQuotaExceeded(error)) {
      console.error(
        "Firestore quota exceeded; serving file catalog product fallback",
      );
      return findFileCatalogProductBySlug(slug);
    }
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (getCatalogSource() === "file") {
    return getProductBySlugRequest(slug);
  }
  return getProductBySlugWithQuotaFallback(slug);
}

export { getRelatedProducts } from "./get-related-products";
