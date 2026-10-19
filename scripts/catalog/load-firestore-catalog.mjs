import { initFirebaseAdmin } from "./firebase-admin-init.mjs";
import { EXPECTED_PRODUCT_COUNT } from "./validate.mjs";

/**
 * Load staging catalog from Firestore (Admin SDK; bypasses security rules).
 * @returns {{ categories, allProducts, projectId, firestoreDocIds: Map<string,string> }}
 */
export async function loadFirestoreCatalog() {
  const admin = initFirebaseAdmin();
  const db = admin.firestore();
  const projectId =
    admin.app().options.projectId ??
    process.env.GOOGLE_CLOUD_PROJECT ??
    process.env.GCLOUD_PROJECT ??
    "(unknown)";

  const productsSnap = await db.collection("products").get();
  const firestoreDocIds = new Map();
  const allProducts = [];

  for (const doc of productsSnap.docs) {
    const data = doc.data();
    const id = data.id ?? doc.id;
    firestoreDocIds.set(id, doc.id);

    const { updatedAt: _updatedAt, ...rest } = data;
    allProducts.push({
      ...rest,
      id,
      published: data.published,
    });
  }

  if (allProducts.length !== EXPECTED_PRODUCT_COUNT) {
    console.warn(
      `loadFirestoreCatalog: expected ${EXPECTED_PRODUCT_COUNT} products, got ${allProducts.length}`,
    );
  }

  const categoriesDoc = await db.collection("catalog").doc("categories").get();
  if (!categoriesDoc.exists) {
    throw new Error("catalog:parity: missing Firestore document catalog/categories");
  }

  const categories = categoriesDoc.data().categories ?? [];

  return {
    categories,
    allProducts,
    projectId,
    firestoreDocIds,
  };
}
