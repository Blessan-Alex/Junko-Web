import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdminApi } from "@/lib/admin/require-admin-api";
import {
  BLOB_MAX_BYTES,
  buildProductBlobPath,
  extensionForMime,
  isAllowedImageMime,
  blobPathSegment,
} from "@/lib/admin/blob-upload";
import { imageUploadTooLargeMessage } from "@/lib/admin/image-upload-limits";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage is not configured (BLOB_READ_WRITE_TOKEN)" },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart body" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  if (!isAllowedImageMime(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, and WebP images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > BLOB_MAX_BYTES) {
    return NextResponse.json(
      { error: imageUploadTooLargeMessage(file.size) },
      { status: 400 },
    );
  }

  const ext = extensionForMime(file.type);
  if (!ext) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }

  const slug = formData.get("slug")?.toString().trim();
  const productId = formData.get("productId")?.toString().trim();
  const keyBase = slug || productId || "upload";
  const pathname = buildProductBlobPath(keyBase, ext);

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      productKey: blobPathSegment(keyBase),
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
