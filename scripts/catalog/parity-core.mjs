import { EXPECTED_PRODUCT_COUNT } from "./validate.mjs";

export const PRODUCT_FIELDS = [
  "slug",
  "name",
  "category",
  "subcategory",
  "description",
  "image",
  "featured",
];

export const DEEP_EQUAL_WHEN_ON_SNAPSHOT = ["specs", "features"];

export function normalizeOptional(value) {
  return value === undefined || value === null ? undefined : value;
}

function setSymmetricDiff(a, b) {
  const onlyA = [...a].filter((x) => !b.has(x));
  const onlyB = [...b].filter((x) => !a.has(x));
  return { onlyA, onlyB };
}

function stableJson(value) {
  return JSON.stringify(value);
}

/**
 * Compare a live catalog ({ categories, allProducts }) to snapshot baseline.
 */
export function compareCatalogToSnapshot({
  liveCategories,
  liveProducts,
  baselineCategories,
  baselineProducts,
  liveLabel = "live",
  requirePublished = false,
  firestoreDocIds = null,
  maxSamples = 20,
}) {
  const failures = [];
  const mismatchSamples = [];

  if (liveProducts.length !== baselineProducts.length) {
    failures.push(
      `product count: ${liveLabel}=${liveProducts.length}, snapshot=${baselineProducts.length}`,
    );
  }

  if (liveProducts.length !== EXPECTED_PRODUCT_COUNT) {
    failures.push(
      `product count: ${liveLabel}=${liveProducts.length}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }

  const liveIds = liveProducts.map((p) => p.id);
  const uniqueLiveIds = new Set(liveIds).size;
  const liveSlugs = liveProducts.map((p) => p.slug);
  const uniqueLiveSlugs = new Set(liveSlugs).size;

  if (uniqueLiveIds !== EXPECTED_PRODUCT_COUNT) {
    failures.push(
      `unique ids in ${liveLabel}: ${uniqueLiveIds}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }
  if (uniqueLiveSlugs !== EXPECTED_PRODUCT_COUNT) {
    failures.push(
      `unique slugs in ${liveLabel}: ${uniqueLiveSlugs}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }

  const liveIdSet = new Set(liveIds);
  const baseIdSet = new Set(baselineProducts.map((p) => p.id));
  const idDiff = setSymmetricDiff(liveIdSet, baseIdSet);
  if (idDiff.onlyA.length > 0) {
    failures.push(
      `ids only in ${liveLabel} (${idDiff.onlyA.length}): ${idDiff.onlyA.slice(0, 5).join(", ")}${idDiff.onlyA.length > 5 ? "…" : ""}`,
    );
  }
  if (idDiff.onlyB.length > 0) {
    failures.push(
      `ids only in snapshot (${idDiff.onlyB.length}): ${idDiff.onlyB.slice(0, 5).join(", ")}${idDiff.onlyB.length > 5 ? "…" : ""}`,
    );
  }

  const liveSlugSet = new Set(liveSlugs);
  const baseSlugSet = new Set(baselineProducts.map((p) => p.slug));
  const slugDiff = setSymmetricDiff(liveSlugSet, baseSlugSet);
  if (slugDiff.onlyA.length > 0) {
    failures.push(`slugs only in ${liveLabel} (${slugDiff.onlyA.length})`);
  }
  if (slugDiff.onlyB.length > 0) {
    failures.push(`slugs only in snapshot (${slugDiff.onlyB.length})`);
  }

  const baselineById = new Map(baselineProducts.map((p) => [p.id, p]));

  for (const live of liveProducts) {
    if (firestoreDocIds) {
      const docId = firestoreDocIds.get(live.id);
      if (docId === undefined) {
        failures.push(`missing Firestore document for id=${live.id}`);
        continue;
      }
      if (docId !== live.id) {
        failures.push(
          `document ID mismatch: collection doc id=${docId} field id=${live.id}`,
        );
      }
    }

    if (requirePublished && live.published !== true) {
      failures.push(
        `published must be true for id=${live.id} (got ${JSON.stringify(live.published)})`,
      );
    }

    const base = baselineById.get(live.id);
    if (!base) continue;

    for (const field of PRODUCT_FIELDS) {
      const a = normalizeOptional(live[field]);
      const b = normalizeOptional(base[field]);
      if (a !== b) {
        failures.push(`field mismatch on id=${live.id} field=${field}`);
        if (mismatchSamples.length < maxSamples) {
          mismatchSamples.push({
            id: live.id,
            slug: live.slug,
            field,
            live: a,
            snapshot: b,
          });
        }
      }
    }

    for (const field of DEEP_EQUAL_WHEN_ON_SNAPSHOT) {
      if (!(field in base)) continue;
      const a = live[field];
      const b = base[field];
      if (stableJson(a) !== stableJson(b)) {
        failures.push(`field mismatch on id=${live.id} field=${field}`);
        if (mismatchSamples.length < maxSamples) {
          mismatchSamples.push({
            id: live.id,
            slug: live.slug,
            field,
            live: a,
            snapshot: b,
          });
        }
      }
    }
  }

  if (stableJson(liveCategories) !== stableJson(baselineCategories)) {
    failures.push("categories array does not match snapshot");
  }

  return { failures, mismatchSamples };
}

export function printParityResult({
  failures,
  mismatchSamples,
  successMessage,
}) {
  if (mismatchSamples.length > 0) {
    console.log("Sample field mismatches:");
    for (const s of mismatchSamples) {
      const slugPart = s.slug ? ` slug=${s.slug}` : "";
      console.log(`  ${s.id}${slugPart} .${s.field}`);
    }
  }

  if (failures.length > 0) {
    console.error(`catalog:parity FAILED (${failures.length} issue(s)):`);
    for (const f of failures.slice(0, 30)) {
      console.error(`  - ${f}`);
    }
    if (failures.length > 30) {
      console.error(`  … and ${failures.length - 30} more`);
    }
    return false;
  }

  console.log(successMessage);
  return true;
}
