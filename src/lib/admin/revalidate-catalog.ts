import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

export type RevalidateTaxonomy = {
  categories?: string[];
  subcategories?: string[];
};

export function taxonomyFromProducts(
  ...items: Array<{ category: string; subcategory?: string }>
): RevalidateTaxonomy {
  const categories: string[] = [];
  const subcategories: string[] = [];
  for (const item of items) {
    if (item.category) categories.push(item.category);
    if (item.subcategory) subcategories.push(item.subcategory);
  }
  return { categories, subcategories };
}

/**
 * Invalidate public caches after admin publish.
 * Catalogue tag affects getCatalog() only (listing/sitemap), not per-product data caches.
 */
/** URL path segments used in /product/[id] (slug and/or Firestore doc id). */
export function revalidateCatalog(
  urlSegments: string[] = [],
  taxonomy?: RevalidateTaxonomy,
) {
  const segments = [...new Set(urlSegments.filter(Boolean))];

  revalidateTag("catalog", {});
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");

  for (const segment of segments) {
    revalidateTag(`product:${segment}`, {});
    revalidatePath(`/product/${segment}`);
  }

  const categories = [...new Set(taxonomy?.categories?.filter(Boolean) ?? [])];
  const subcategories = [
    ...new Set(taxonomy?.subcategories?.filter(Boolean) ?? []),
  ];
  for (const category of categories) {
    revalidateTag(`related:category:${category}`, {});
  }
  for (const subcategory of subcategories) {
    revalidateTag(`related:subcategory:${subcategory}`, {});
  }

  return {
    catalog: true,
    paths: ["/products", "/sitemap.xml"],
    slugs: segments,
  };
}
