import { MetadataRoute } from 'next'
import { getCatalog } from '@/lib/catalog/get-catalog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.junko-fze.com'
  const { allProducts } = await getCatalog()

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

  const productRoutes = allProducts.map(product => ({
    url: `${baseUrl}/product/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes]
}
