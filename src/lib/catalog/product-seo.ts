import type { Metadata } from 'next';
import type { Product } from '@/data/products';

const BRAND_SUFFIX = ' | Junko Industrial';
const MIN_TITLE_LENGTH = 30;

function titleContextSegment(product: Product): string {
  const sub = product.subcategory?.trim();
  if (sub && sub.toLowerCase() !== 'general') return sub;
  return product.category?.trim() || 'Packaging Equipment';
}

function peersWithSameName(product: Product, allProducts: Product[]): Product[] {
  const key = product.name.trim().toLowerCase();
  return allProducts.filter((p) => p.name.trim().toLowerCase() === key);
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
      title = title.replace(
        BRAND_SUFFIX,
        ` · ${slug}${BRAND_SUFFIX}`,
      );
    }
    if (title.length < MIN_TITLE_LENGTH) {
      title = title.replace(
        BRAND_SUFFIX,
        ` | Packaging Equipment${BRAND_SUFFIX}`,
      );
    }
  }

  return title;
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
