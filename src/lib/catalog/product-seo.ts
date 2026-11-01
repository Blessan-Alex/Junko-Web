import type { Metadata } from 'next';
import type { Product } from '@/data/products';

const BRAND_SUFFIX = ' | Junko Industrial';
export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 58;

function titleCaseSegment(segment: string): string {
  const trimmed = segment.trim();
  if (!trimmed) return 'Packaging Equipment';
  if (trimmed.length <= 28 && !trimmed.includes('  ')) {
    return trimmed
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  return words.slice(0, 2).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function titleContextSegment(product: Product): string {
  const sub = product.subcategory?.trim();
  if (sub && sub.toLowerCase() !== 'general') {
    return titleCaseSegment(sub);
  }
  return titleCaseSegment(product.category?.trim() || 'Packaging Equipment');
}

export function peersWithSameName(
  product: Product,
  allProducts: Product[],
): Product[] {
  const key = product.name.trim().toLowerCase();
  return allProducts.filter((p) => p.name.trim().toLowerCase() === key);
}

/** Truncate assembled title while keeping brand suffix when possible. */
export function truncateProductTitle(title: string): string {
  if (title.length <= MAX_TITLE_LENGTH) return title;

  const suffixIdx = title.lastIndexOf(BRAND_SUFFIX);
  const hasBrand = suffixIdx > 0 && suffixIdx === title.length - BRAND_SUFFIX.length;
  const brand = hasBrand ? BRAND_SUFFIX : '';
  let body = hasBrand ? title.slice(0, suffixIdx) : title;

  const dashIdx = body.indexOf(' — ');
  const name = dashIdx >= 0 ? body.slice(0, dashIdx) : body;
  let rest = dashIdx >= 0 ? body.slice(dashIdx + 3) : '';
  let segment = rest;
  let slugPart: string | null = null;
  const slugMarker = ' · ';
  const slugIdx = rest.lastIndexOf(slugMarker);
  if (slugIdx > 0) {
    slugPart = rest.slice(slugIdx + slugMarker.length).trim() || null;
    segment = rest.slice(0, slugIdx).trim();
  }

  while (
    `${name} — ${segment}${slugPart ? ` · ${slugPart}` : ''}${brand}`.length >
      MAX_TITLE_LENGTH &&
    segment.length > 0
  ) {
    const next = segment.replace(/\s+\S+$/, '').trim();
    if (next === segment) {
      segment = segment.slice(0, Math.max(0, segment.length - 4)).trimEnd();
      if (!segment) break;
    } else {
      segment = next;
    }
  }

  let result = segment
    ? `${name} — ${segment}`
    : name;
  if (slugPart) result = `${result} · ${slugPart}`;
  result = `${result}${brand}`;

  if (result.length > MAX_TITLE_LENGTH) {
    const tail = slugPart ? `${slugMarker}${slugPart}${brand}` : brand;
    const nameRoom = MAX_TITLE_LENGTH - tail.length;
    if (nameRoom >= 12) {
      const shortName =
        name.length > nameRoom
          ? `${name.slice(0, nameRoom - 1).trimEnd()}…`
          : name;
      result = slugPart ? `${shortName}${slugMarker}${slugPart}${brand}` : `${shortName}${brand}`;
    } else if (slugPart) {
      const slugRoom = MAX_TITLE_LENGTH - brand.length - slugMarker.length;
      result = `${slugPart.slice(0, Math.max(6, slugRoom)).trimEnd()}${brand}`;
    } else {
      const room = MAX_TITLE_LENGTH - brand.length - 1;
      result = `${name.slice(0, Math.max(8, room)).trimEnd()}…${brand}`;
    }
  }

  return result;
}

export function buildProductPageTitle(
  product: Product,
  allProducts: Product[],
): string {
  const segment = titleContextSegment(product);
  const slug = product.slug || product.id;
  let title = `${product.name} — ${segment}`;

  const peers = peersWithSameName(product, allProducts);
  if (peers.length > 1) {
    title = `${title} · ${slug}`;
  }

  title = `${title}${BRAND_SUFFIX}`;

  if (title.length < MIN_TITLE_LENGTH) {
    if (!title.includes(` · ${slug}`)) {
      title = title.replace(BRAND_SUFFIX, ` · ${slug}${BRAND_SUFFIX}`);
    }
    if (title.length < MIN_TITLE_LENGTH) {
      title = title.replace(
        BRAND_SUFFIX,
        ` | Packaging Equipment${BRAND_SUFFIX}`,
      );
    }
  }

  return truncateProductTitle(title);
}

export function getProductPageTitleMetadata(
  product: Product,
  allProducts: Product[],
): Pick<Metadata, 'title' | 'openGraph' | 'twitter'> {
  const pageTitle = buildProductPageTitle(product, allProducts);
  return {
    title: { absolute: pageTitle },
    openGraph: { title: pageTitle },
    twitter: { title: pageTitle },
  };
}
