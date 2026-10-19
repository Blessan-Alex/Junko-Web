export type CatalogSource = "file" | "firestore";

export function getCatalogSource(): CatalogSource {
  const value = (process.env.CATALOG_SOURCE ?? "file").trim().toLowerCase();
  return value === "firestore" ? "firestore" : "file";
}
