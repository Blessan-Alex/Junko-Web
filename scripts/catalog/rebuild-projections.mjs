/**
 * Ops-only rebuild of catalog/listing, catalog/sitemap, catalog/admin-list.
 * Mirrors src/lib/admin/catalog-projection.ts without server-only imports.
 */

function isProductPublished(data) {
  return data.published !== false;
}

function isPublicCatalogSlug(slug) {
  const s = slug?.trim() ?? "";
  if (!s) return false;
  if (s.length > 120) return false;
  if (/\s/.test(s)) return false;
  if (/^https?:\/\//i.test(s)) return false;
  if (s.includes("junko-fze.com")) return false;
  return true;
}

function resolvePublicProductPathSegment(slug, id) {
  if (isPublicCatalogSlug(slug)) return slug.trim();
  if (isPublicCatalogSlug(id)) return id.trim();
  return null;
}

function toUpdatedAtMs(data) {
  const u = data.updatedAt;
  if (u && typeof u === "object" && typeof u.toMillis === "function") {
    return u.toMillis();
  }
  return 0;
}

function toAdminListRow(id, data) {
  return {
    id: String(data.id ?? id),
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    image: String(data.image ?? ""),
    published: data.published !== false,
    updatedAtMs: toUpdatedAtMs(data),
  };
}

function toListingCard(id, data) {
  if (!isProductPublished(data)) return null;
  const description = data.description
    ? String(data.description).slice(0, 200)
    : undefined;
  const card = {
    id: String(data.id ?? id),
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    image: String(data.image ?? ""),
  };
  if (data.subcategory !== undefined) {
    card.subcategory = String(data.subcategory);
  }
  if (description) card.description = description;
  return card;
}

export async function rebuildCatalogProjections(admin) {
  const { FieldValue } = admin.firestore;
  const db = admin.firestore();

  const categoriesDoc = await db.collection("catalog").doc("categories").get();
  if (!categoriesDoc.exists) {
    throw new Error("catalog/categories missing");
  }
  const categories = categoriesDoc.data().categories ?? [];

  const snap = await db.collection("products").get();

  const products = [];
  const entries = [];
  const adminProducts = [];

  for (const doc of snap.docs) {
    const raw = doc.data();
    adminProducts.push(toAdminListRow(doc.id, raw));
    const card = toListingCard(doc.id, raw);
    if (!card) continue;
    products.push(card);
    const pathSegment = resolvePublicProductPathSegment(card.slug, card.id);
    if (!pathSegment) {
      console.warn(
        `catalog projection: skipping sitemap entry for ${card.id} (invalid slug: ${card.slug})`,
      );
      continue;
    }
    entries.push({ id: card.id, slug: pathSegment });
  }

  adminProducts.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
  products.sort((a, b) => a.name.localeCompare(b.name));
  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  const batch = db.batch();
  batch.set(
    db.collection("catalog").doc("listing"),
    {
      version: 1,
      updatedAt: FieldValue.serverTimestamp(),
      categories,
      products,
    },
    { merge: false },
  );
  batch.set(
    db.collection("catalog").doc("sitemap"),
    {
      version: 1,
      updatedAt: FieldValue.serverTimestamp(),
      entries,
    },
    { merge: false },
  );
  batch.set(
    db.collection("catalog").doc("admin-list"),
    {
      version: 1,
      updatedAt: FieldValue.serverTimestamp(),
      products: adminProducts,
    },
    { merge: false },
  );
  await batch.commit();
}
