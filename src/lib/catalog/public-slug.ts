/**
 * Slugs safe for public URLs, sitemap, and internal links (no legacy import artifacts).
 */
export function isPublicCatalogSlug(slug: string | undefined | null): boolean {
  const s = slug?.trim() ?? "";
  if (!s) return false;
  if (s.length > 120) return false;
  if (/\s/.test(s)) return false;
  if (/^https?:\/\//i.test(s)) return false;
  if (s.includes("junko-fze.com")) return false;
  return true;
}

/** Prefer clean slug; fall back to id only when id is itself a valid slug segment. */
export function resolvePublicProductPathSegment(
  slug: string | undefined | null,
  id: string,
): string | null {
  if (isPublicCatalogSlug(slug)) return slug!.trim();
  if (isPublicCatalogSlug(id)) return id.trim();
  return null;
}

/** Public PDP path, or null when slug/id must not be linked (legacy import artifacts). */
export function publicProductHref(
  slug: string | undefined | null,
  id: string,
): string | null {
  const segment = resolvePublicProductPathSegment(slug, id);
  if (!segment) return null;
  return `/product/${segment}`;
}
