import type { Metadata } from 'next';

export function parseListingPageNum(page?: string): number {
  const n = Number.parseInt(page ?? '1', 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function getProductsIndexListingCopy() {
  return {
    canonicalPath: '/products',
    listingTitle: 'Industrial Packaging Machinery Catalog | Junko FZE',
    listingDescription:
      'Browse our complete catalog of industrial bag closing machines, sealers, and consumables. High-performance machinery for your production line.',
  };
}

export function getCategoryListingCopy(categoryName: string, categorySlug: string) {
  return {
    canonicalPath: `/products/${categorySlug}`,
    listingTitle: `${categoryName} | Industrial Catalog | Junko FZE`,
    listingDescription: `Explore ${categoryName} from Junko FZE — packaging machinery and equipment for industrial production lines in the UAE and GCC.`,
  };
}

export function getProductsIndexMetadata(page?: string): Metadata {
  const pageNum = parseListingPageNum(page);
  const { canonicalPath, listingTitle, listingDescription } =
    getProductsIndexListingCopy();
  const title = listingTitle;
  const description = listingDescription;
  const canonical = canonicalPath;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    ...(pageNum >= 2 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

export function getCategoryListingMetadata(
  categoryName: string,
  categorySlug: string,
  page?: string,
): Metadata {
  const pageNum = parseListingPageNum(page);
  const { canonicalPath, listingTitle, listingDescription } =
    getCategoryListingCopy(categoryName, categorySlug);
  const canonical = canonicalPath;
  const title = listingTitle;
  const description = listingDescription;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    ...(pageNum >= 2 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}
