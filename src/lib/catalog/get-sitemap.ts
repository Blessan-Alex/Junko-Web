import "server-only";

import { unstable_cache } from "next/cache";
import { getCatalogSource } from "./source";
import { fetchSitemapFromProjection } from "./fetch-firestore";
import { getCatalog, CACHE_REVALIDATE_SECONDS } from "./get-catalog";
import { resolvePublicProductPathSegment } from "./public-slug";

export type SitemapEntry = {
  slug: string;
  id: string;
};

function productToSitemapEntry(
  id: string,
  slug: string | undefined | null,
): SitemapEntry | null {
  const segment = resolvePublicProductPathSegment(slug, id);
  if (!segment) return null;
  return { id, slug: segment };
}

function entriesFromProducts(
  products: { id: string; slug?: string }[],
): SitemapEntry[] {
  const out: SitemapEntry[] = [];
  for (const p of products) {
    const entry = productToSitemapEntry(p.id, p.slug);
    if (entry) out.push(entry);
  }
  return out;
}

async function loadSitemapEntries(): Promise<SitemapEntry[]> {
  const projected = await fetchSitemapFromProjection();
  if (projected) {
    return entriesFromProducts(
      projected.map((e) => ({ id: e.id, slug: e.slug })),
    );
  }
  console.warn(
    "catalog/sitemap projection missing; falling back to getCatalog()",
  );
  const { allProducts } = await getCatalog();
  return entriesFromProducts(allProducts);
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  if (getCatalogSource() === "file") {
    const { allProducts } = await getCatalog();
    return entriesFromProducts(allProducts);
  }

  return unstable_cache(
    async () => loadSitemapEntries(),
    ["sitemap-projection-v2"],
    {
      tags: ["sitemap"],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}
