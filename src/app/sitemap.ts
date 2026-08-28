import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Property from '@/models/Property'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://imoveiscapaonovo.com.br'

  const staticRoutes = [
    '',
    '/sobre',
    '/imoveis',
    '/blog',
    '/blog/investir-capao-da-canoa',
    '/blog/melhores-imoveis-frente-mar-2026',
    '/casas-capao-novo',
    '/apartamentos-capao-novo',
    '/sobrados-capao-novo',
    '/duplex-capao-novo',
    '/studios-capao-novo',
    '/vivendas-capao-novo',
    '/jks-capao-novo',
    '/terrenos-capao-novo',
    '/imoveis-capao-novo',
    '/imoveis-capao-novo-posto-4',
    '/imoveis-capao-novo-posto-5',
    '/imoveis-capao-novo-village',
    '/imoveis-condominios',
    '/imoveis-costa-serena',
    '/imoveis-velas-da-marina',
    '/imoveis-terrasul',
    '/exclusividades',
    '/portfolio',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    await connectDB()
    const properties = await Property.find({ isPublished: true })
      .select('slug updatedAt')
      .lean()

    const propertyRoutes: MetadataRoute.Sitemap = properties.map((property: any) => ({
      url: `${baseUrl}/imoveis/${property.slug}`,
      lastModified: property.updatedAt ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    return [...staticRoutes, ...propertyRoutes]
  } catch (error) {
    console.error('sitemap: failed to load properties, returning static routes only', error)
    return staticRoutes
  }
}
