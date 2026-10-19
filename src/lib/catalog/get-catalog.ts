import "server-only";

import { unstable_cache } from "next/cache";
import { categories, allProducts } from "@/data/products";
import type { Catalog, Product } from "./types";
import { getCatalogSource } from "./source";
import { fetchCatalogFromFirestore } from "./fetch-firestore";

const CACHE_REVALIDATE_SECONDS = 3600;

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

async function getFirestoreProductBySlugCached(slug: string): Promise<Product | null> {
  return unstable_cache(
    async () => {
      const { allProducts: products } = await fetchCatalogFromFirestore();
      return findProductBySlug(products, slug);
    },
    ["catalog-product-firestore-v1", slug],
    {
      tags: ["catalog", `product:${slug}`],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (getCatalogSource() === "file") {
    return findProductBySlug(allProducts, slug);
  }
  return getFirestoreProductBySlugCached(slug);
}
