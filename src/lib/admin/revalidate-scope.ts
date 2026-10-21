import "server-only";

import type { AdminProduct } from "./product-doc";
import type { ProductWriteInput } from "./product-doc";
import type { RevalidateScope } from "./revalidate-catalog";

function listingCardFields(
  p: Pick<
    AdminProduct,
    "name" | "slug" | "category" | "subcategory" | "image" | "published"
  >,
) {
  return {
    name: p.name,
    slug: p.slug,
    category: p.category,
    subcategory: p.subcategory ?? "",
    image: p.image,
    published: p.published !== false,
  };
}

export function listingFieldsChanged(
  existing: AdminProduct,
  next: ProductWriteInput,
): boolean {
  return (
    JSON.stringify(listingCardFields(existing)) !==
    JSON.stringify(listingCardFields(next))
  );
}

export function scopeForProductCreate(slugs: string[]): RevalidateScope {
  return {
    productSegments: slugs,
    listing: true,
    sitemap: true,
  };
}

export function scopeForProductDelete(slugs: string[]): RevalidateScope {
  return {
    productSegments: slugs,
    listing: true,
    sitemap: true,
  };
}

export function scopeForProductUnpublish(slugs: string[]): RevalidateScope {
  return {
    productSegments: slugs,
    listing: true,
    sitemap: true,
  };
}

export function scopeForProductUpdate(
  existing: AdminProduct,
  next: ProductWriteInput,
): RevalidateScope {
  const segments = [
    existing.slug,
    next.slug,
    existing.id,
    next.id,
  ].filter(Boolean);
  const listing = listingFieldsChanged(existing, next);
  const slugChanged = existing.slug !== next.slug;
  return {
    productSegments: segments,
    listing: listing || slugChanged,
    sitemap: listing || slugChanged,
  };
}

export function scopeForCategoriesUpdate(): RevalidateScope {
  return { listing: true, sitemap: true };
}
