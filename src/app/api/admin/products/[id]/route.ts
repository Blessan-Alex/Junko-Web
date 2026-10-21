import { NextRequest, NextResponse } from "next/server";
import {
  deleteBlobUrl,
  deleteProductBlobFolder,
  isManagedBlobImageUrl,
} from "@/lib/admin/blob-cleanup";
import {
  deleteProductAdmin,
  getCategoriesAdmin,
  getProductAdmin,
  slugExists,
  unpublishProductAdmin,
  updateProductAdmin,
} from "@/lib/admin/firestore-admin-catalog";
import { requireAdminApi } from "@/lib/admin/require-admin-api";
import type { ProductWriteInput } from "@/lib/admin/product-doc";
import { normalizeProductSlug } from "@/lib/admin/normalize-slug";
import { validateProductWrite } from "@/lib/admin/validate-product";
import { taxonomyFromProducts } from "@/lib/admin/revalidate-catalog";
import { jsonFirestoreOkRevalidateFailed, jsonPublishOk } from "@/lib/admin/publish-response";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { id } = await context.params;
  const product = await getProductAdmin(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;
  const existing = await getProductAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: ProductWriteInput;
  try {
    body = (await request.json()) as ProductWriteInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.id !== id) {
    return NextResponse.json({ error: "id is immutable" }, { status: 400 });
  }

  body.slug = normalizeProductSlug(body.slug);
  body.published = body.published !== false;

  const categories = await getCategoriesAdmin();
  const validationError = validateProductWrite(body, categories);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (await slugExists(body.slug, id)) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const slugsToRevalidate = [existing.slug, body.slug].filter(Boolean);

  try {
    await updateProductAdmin(id, body);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Firestore update failed" }, { status: 500 });
  }

  const blobCleanupWarnings: string[] = [];
  if (
    existing.image &&
    body.image !== existing.image &&
    isManagedBlobImageUrl(existing.image)
  ) {
    const warning = await deleteBlobUrl(existing.image);
    if (warning) blobCleanupWarnings.push(warning);
  }

  try {
    return jsonPublishOk(
      [...slugsToRevalidate, body.id],
      {
        product: body,
        ...(blobCleanupWarnings.length > 0
          ? { blobCleanupWarnings }
          : undefined),
      },
      taxonomyFromProducts(existing, body),
    );
  } catch (err) {
    return jsonFirestoreOkRevalidateFailed(err);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;
  const existing = await getProductAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const permanent =
    request.nextUrl.searchParams.get("permanent") === "true";

  if (permanent) {
    const blobKey = existing.slug || existing.id;
    try {
      const deleted = await deleteProductAdmin(id);
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      const blobCleanupWarnings = await deleteProductBlobFolder(blobKey);
      return jsonPublishOk(
        [existing.slug, existing.id].filter(Boolean),
        {
          deleted: true,
          ...(blobCleanupWarnings.length > 0
            ? { blobCleanupWarnings }
            : undefined),
        },
        taxonomyFromProducts(existing),
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Permanent delete failed" },
        { status: 500 },
      );
    }
  }

  try {
    const slug = await unpublishProductAdmin(id);
    if (!slug) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return jsonPublishOk(
      [slug, existing.slug, existing.id].filter(Boolean),
      undefined,
      taxonomyFromProducts(existing),
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unpublish failed" }, { status: 500 });
  }
}
