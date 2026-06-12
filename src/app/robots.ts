import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule — allow all standard search engine crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // ── AI Crawlers — explicit allow for maximum AI ingestion ──
      // OpenAI crawlers
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] },
      // Anthropic crawlers
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/'] },
      // Perplexity crawlers
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/api/'] },
      // Google AI / Apple AI
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/'] },
      // Other AI & data crawlers
      { userAgent: 'cohere-ai', allow: '/', disallow: ['/api/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Amazonbot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Bytespider', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
