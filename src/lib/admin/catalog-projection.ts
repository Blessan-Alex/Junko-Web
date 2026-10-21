import "server-only";

import { FieldValue, type QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { Category, Product } from "@/data/products";
import { getFirebaseAdmin } from "@/lib/firebase/admin";
import { isProductPublished } from "@/lib/catalog/published";
import { getCategoriesAdmin } from "./firestore-admin-catalog";

export type ListingCard = Pick<
  Product,
  "id" | "slug" | "name" | "category" | "image"
> & {
  subcategory?: string;
  description?: string;
};

export type CatalogListingDoc = {
  version: number;
  updatedAt: ReturnType<typeof FieldValue.serverTimestamp>;
  categories: Category[];
  products: ListingCard[];
};

export type SitemapEntry = {
  id: string;
  slug: string;
};

export type CatalogSitemapDoc = {
  version: number;
  updatedAt: ReturnType<typeof FieldValue.serverTimestamp>;
  entries: SitemapEntry[];
};

function db() {
  return getFirebaseAdmin().firestore();
}

function toListingCard(
  id: string,
  data: Record<string, unknown>,
): ListingCard | null {
  if (!isProductPublished(data)) return null;
  const description = data.description
    ? String(data.description).slice(0, 200)
    : undefined;
  return {
    id: String(data.id ?? id),
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    image: String(data.image ?? ""),
    ...(data.subcategory !== undefined
      ? { subcategory: String(data.subcategory) }
      : {}),
    ...(description ? { description } : {}),
  };
}

export const PROJECTION_REBUILD_WARNING =
  "Saved to Firestore but catalog listing/sitemap projection failed. Run npm run catalog:rebuild-projection or publish again.";

/** Returns false when projection rebuild fails (product write may still have succeeded). */
export async function tryRebuildCatalogProjections(): Promise<boolean> {
  try {
    await rebuildCatalogProjections();
    return true;
  } catch (err) {
    console.error("rebuildCatalogProjections failed:", err);
    return false;
  }
}

export function projectionRebuildResponseExtra(
  projectionOk: boolean,
): Record<string, unknown> | undefined {
  if (projectionOk) return undefined;
  return {
    projectionRebuildFailed: true,
    warning: PROJECTION_REBUILD_WARNING,
  };
}

async function backfillMissingUpdatedAt(
  docs: QueryDocumentSnapshot[],
): Promise<void> {
  const refs = docs
    .filter((doc) => {
      const raw = doc.data() as Record<string, unknown>;
      return raw.updatedAt === undefined || raw.updatedAt === null;
    })
    .map((doc) => doc.ref);
  if (refs.length === 0) return;

  const BATCH_LIMIT = 500;
  for (let i = 0; i < refs.length; i += BATCH_LIMIT) {
    const batch = db().batch();
    for (const ref of refs.slice(i, i + BATCH_LIMIT)) {
      batch.update(ref, { updatedAt: FieldValue.serverTimestamp() });
    }
    await batch.commit();
  }
}

/**
 * Full collection scan — admin/publish only, not public GET.
 * Writes catalog/listing and catalog/sitemap (1 read each on public routes).
 */
export async function rebuildCatalogProjections(): Promise<void> {
  const categories = await getCategoriesAdmin();
  const snap = await db().collection("products").get();

  await backfillMissingUpdatedAt(snap.docs);

  const products: ListingCard[] = [];
  const entries: SitemapEntry[] = [];

  for (const doc of snap.docs) {
    const raw = doc.data() as Record<string, unknown>;
    const card = toListingCard(doc.id, raw);
    if (!card) continue;
    products.push(card);
    entries.push({
      id: card.id,
      slug: card.slug || card.id,
    });
  }

  products.sort((a, b) => a.name.localeCompare(b.name));
  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  const listing: CatalogListingDoc = {
    version: 1,
    updatedAt: FieldValue.serverTimestamp(),
    categories,
    products,
  };

  const sitemap: CatalogSitemapDoc = {
    version: 1,
    updatedAt: FieldValue.serverTimestamp(),
    entries,
  };

  const batch = db().batch();
  batch.set(db().collection("catalog").doc("listing"), listing, { merge: false });
  batch.set(db().collection("catalog").doc("sitemap"), sitemap, { merge: false });
  await batch.commit();
}
