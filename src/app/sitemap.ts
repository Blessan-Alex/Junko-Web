import { MetadataRoute } from 'next'
import { getCatalog } from '@/lib/catalog/get-catalog'
import { categoryNameToSlug } from '@/lib/catalog/category-slugs'
import { resolvePublicProductPathSegment } from '@/lib/catalog/public-slug'

export const revalidate = 604800;

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
    return [{
      url: `${baseUrl}/product/${segment}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }]
  })

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
