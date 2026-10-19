import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin-api";
import {
  createProductAdmin,
  getCategoriesAdmin,
  idExists,
  listAllProductsAdmin,
  slugExists,
} from "@/lib/admin/firestore-admin-catalog";
import type { ProductWriteInput } from "@/lib/admin/product-doc";
import { validateProductWrite } from "@/lib/admin/validate-product";
import { jsonFirestoreOkRevalidateFailed, jsonPublishOk } from "@/lib/admin/publish-response";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const products = await listAllProductsAdmin();
  return NextResponse.json({ products });
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

  try {
    return jsonPublishOk([body.slug]);
  } catch (err) {
    return jsonFirestoreOkRevalidateFailed(err);
  }
}
