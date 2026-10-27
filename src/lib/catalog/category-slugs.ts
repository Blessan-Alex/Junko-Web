import type { Category } from '@/data/products';

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Display name → URL segment, e.g. SEALING MACHINES → sealing-machines */
export function categoryNameToSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Legacy ?category= values: already-slugged or display name with spaces */
export function categoryParamToSlug(param: string): string {
  const decoded = decodeURIComponent(param).trim();
  if (SLUG_PATTERN.test(decoded)) return decoded;
  return categoryNameToSlug(decoded);
}

export function buildCategorySlugByName(
  categories: Category[],
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const c of categories) {
    map[c.name] = categoryNameToSlug(c.name);
  }
  return map;
}

export function resolveCategorySlug(
  slug: string,
  categories: Category[],
): string | null {
  const normalized = slug.trim().toLowerCase();
  for (const c of categories) {
    if (categoryNameToSlug(c.name) === normalized) return c.name;
  }
  return null;
}

export function getCategoryPath(
  categoryName: string,
  slugByName: Record<string, string>,
): string {
  const slug = slugByName[categoryName];
  if (!slug) return '/products';
  return `/products/${slug}`;
}
