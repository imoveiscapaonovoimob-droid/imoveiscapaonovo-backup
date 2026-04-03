import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imoveiscapaonovo.com.br' // Usando o TLD oficial .com.br

  const routes = [
    '',
    '/posto-5',
    '/terrenos',
    '/sobre',
    '/blog',
    '/casas-capao-novo',
    '/apartamentos-capao-novo',
    '/imoveis-costa-serena',
    '/imoveis-velas-da-marina',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
