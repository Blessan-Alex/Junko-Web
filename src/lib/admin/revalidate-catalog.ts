import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

/** Invalidate public catalog caches after admin publish (ISR ~30s). */
export function revalidateCatalog(slugs: string[] = []) {
  const uniqueSlugs = [...new Set(slugs.filter(Boolean))];

  revalidateTag("catalog", {});
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");

  for (const slug of uniqueSlugs) {
    revalidateTag(`product:${slug}`, {});
    revalidatePath(`/product/${slug}`);
  }

  return {
    catalog: true,
    paths: ["/products", "/sitemap.xml"],
    slugs: uniqueSlugs,
  };
}
