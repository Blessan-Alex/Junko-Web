import "server-only";

export const BLOB_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function extensionForMime(mime: string): string | null {
  return MIME_TO_EXT[mime] ?? null;
}

export function isAllowedImageMime(mime: string): boolean {
  return ALLOWED_MIME.has(mime);
}

/** Safe path segment for Blob object keys. */
export function blobPathSegment(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "product";
}

export function buildProductBlobPath(
  slugOrId: string,
  ext: string,
): string {
  const segment = blobPathSegment(slugOrId);
  return `products/${segment}/main-${Date.now()}.${ext}`;
}
