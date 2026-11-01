import type { Product } from '@/data/products';

const PLACEHOLDER_DESCRIPTIONS = new Set(
  [
    'next',
    'no description',
    'no desc',
    'no desc , no model name',
  ].map((s) => s.toLowerCase()),
);

const META_DESCRIPTION_MAX = 155;
const META_DESCRIPTION_MIN = 70;

function isPlaceholderDescription(text: string): boolean {
  const firstLine = text.split('\n')[0]?.trim().toLowerCase() ?? '';
  if (PLACEHOLDER_DESCRIPTIONS.has(firstLine)) return true;
  if (firstLine === 'next') return true;
  return false;
}

/** Strip HTML/markdown noise for safe plain-text display and meta tags. */
export function sanitizePlainText(input: string): string {
  let text = input;
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/[#*_`]/g, '');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function contextLabel(product: Product): string {
  const sub = product.subcategory?.trim();
  if (sub && sub.toLowerCase() !== 'general') return sub;
  return product.category?.trim() || 'Packaging equipment';
}

function uniqueFallbackMetaDescription(product: Product): string {
  const label = contextLabel(product);
  const slug = product.slug || product.id;
  return sanitizePlainText(
    `${product.name} (${slug}) — ${label}. Industrial packaging from Junko FZE, UAE. Enquire for specs and supply.`,
  );
}

export function truncateMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX,
): string {
  const cleaned = sanitizePlainText(text);
  if (cleaned.length <= max) return cleaned;
  const slice = cleaned.slice(0, max + 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : cleaned.slice(0, max);
  let result = `${cut.trimEnd()}…`;
  if (result.length > max) {
    result = `${result.slice(0, max - 1).trimEnd()}…`;
  }
  return result;
}

export function getProductDescriptionForDisplay(product: Product): string {
  const raw = product.description?.trim() ?? '';
  if (raw && !isPlaceholderDescription(raw)) {
    return raw;
  }
  return `High quality ${product.name} designed for industrial applications. Part of our premium ${product.category} line.`;
}

function modelRefSuffix(product: Product): string {
  const slug = product.slug || product.id;
  return ` Ref: ${slug}.`;
}

/** Meta description: unique, plain text, no import placeholders. */
export function getProductDescriptionForMetadata(product: Product): string {
  const raw = product.description?.trim() ?? '';
  let text: string;
  if (raw && !isPlaceholderDescription(raw)) {
    text = sanitizePlainText(raw.replace(/\n+/g, ' '));
    if (text.length < META_DESCRIPTION_MIN) {
      text = uniqueFallbackMetaDescription(product);
    } else {
      const suffix = modelRefSuffix(product);
      const bodyMax = META_DESCRIPTION_MAX - suffix.length;
      const body = truncateMetaDescription(text, bodyMax).replace(/…$/, '');
      text = `${body}${suffix}`;
    }
  } else {
    text = uniqueFallbackMetaDescription(product);
  }
  return truncateMetaDescription(text, META_DESCRIPTION_MAX);
}

export { META_DESCRIPTION_MAX, META_DESCRIPTION_MIN };
