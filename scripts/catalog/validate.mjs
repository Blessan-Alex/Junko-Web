export const EXPECTED_PRODUCT_COUNT = 148;

export function computeStats(products) {
  const ids = products.map((p) => p.id);
  const slugs = products.map((p) => p.slug);
  const uniqueIds = new Set(ids).size;
  const uniqueSlugs = new Set(slugs).size;

  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  const duplicateSlugs = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);

  return {
    productCount: products.length,
    uniqueIds,
    uniqueSlugs,
    duplicateIds: [...new Set(duplicateIds)],
    duplicateSlugs: [...new Set(duplicateSlugs)],
  };
}

export function assertBaseline(stats) {
  const errors = [];

  if (stats.productCount !== EXPECTED_PRODUCT_COUNT) {
    errors.push(
      `productCount is ${stats.productCount}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }
  if (stats.uniqueIds !== EXPECTED_PRODUCT_COUNT) {
    errors.push(
      `uniqueIds is ${stats.uniqueIds}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }
  if (stats.uniqueSlugs !== EXPECTED_PRODUCT_COUNT) {
    errors.push(
      `uniqueSlugs is ${stats.uniqueSlugs}, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
  }
  if (stats.duplicateIds.length > 0) {
    errors.push(`duplicate ids: ${stats.duplicateIds.join(", ")}`);
  }
  if (stats.duplicateSlugs.length > 0) {
    errors.push(`duplicate slugs: ${stats.duplicateSlugs.join(", ")}`);
  }

  if (errors.length > 0) {
    const err = new Error(errors.join("; "));
    err.errors = errors;
    throw err;
  }
}
