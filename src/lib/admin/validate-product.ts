import type { Category } from "@/data/products";
import type { ProductWriteInput } from "./product-doc";

export function isValidImageRef(image: string | undefined): boolean {
  const trimmed = image?.trim() ?? "";
  if (!trimmed) return false;
  if (trimmed.startsWith("/")) return true;
  if (trimmed.startsWith("https://")) return true;
  return false;
}

export function validateProductWrite(
  input: ProductWriteInput,
  categories: Category[],
  options?: { isCreate?: boolean },
): string | null {
  if (!input.id?.trim()) return "id is required";
  if (!input.slug?.trim()) return "slug is required";
  if (!input.name?.trim()) return "name is required";
  if (!input.category?.trim()) return "category is required";
  if (!isValidImageRef(input.image)) {
    return "image URL or path is required";
  }

  const cat = categories.find((c) => c.name === input.category);
  if (!cat) return `category "${input.category}" is not in the categories tree`;

  if (
    input.subcategory &&
    cat.subcategories.length > 0 &&
    !cat.subcategories.includes(input.subcategory)
  ) {
    return `subcategory "${input.subcategory}" is not listed under "${input.category}"`;
  }

  if (options?.isCreate && !/^[a-zA-Z0-9_-]+$/.test(input.id)) {
    return "id should use letters, numbers, underscores, hyphens";
  }

  return null;
}

export function validateCategories(categories: unknown): string | null {
  if (!Array.isArray(categories)) return "categories must be an array";
  for (const c of categories) {
    if (!c || typeof c !== "object") return "invalid category entry";
    const row = c as { name?: unknown; subcategories?: unknown };
    if (!row.name || typeof row.name !== "string") return "each category needs a name";
    if (!Array.isArray(row.subcategories)) return "subcategories must be an array";
  }
  return null;
}
