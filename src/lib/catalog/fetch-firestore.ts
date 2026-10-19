import "server-only";

import type { Product, Category } from "@/data/products";
import { getFirebaseAdmin } from "@/lib/firebase/admin";

function docToProduct(
  id: string,
  data: Record<string, unknown>,
): Product | null {
  if (data.published !== true) {
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

export async function fetchCatalogFromFirestore(): Promise<{
  categories: Category[];
  allProducts: Product[];
}> {
  const app = getFirebaseAdmin();
  const db = app.firestore();

  const productsSnap = await db
    .collection("products")
    .where("published", "==", true)
    .get();

  const allProducts: Product[] = [];
  for (const doc of productsSnap.docs) {
    const raw = doc.data() as Record<string, unknown>;
    const id = (raw.id as string) ?? doc.id;
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
