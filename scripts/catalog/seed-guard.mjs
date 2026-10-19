/** Default staging project — seed without extra flags when creds match this id. */
export const STAGING_PROJECT_ID = "junko-web-staging";

export function getResolvedProjectId(admin) {
  return (
    admin.app().options.projectId ??
    process.env.FIREBASE_PROJECT_ID ??
    null
  );
}

/**
 * Block accidental writes to non-staging Firebase projects.
 * Production seed requires --confirm-production AND CATALOG_SEED_CONFIRM=yes.
 * Optional CATALOG_SEED_EXPECTED_PROJECT or --expected-project-id= must match.
 */
export function assertSeedTargetAllowed(projectId, options = {}) {
  const { confirmProduction = false, expectedProjectId = null } = options;

  if (!projectId) {
    throw new Error(
      "catalog:seed: could not resolve Firebase project id from credentials",
    );
  }

  const expected =
    expectedProjectId ??
    process.env.CATALOG_SEED_EXPECTED_PROJECT ??
    null;

  if (expected && expected !== projectId) {
    throw new Error(
      `catalog:seed: project id "${projectId}" does not match expected "${expected}"`,
    );
  }

  if (projectId === STAGING_PROJECT_ID) {
    return;
  }

  const envConfirm = process.env.CATALOG_SEED_CONFIRM === "yes";
  if (!confirmProduction || !envConfirm) {
    throw new Error(
      `catalog:seed: refusing to write to "${projectId}" (not staging). ` +
        `For production cutover only: set CATALOG_SEED_CONFIRM=yes and pass --confirm-production ` +
        `(optionally --expected-project-id=${projectId}).`,
    );
  }

  console.warn(
    `catalog:seed: writing to non-staging project "${projectId}" (148 products from snapshot)`,
  );
}
