import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { categories, allProducts } from "@/data/products";
import type { Catalog, Product } from "./types";
import { getCatalogSource } from "./source";
import {
  fetchCatalogFromFirestore,
  fetchProductBySlugOrId,
} from "./fetch-firestore";

export const CACHE_REVALIDATE_SECONDS = 3600;

function getFileCatalog(): Catalog {
  return { categories, allProducts };
}

async function getFirestoreCatalogCached(): Promise<Catalog> {
  return unstable_cache(
    async () => fetchCatalogFromFirestore(),
    ["catalog-firestore-v1"],
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
  return getFirestoreCatalogCached();
}

function findProductBySlug(products: Product[], slug: string): Product | null {
  return (
    products.find((p) => p.slug === slug || p.id === slug) ?? null
  );
}

async function getFirestoreProductBySlugCached(
  slug: string,
): Promise<Product | null> {
  const live = await fetchProductBySlugOrId(slug);
  if (!live) {
    return null;
  }

  const cached = await unstable_cache(
    async () => fetchProductBySlugOrId(slug),
    ["catalog-product-v4", slug],
    {
      tags: [`product:${slug}`],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();

  return cached ?? live;
}

const getProductBySlugRequest = cache(async (slug: string): Promise<Product | null> => {
  if (getCatalogSource() === "file") {
    return findProductBySlug(allProducts, slug);
  }
  return getFirestoreProductBySlugCached(slug);
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProductBySlugRequest(slug);
}

export { getRelatedProducts } from "./get-related-products";
