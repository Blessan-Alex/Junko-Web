import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin-api";
import {
  projectionRebuildResponseExtra,
  tryRebuildCatalogProjections,
} from "@/lib/admin/catalog-projection";
import {
  createProductAdmin,
  getCategoriesAdmin,
  idExists,
  listProductsAdminPage,
  slugExists,
} from "@/lib/admin/firestore-admin-catalog";
import type { ProductWriteInput } from "@/lib/admin/product-doc";
import { normalizeProductSlug } from "@/lib/admin/normalize-slug";
import { validateProductWrite } from "@/lib/admin/validate-product";
import { scopeForProductCreate } from "@/lib/admin/revalidate-scope";
import { taxonomyFromProducts } from "@/lib/admin/revalidate-catalog";
import { jsonFirestoreOkRevalidateFailed, jsonPublishOk } from "@/lib/admin/publish-response";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const params = request.nextUrl.searchParams;
  const page = await listProductsAdminPage({
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    cursor: params.get("cursor"),
  });
  return NextResponse.json(page);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: ProductWriteInput;
  try {
    body = (await request.json()) as ProductWriteInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  body.slug = normalizeProductSlug(body.slug);
  body.published = body.published !== false;

  const categories = await getCategoriesAdmin();
  const validationError = validateProductWrite(body, categories, { isCreate: true });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (await idExists(body.id)) {
    return NextResponse.json({ error: "Product id already exists" }, { status: 409 });
  }
  if (await slugExists(body.slug)) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  try {
    await createProductAdmin(body);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Firestore create failed" }, { status: 500 });
  }
  const projectionOk = await tryRebuildCatalogProjections();

  try {
    const segments = [body.slug, body.id].filter(Boolean);
    return jsonPublishOk(segments, projectionRebuildResponseExtra(projectionOk), {
      ...scopeForProductCreate(segments),
      taxonomy: taxonomyFromProducts(body),
    });
  } catch (err) {
    return jsonFirestoreOkRevalidateFailed(err);
  }
}
