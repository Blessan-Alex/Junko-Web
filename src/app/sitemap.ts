import { MetadataRoute } from 'next'
import redirectsData from '../../scripts/redirects.json'
import { getCatalog } from '@/lib/catalog/get-catalog'
import { categoryNameToSlug } from '@/lib/catalog/category-slugs'
import { resolvePublicProductPathSegment } from '@/lib/catalog/public-slug'

export const revalidate = 604800;

const redirectSources = new Set(
  (redirectsData as { source: string }[]).map((rule) => rule.source),
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.junko-fze.com'
  const { allProducts, categories } = await getCatalog()

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/services',
    '/vision'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/products/${categoryNameToSlug(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  const productRoutes = allProducts.flatMap((product) => {
    const segment = resolvePublicProductPathSegment(product.slug, product.id)
    if (!segment) return []
    const productPath = `/product/${segment}`
    if (redirectSources.has(productPath)) return []
    return [{
      url: `${baseUrl}/product/${segment}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }]
  })

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
