import { NextRequest, NextResponse } from "next/server";
import type { Category } from "@/data/products";
import {
  getCategoriesAdmin,
  setCategoriesAdmin,
} from "@/lib/admin/firestore-admin-catalog";
import { requireAdminApi } from "@/lib/admin/require-admin-api";
import { validateCategories } from "@/lib/admin/validate-product";
import { jsonFirestoreOkRevalidateFailed, jsonPublishOk } from "@/lib/admin/publish-response";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const categories = await getCategoriesAdmin();
  return NextResponse.json({ categories });
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: { categories?: Category[] };
  try {
    body = (await request.json()) as { categories?: Category[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validationError = validateCategories(body.categories);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await setCategoriesAdmin(body.categories ?? []);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Firestore update failed" }, { status: 500 });
  }

  try {
    return jsonPublishOk([]);
  } catch (err) {
    return jsonFirestoreOkRevalidateFailed(err);
  }
}
