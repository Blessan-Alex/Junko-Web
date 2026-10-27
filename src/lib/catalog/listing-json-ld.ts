import type { Product } from '@/data/products';
import { PUBLIC_PRODUCTS_PAGE_SIZE } from '@/lib/catalog/public-page-size';

const SITE_ORIGIN = 'https://www.junko-fze.com';

export type ListingCollectionPageJsonLdOptions = {
  name: string;
  description: string;
  canonicalPath: string;
  filteredProducts: Product[];
};

function productPath(product: Product): string {
  const slug = product.slug || product.id;
  return `/product/${slug}`;
}

export function buildListingCollectionPageJsonLd(
  options: ListingCollectionPageJsonLdOptions,
): Record<string, unknown> {
  const { name, description, canonicalPath, filteredProducts } = options;
  const pageItems = filteredProducts.slice(0, PUBLIC_PRODUCTS_PAGE_SIZE);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_ORIGIN}${canonicalPath}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filteredProducts.length,
      itemListElement: pageItems.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_ORIGIN}${productPath(product)}`,
      })),
    },
  };
}
