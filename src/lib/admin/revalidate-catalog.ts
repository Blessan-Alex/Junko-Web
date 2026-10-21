import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

export type RevalidateTaxonomy = {
  categories?: string[];
  subcategories?: string[];
};

export type RevalidateScope = {
  productSegments?: string[];
  listing?: boolean;
  sitemap?: boolean;
  taxonomy?: RevalidateTaxonomy;
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
 * Invalidate public caches after admin publish (granular scope).
 */
export function revalidateCatalog(
  urlSegments: string[] = [],
  scope?: RevalidateScope,
) {
  const segments = [
    ...new Set(
      (scope?.productSegments ?? urlSegments).filter(Boolean),
    ),
  ];

  if (scope?.listing) {
    revalidateTag("catalog", {});
    revalidatePath("/products");
  }

  if (scope?.sitemap) {
    revalidateTag("sitemap", {});
    revalidatePath("/sitemap.xml");
  }

  for (const segment of segments) {
    revalidateTag(`product:${segment}`, {});
    revalidatePath(`/product/${segment}`);
  }

  const categories = [
    ...new Set(scope?.taxonomy?.categories?.filter(Boolean) ?? []),
  ];
  const subcategories = [
    ...new Set(scope?.taxonomy?.subcategories?.filter(Boolean) ?? []),
  ];
  for (const category of categories) {
    revalidateTag(`related:category:${category}`, {});
  }
  for (const subcategory of subcategories) {
    revalidateTag(`related:subcategory:${subcategory}`, {});
  }

  return {
    catalog: Boolean(scope?.listing),
    sitemap: Boolean(scope?.sitemap),
    paths: [
      ...(scope?.listing ? ["/products"] : []),
      ...(scope?.sitemap ? ["/sitemap.xml"] : []),
    ],
    slugs: segments,
  };
}
