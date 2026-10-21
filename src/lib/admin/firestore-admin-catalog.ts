import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdmin } from "@/lib/firebase/admin";
import type { Category } from "@/data/products";
import { loadAdminListRows } from "./admin-list-projection";
import { toAdminListRow, type AdminListRow } from "./admin-list-projection";
import {
  buildFirestoreProductFields,
  docToAdminProduct,
  type AdminProduct,
  type ProductWriteInput,
} from "./product-doc";

function db() {
  return getFirebaseAdmin().firestore();
}

const ADMIN_PAGE_SIZE = 25;

export type AdminProductsPageResult = {
  products: AdminProduct[];
  nextCursor: string | null;
  hasMore: boolean;
  /** Null when total count is unknown (Firestore pagination fallback). */
  totalMatches: number | null;
};

export type ListProductsAdminPageOptions = {
  q?: string;
  category?: string;
  cursor?: string | null;
};

function encodeOffsetCursor(offset: number): string {
  return Buffer.from(String(offset), "utf8").toString("base64url");
}

function decodeOffsetCursor(cursor: string): number {
  const n = Number.parseInt(
    Buffer.from(cursor, "base64url").toString("utf8"),
    10,
  );
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function encodeFirestoreDocCursor(docId: string): string {
  return Buffer.from(`doc:${docId}`, "utf8").toString("base64url");
}

function decodeFirestoreDocCursor(cursor: string): string | null {
  const raw = Buffer.from(cursor, "base64url").toString("utf8");
  if (raw.startsWith("doc:")) return raw.slice(4);
  return null;
}

function adminRowToProduct(row: AdminListRow): AdminProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    image: row.image,
    published: row.published,
  };
}

function filterAdminRows(
  rows: AdminListRow[],
  q?: string,
  category?: string,
): AdminListRow[] {
  let list = rows;
  if (category) {
    list = list.filter((r) => r.category === category);
  }
  const term = q?.trim().toLowerCase();
  if (term) {
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.slug.toLowerCase().includes(term) ||
        r.id.toLowerCase().includes(term),
    );
  }
  return [...list].sort((a, b) => b.updatedAtMs - a.updatedAtMs);
}

function pageFromFilteredRows(
  rows: AdminListRow[],
  offset: number,
): AdminProductsPageResult {
  const slice = rows.slice(offset, offset + ADMIN_PAGE_SIZE + 1);
  const hasMore = slice.length > ADMIN_PAGE_SIZE;
  const pageRows = hasMore ? slice.slice(0, ADMIN_PAGE_SIZE) : slice;
  const nextOffset = offset + ADMIN_PAGE_SIZE;
  return {
    products: pageRows.map(adminRowToProduct),
    hasMore,
    nextCursor: hasMore ? encodeOffsetCursor(nextOffset) : null,
    totalMatches: rows.length,
  };
}

async function listProductsAdminPageFirestore(
  cursor?: string | null,
): Promise<AdminProductsPageResult> {
  let query = db()
    .collection("products")
    .orderBy("updatedAt", "desc")
    .limit(ADMIN_PAGE_SIZE + 1);

  const docId = cursor ? decodeFirestoreDocCursor(cursor) : null;
  if (docId) {
    const cursorDoc = await db().collection("products").doc(docId).get();
    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc);
    }
  }

  const snap = await query.get();
  const hasMore = snap.docs.length > ADMIN_PAGE_SIZE;
  const pageDocs = hasMore ? snap.docs.slice(0, ADMIN_PAGE_SIZE) : snap.docs;

  const products = pageDocs.map((doc) =>
    docToAdminProduct(doc.id, doc.data() as Record<string, unknown>),
  );

  const lastDoc = pageDocs[pageDocs.length - 1];
  return {
    products,
    hasMore,
    nextCursor:
      hasMore && lastDoc ? encodeFirestoreDocCursor(lastDoc.id) : null,
    totalMatches: null,
  };
}

async function listFromFullScanFallback(
  opts: ListProductsAdminPageOptions,
): Promise<AdminProductsPageResult> {
  const snap = await db().collection("products").get();
  const rows = snap.docs.map((doc) =>
    toAdminListRow(doc.id, doc.data() as Record<string, unknown>),
  );
  const offset = opts.cursor ? decodeOffsetCursor(opts.cursor) : 0;
  const filtered = filterAdminRows(rows, opts.q, opts.category);
  return pageFromFilteredRows(filtered, offset);
}

export async function listProductsAdminPage(
  opts: ListProductsAdminPageOptions = {},
): Promise<AdminProductsPageResult> {
  const rows = await loadAdminListRows();
  if (rows) {
    const offset = opts.cursor ? decodeOffsetCursor(opts.cursor) : 0;
    const filtered = filterAdminRows(rows, opts.q, opts.category);
    return pageFromFilteredRows(filtered, offset);
  }

  console.warn(
    "catalog/admin-list missing; run npm run catalog:rebuild-projection. Using Firestore fallback.",
  );

  if (opts.q?.trim() || opts.category) {
    return listFromFullScanFallback(opts);
  }

  return listProductsAdminPageFirestore(opts.cursor);
}

export async function getProductAdmin(id: string): Promise<AdminProduct | null> {
  const doc = await db().collection("products").doc(id).get();
  if (!doc.exists) return null;
  return docToAdminProduct(doc.id, doc.data() as Record<string, unknown>);
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const snap = await db().collection("products").where("slug", "==", slug).limit(2).get();
  return snap.docs.some((d) => d.id !== excludeId);
}

export async function idExists(id: string): Promise<boolean> {
  const doc = await db().collection("products").doc(id).get();
  return doc.exists;
}

export async function createProductAdmin(input: ProductWriteInput): Promise<void> {
  const ref = db().collection("products").doc(input.id);
  const data = buildFirestoreProductFields(input);
  data.updatedAt = FieldValue.serverTimestamp();
  await ref.set(data, { merge: false });
}

export async function updateProductAdmin(
  id: string,
  input: ProductWriteInput,
): Promise<void> {
  const ref = db().collection("products").doc(id);
  const data = buildFirestoreProductFields(input);
  data.updatedAt = FieldValue.serverTimestamp();
  await ref.set(data, { merge: false });
}

export async function deleteProductAdmin(id: string): Promise<boolean> {
  const ref = db().collection("products").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}

export async function unpublishProductAdmin(id: string): Promise<string | null> {
  const ref = db().collection("products").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  const slug = String((doc.data() as { slug?: string }).slug ?? "");
  await ref.update({
    published: false,
    updatedAt: FieldValue.serverTimestamp(),
  });
  return slug;
}

export async function getCategoriesAdmin(): Promise<Category[]> {
  const doc = await db().collection("catalog").doc("categories").get();
  if (!doc.exists) return [];
  return (doc.data()?.categories ?? []) as Category[];
}

export async function setCategoriesAdmin(categories: Category[]): Promise<void> {
  await db().collection("catalog").doc("categories").set({ categories }, { merge: false });
}
