import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";
import { getFirebaseAdmin } from "@/lib/firebase/admin";
import { docToAdminProduct } from "./product-doc";

export type AdminListRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  published: boolean;
  updatedAtMs: number;
};

export type CatalogAdminListDoc = {
  version: number;
  updatedAt: ReturnType<typeof FieldValue.serverTimestamp>;
  products: AdminListRow[];
};

function toUpdatedAtMs(data: Record<string, unknown>): number {
  const u = data.updatedAt;
  if (
    u &&
    typeof u === "object" &&
    "toMillis" in u &&
    typeof (u as { toMillis: () => number }).toMillis === "function"
  ) {
    return (u as { toMillis: () => number }).toMillis();
  }
  return 0;
}

export function toAdminListRow(
  id: string,
  data: Record<string, unknown>,
): AdminListRow {
  const product = docToAdminProduct(id, data);
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    published: product.published !== false,
    updatedAtMs: toUpdatedAtMs(data),
  };
}

async function fetchAdminListProjectionRaw(): Promise<AdminListRow[] | null> {
  const doc = await getFirebaseAdmin()
    .firestore()
    .collection("catalog")
    .doc("admin-list")
    .get();
  if (!doc.exists) return null;
  const products = doc.data()?.products;
  if (!Array.isArray(products)) return null;
  return products as AdminListRow[];
}

const ADMIN_LIST_MISSING = "ADMIN_LIST_PROJECTION_MISSING";

const getCachedAdminListRows = unstable_cache(
  async (): Promise<AdminListRow[]> => {
    const rows = await fetchAdminListProjectionRaw();
    if (rows === null) {
      throw new Error(ADMIN_LIST_MISSING);
    }
    return rows;
  },
  ["admin-catalog-v1"],
  { tags: ["admin-catalog"] },
);

/** Returns null when catalog/admin-list is missing (not cached — avoids sticky null). */
export async function loadAdminListRows(): Promise<AdminListRow[] | null> {
  try {
    return await getCachedAdminListRows();
  } catch (err) {
    if (err instanceof Error && err.message === ADMIN_LIST_MISSING) {
      return null;
    }
    throw err;
  }
}
