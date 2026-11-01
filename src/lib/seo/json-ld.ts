import type { Product } from '@/data/products';
import { sanitizePlainText } from '@/lib/catalog/product-copy';
import {
  SITE_ADDRESS,
  SITE_CONTACT,
  SITE_LOGO_URL,
  SITE_ORIGIN,
  absoluteAssetUrl,
  absoluteCanonical,
} from '@/lib/seo/site';

export type BreadcrumbJsonLdItem = {
  name: string;
  path: string;
};

export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Junko FZE',
    url: SITE_ORIGIN,
    logo: SITE_LOGO_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    areaServed: ['AE', 'OM', 'SA', 'QA', 'KW', 'BH', 'IN'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: SITE_CONTACT.telephone,
      email: SITE_CONTACT.email,
      areaServed: ['AE', 'OM', 'SA', 'QA', 'KW', 'BH'],
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

export function buildBreadcrumbListJsonLd(
  items: BreadcrumbJsonLdItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteCanonical(item.path),
    })),
  };
}

const PLACEHOLDER_IMAGE = '/products/placeholders/no-image.png';

export type BuildProductJsonLdOptions = {
  product: Product;
  canonicalSlug: string;
  plainDescription: string;
  imagePath: string;
};

export function buildProductJsonLd(
  options: BuildProductJsonLdOptions,
): Record<string, unknown> {
  const { product, canonicalSlug, plainDescription, imagePath } = options;
  const productUrl = absoluteCanonical(`/product/${canonicalSlug}`);
  const sku = product.slug?.trim() || product.id;
  const description = sanitizePlainText(plainDescription);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    sku,
    mpn: sku,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Junko FZE',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Junko FZE',
      },
    },
  };

  if (imagePath && imagePath !== PLACEHOLDER_IMAGE) {
    schema.image = [absoluteAssetUrl(imagePath)];
  }

  return schema;
}
