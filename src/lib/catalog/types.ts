export type { Product, Category } from "@/data/products";

export type Catalog = {
  categories: import("@/data/products").Category[];
  allProducts: import("@/data/products").Product[];
};
