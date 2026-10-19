const fs = require("fs");
const path = require("path");

const CATALOG_SNAPSHOT_RE = /^catalog-\d{4}-\d{2}-\d{2}\.json$/;

function latestCatalogSnapshot(snapshotsDir) {
  if (!fs.existsSync(snapshotsDir)) {
    return null;
  }
  const files = fs
    .readdirSync(snapshotsDir)
    .filter((f) => CATALOG_SNAPSHOT_RE.test(f))
    .sort()
    .reverse();
  return files[0] ? path.join(snapshotsDir, files[0]) : null;
}

function resolveSnapshotPath(snapshotArg) {
  if (snapshotArg) {
    return path.isAbsolute(snapshotArg)
      ? snapshotArg
      : path.join(process.cwd(), snapshotArg);
  }
  const defaultBaseline = path.join(
    process.cwd(),
    "snapshots",
    "catalog-2026-10-19.json",
  );
  if (fs.existsSync(defaultBaseline)) {
    return defaultBaseline;
  }
  return latestCatalogSnapshot(path.join(process.cwd(), "snapshots"));
}

function loadSnapshotFile(snapshotPath) {
  if (!snapshotPath || !fs.existsSync(snapshotPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
}

module.exports = {
  latestCatalogSnapshot,
  resolveSnapshotPath,
  loadSnapshotFile,
};
