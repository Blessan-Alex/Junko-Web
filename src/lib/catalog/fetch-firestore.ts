import "server-only";

import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { Product, Category } from "@/data/products";
import { getFirebaseAdmin } from "@/lib/firebase/admin";
import { isProductPublished } from "@/lib/catalog/published";

const RELATED_FETCH_LIMIT = 8;
const RELATED_MAX = 4;

function resolveProductId(
  raw: Record<string, unknown>,
  docId: string,
): string {
  return (raw.id as string) ?? docId;
}

function docToProduct(
  id: string,
  data: Record<string, unknown>,
): Product | null {
  if (!isProductPublished(data)) {
    return null;
  }

  const product: Product = {
    id,
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    image: String(data.image ?? ""),
  };

  if (data.subcategory !== undefined) product.subcategory = String(data.subcategory);
  if (data.description !== undefined) product.description = String(data.description);
  if (data.specs !== undefined) product.specs = data.specs as Record<string, string>;
  if (data.features !== undefined) product.features = data.features as string[];
  if (data.featured !== undefined) product.featured = Boolean(data.featured);

  return product;
}

function productsFromSnapshot(
  docs: QueryDocumentSnapshot[],
  excludeId: string,
): Product[] {
  const out: Product[] = [];
  const seen = new Set<string>();

  for (const doc of docs) {
    const raw = doc.data() as Record<string, unknown>;
    const id = resolveProductId(raw, doc.id);
    const product = docToProduct(id, raw);
    if (!product || product.id === excludeId || seen.has(product.id)) {
      continue;
    }
    seen.add(product.id);
    out.push(product);
  }

  return out;
}

function firestore() {
  return getFirebaseAdmin().firestore();
}

/**
 * Public product by URL segment (Firestore doc id or slug). At most one slug query after a doc miss.
 */
export async function fetchProductBySlugOrId(
  param: string,
): Promise<Product | null> {
  const db = firestore();
  const doc = await db.collection("products").doc(param).get();

  if (doc.exists) {
    const raw = doc.data() as Record<string, unknown>;
    const id = resolveProductId(raw, doc.id);
    return docToProduct(id, raw);
  }

  const slugSnap = await db
    .collection("products")
    .where("slug", "==", param)
    .limit(1)
    .get();

  if (slugSnap.empty) {
    return null;
  }

  const slugDoc = slugSnap.docs[0];
  const raw = slugDoc.data() as Record<string, unknown>;
  const id = resolveProductId(raw, slugDoc.id);
  return docToProduct(id, raw);
}

/** Subcategory matches first, then category; excludes current product; capped at 4. */
export async function fetchRelatedProductsFromFirestore(
  product: Product,
): Promise<Product[]> {
  const db = firestore();
  const results: Product[] = [];
  const seen = new Set<string>([product.id]);

  const merge = (candidates: Product[]) => {
    for (const p of candidates) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      results.push(p);
      if (results.length >= RELATED_MAX) return;
    }
  };

  if (product.subcategory) {
    const snap = await db
      .collection("products")
      .where("subcategory", "==", product.subcategory)
      .limit(RELATED_FETCH_LIMIT)
      .get();
    merge(productsFromSnapshot(snap.docs, product.id));
  }

  if (results.length < RELATED_MAX && product.category) {
    const snap = await db
      .collection("products")
      .where("category", "==", product.category)
      .limit(RELATED_FETCH_LIMIT)
      .get();
    merge(productsFromSnapshot(snap.docs, product.id));
  }

  return results.slice(0, RELATED_MAX);
}

export async function fetchCatalogFromFirestore(): Promise<{
  categories: Category[];
  allProducts: Product[];
}> {
  const db = firestore();

  const productsSnap = await db.collection("products").get();

  const allProducts: Product[] = [];
  for (const doc of productsSnap.docs) {
    const raw = doc.data() as Record<string, unknown>;
    const id = resolveProductId(raw, doc.id);
    const product = docToProduct(id, raw);
    if (product) allProducts.push(product);
  }

  allProducts.sort((a, b) => a.id.localeCompare(b.id));

  const categoriesDoc = await db.collection("catalog").doc("categories").get();
  if (!categoriesDoc.exists) {
    throw new Error("Missing Firestore document catalog/categories");
  }

  const categories = (categoriesDoc.data()?.categories ?? []) as Category[];

  return { categories, allProducts };
}
