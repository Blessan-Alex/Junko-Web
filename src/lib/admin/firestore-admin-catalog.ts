import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdmin } from "@/lib/firebase/admin";
import type { Category } from "@/data/products";
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
};

function encodeAdminCursor(docId: string): string {
  return Buffer.from(docId, "utf8").toString("base64url");
}

function decodeAdminCursor(cursor: string): string {
  return Buffer.from(cursor, "base64url").toString("utf8");
}

export async function listProductsAdminPage(
  cursor?: string | null,
): Promise<AdminProductsPageResult> {
  let query = db()
    .collection("products")
    .orderBy("updatedAt", "desc")
    .limit(ADMIN_PAGE_SIZE + 1);

  if (cursor) {
    const docId = decodeAdminCursor(cursor);
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
    nextCursor: hasMore && lastDoc ? encodeAdminCursor(lastDoc.id) : null,
  };
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
