import { categories, allProducts } from '../../src/data/products';
import { buildProductPageTitle } from '../../src/lib/catalog/product-seo';
import {
  getProductDescriptionForMetadata,
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
} from '../../src/lib/catalog/product-copy';
import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from '../../src/lib/catalog/product-seo';
import { getAllListingMetadataForAudit } from '../../src/lib/catalog/category-seo';
import { resolvePublicProductPathSegment } from '../../src/lib/catalog/public-slug';

type Issue = {
  id: string;
  slug: string;
  type: string;
  detail: string;
};

const issues: Issue[] = [];
const titleMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();

for (const product of allProducts) {
  const slug = resolvePublicProductPathSegment(product.slug, product.id);
  if (!slug) continue;

  const title = buildProductPageTitle(product, allProducts);
  const description = getProductDescriptionForMetadata(product);

  if (title.length < MIN_TITLE_LENGTH) {
    issues.push({
      id: product.id,
      slug,
      type: 'title_short',
      detail: `length ${title.length}`,
    });
  }
  if (title.length > MAX_TITLE_LENGTH) {
    issues.push({
      id: product.id,
      slug,
      type: 'title_long',
      detail: `length ${title.length}: ${title}`,
    });
  }
  if (description.length < META_DESCRIPTION_MIN) {
    issues.push({
      id: product.id,
      slug,
      type: 'meta_short',
      detail: `length ${description.length}`,
    });
  }
  if (description.length > META_DESCRIPTION_MAX) {
    issues.push({
      id: product.id,
      slug,
      type: 'meta_long',
      detail: `length ${description.length}`,
    });
  }

  const tList = titleMap.get(title) ?? [];
  tList.push(slug);
  titleMap.set(title, tList);

  const dList = descMap.get(description) ?? [];
  dList.push(slug);
  descMap.set(description, dList);
}

for (const [title, slugs] of titleMap) {
  if (slugs.length > 1) {
    for (const slug of slugs) {
      const product = allProducts.find(
        (p) => resolvePublicProductPathSegment(p.slug, p.id) === slug,
      );
      if (product) {
        issues.push({
          id: product.id,
          slug,
          type: 'title_duplicate',
          detail: `shared with ${slugs.length} URLs`,
        });
      }
    }
  }
}

for (const [description, slugs] of descMap) {
  if (slugs.length > 1) {
    for (const slug of slugs) {
      const product = allProducts.find(
        (p) => resolvePublicProductPathSegment(p.slug, p.id) === slug,
      );
      if (product) {
        issues.push({
          id: product.id,
          slug,
          type: 'meta_duplicate',
          detail: `shared with ${slugs.length} URLs`,
        });
      }
    }
  }
}

const listings = getAllListingMetadataForAudit(categories);
const listingTitleMap = new Map<string, string[]>();
const listingDescMap = new Map<string, string[]>();
for (const row of listings) {
  const t = listingTitleMap.get(row.title) ?? [];
  t.push(row.path);
  listingTitleMap.set(row.title, t);
  const d = listingDescMap.get(row.description) ?? [];
  d.push(row.path);
  listingDescMap.set(row.description, d);
}

const listingIssues: { path: string; type: string; detail: string }[] = [];
for (const [title, paths] of listingTitleMap) {
  if (paths.length > 1) {
    for (const path of paths) {
      listingIssues.push({
        path,
        type: 'listing_title_duplicate',
        detail: title,
      });
    }
  }
}
for (const [desc, paths] of listingDescMap) {
  if (paths.length > 1) {
    for (const path of paths) {
      listingIssues.push({
        path,
        type: 'listing_meta_duplicate',
        detail: desc.slice(0, 80),
      });
    }
  }
}

const summary = {
  productCount: allProducts.length,
  indexableProducts: titleMap.size,
  issueCount: issues.length,
  byType: issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.type] = (acc[i.type] ?? 0) + 1;
    return acc;
  }, {}),
  listingIssueCount: listingIssues.length,
};

console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      summary,
      issues,
      listingIssues,
      listings,
    },
    null,
    2,
  ),
);
