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
        userAgent: 'GPTBot', // ChatGPT (OpenAI)
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot', // Busca do ChatGPT
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Gemini e AI Overviews / Modo IA
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', // Claude (Anthropic)
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl, usado no treino de vários LLMs
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
      },
    ],
    sitemap: 'https://imoveiscapaonovo.com.br/sitemap.xml',
    host: 'https://imoveiscapaonovo.com.br',
  }
}
