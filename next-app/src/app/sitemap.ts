import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imoveiscapaonovo.com.br'

  const pillarPages = [
    '', '/casas-capao-novo', '/apartamentos-capao-novo', '/terrenos-capao-novo',
  ]

  const longTailPages = [
    '/casa-barata-capao-novo', '/casa-2-dormitorios-capao-novo',
    '/casa-3-dormitorios-capao-novo', '/casa-perto-do-mar-capao-novo',
    '/casa-com-patio-capao-novo', '/apartamento-barato-capao-novo',
    '/apartamento-2-dormitorios-capao-novo', '/apartamento-mobiliado-capao-novo',
    '/apartamento-perto-do-mar-capao-novo', '/terreno-de-esquina-capao-novo',
    '/terreno-para-investimento-capao-novo', '/terreno-comercial-capao-novo',
  ]

  const otherPages = [
    '/imoveis-capao-novo', '/imoveis-capao-novo-posto-4', '/imoveis-capao-novo-posto-5',
    '/imoveis-capao-novo-village', '/imoveis-costa-serena', '/imoveis-velas-da-marina',
    '/imoveis-terrasul', '/sobre', '/blog', '/guia', '/portfolio', '/exclusividades',
  ]

  const mapRoute = (route: string, priority: number) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  })

  return [
    ...pillarPages.map(r => mapRoute(r, r === '' ? 1.0 : 0.9)),
    ...longTailPages.map(r => mapRoute(r, 0.8)),
    ...otherPages.map(r => mapRoute(r, 0.7)),
  ]
}
