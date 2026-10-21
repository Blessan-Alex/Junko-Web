import "server-only";

import { BlobNotFoundError, del, list } from "@vercel/blob";
import { blobPathSegment } from "@/lib/admin/blob-upload";

const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";
const LIST_CAP = 50;

function blobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function isManagedBlobImageUrl(url: string | undefined): boolean {
  const trimmed = url?.trim() ?? "";
  if (!trimmed.startsWith("https://")) return false;
  try {
    const host = new URL(trimmed).hostname.toLowerCase();
    return host.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

/** Delete one blob; returns a warning message on non-fatal failure. */
export async function deleteBlobUrl(url: string): Promise<string | null> {
  if (!isManagedBlobImageUrl(url)) return null;
  const token = blobToken();
  if (!token) {
    return "Blob token not configured; image file was not removed from storage.";
  }

  try {
    await del(url, { token });
    return null;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    const message = err instanceof Error ? err.message : String(err);
    console.error("Blob delete failed:", url, err);
    return message;
  }
}

/** Remove all blobs under products/{slugOrId}/ (migrate + upload orphans). */
export async function deleteProductBlobFolder(
  slugOrId: string,
): Promise<string[]> {
  const warnings: string[] = [];
  const token = blobToken();
  if (!token) {
    warnings.push(
      "Blob token not configured; product images may remain in storage.",
    );
    return warnings;
  }

  const prefix = `products/${blobPathSegment(slugOrId)}/`;

  try {
    const result = await list({ prefix, limit: LIST_CAP, token });
    const urls = result.blobs.map((b) => b.url);
    if (urls.length === 0) return warnings;

    try {
      await del(urls, { token });
    } catch (err) {
      if (!(err instanceof BlobNotFoundError)) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Blob prefix delete failed:", prefix, err);
        warnings.push(message);
      }
    }

    if (result.blobs.length >= LIST_CAP) {
      warnings.push(
        `More than ${LIST_CAP} files under ${prefix}; some blobs may remain.`,
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Blob list failed:", prefix, err);
    warnings.push(message);
  }

  return warnings;
}
