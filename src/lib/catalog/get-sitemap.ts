import "server-only";

import { unstable_cache } from "next/cache";
import { getCatalogSource } from "./source";
import { fetchSitemapFromProjection } from "./fetch-firestore";
import { getCatalog, CACHE_REVALIDATE_SECONDS } from "./get-catalog";

export type SitemapEntry = {
  slug: string;
  id: string;
};

async function loadSitemapEntries(): Promise<SitemapEntry[]> {
  const projected = await fetchSitemapFromProjection();
  if (projected) {
    return projected.map((e) => ({
      id: e.id,
      slug: e.slug || e.id,
    }));
  }
  console.warn(
    "catalog/sitemap projection missing; falling back to getCatalog()",
  );
  const { allProducts } = await getCatalog();
  return allProducts.map((p) => ({
    id: p.id,
    slug: p.slug || p.id,
  }));
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  if (getCatalogSource() === "file") {
    const { allProducts } = await getCatalog();
    return allProducts.map((p) => ({
      id: p.id,
      slug: p.slug || p.id,
    }));
  }

  return unstable_cache(
    async () => loadSitemapEntries(),
    ["sitemap-projection-v1"],
    {
      tags: ["sitemap"],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}
