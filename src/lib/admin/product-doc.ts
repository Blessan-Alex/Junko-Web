import type { Product } from "@/data/products";

export type AdminProduct = Product & {
  published?: boolean;
};

export type ProductWriteInput = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  subcategory?: string;
  description?: string;
  specs?: Record<string, string>;
  features?: string[];
  featured?: boolean;
  published?: boolean;
};

export function buildFirestoreProductFields(
  input: ProductWriteInput,
  includePublished = true,
): Record<string, unknown> {
  const doc: Record<string, unknown> = {
    id: input.id,
    slug: input.slug,
    name: input.name,
    category: input.category,
    image: input.image,
  };
  if (input.subcategory !== undefined && input.subcategory !== "") {
    doc.subcategory = input.subcategory;
  }
  if (input.description !== undefined) doc.description = input.description;
  if (input.specs !== undefined) doc.specs = input.specs;
  if (input.features !== undefined) doc.features = input.features;
  if (input.featured !== undefined) doc.featured = input.featured;
  if (includePublished) {
    doc.published = input.published !== false;
  }
  return doc;
}

export function docToAdminProduct(
  id: string,
  data: Record<string, unknown>,
): AdminProduct {
  const product: AdminProduct = {
    id,
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    image: String(data.image ?? ""),
    published: data.published !== false,
  };
  if (data.subcategory !== undefined) product.subcategory = String(data.subcategory);
  if (data.description !== undefined) product.description = String(data.description);
  if (data.specs !== undefined) product.specs = data.specs as Record<string, string>;
  if (data.features !== undefined) product.features = data.features as string[];
  if (data.featured !== undefined) product.featured = Boolean(data.featured);
  return product;
}
