const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Normalize web address input: trim, lowercase, strip pasted product URLs.
 */
export function normalizeProductSlug(raw: string): string {
  let s = raw.trim().toLowerCase();

  const fromPath = s.match(/\/product\/([^/?#]+)/);
  if (fromPath?.[1]) {
    s = fromPath[1];
  } else {
    s = s.replace(/^https?:\/\/[^/]+/i, "");
    s = s.replace(/^\/+/, "").replace(/^product\/+/, "");
  }

  s = s
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return s;
}

export function isValidProductSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}
