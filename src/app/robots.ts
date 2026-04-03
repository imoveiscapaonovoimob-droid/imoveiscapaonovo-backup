import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Permite que todos os crawlers (IA e Busca) acessem o conteúdo de valor
        allow: '/',
        disallow: ['/api/', '/admin/'], // Bloqueia diretórios técnicos
      },
      {
        userAgent: 'GPTBot', // Garante que o ChatGPT indexe para respostas diretas (GEO)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      }
    ],
    sitemap: 'https://imoveiscapaonovo.com.br/sitemap.xml',
    host: 'https://imoveiscapaonovo.com.br',
  }
}
