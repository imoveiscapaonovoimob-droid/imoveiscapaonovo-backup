import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imoveiscapaonovo.com.br'

  const routes = [
    '',
    '/sobre',
    '/blog',
    '/blog/investir-capao-da-canoa',
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

  return routes
}
