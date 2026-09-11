import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule — allow all standard search engine crawlers
      {
        userAgent: '*',
        allow: ['/', '/app-ads.txt', '/ads.txt', '/llms.txt', '/llms-full.txt', '/llm.txt'],
        // SEO Fix (July 2026): Disallow query-parameter URLs — the site is 100% static
        // and has no search engine. Googlebot was crawling /?s={search_term_string}
        // which appeared in GSC as "Alternative page with proper canonical tag",
        // wasting crawl budget. Disallow prevents future crawls of parameter variants.
        // Bing & Google Fix (August 2026): Standardized query param disallow to /*? to block all URL parameters cleanly.
        // GSC Fix (August 2026): Block RSC .txt payload files — Next.js static export
        // generates .txt files for React Server Components that Google crawls as duplicates,
        // causing 42 "Page with redirect" errors. /*.txt blocks all .txt URLs except robots.txt.
        // AdMob Fix (Sept 2026): Allow /app-ads.txt and /ads.txt explicitly so AdMob/Google ad crawlers are not blocked by /*.txt.
        disallow: ['/api/', '/_next/', '/*?', '/*.txt'],
      },
      // Google AdMob & AdSense Crawlers
      { userAgent: 'Mediapartners-Google', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Google-Apps-Ads-Txt', allow: '/', disallow: ['/api/'] },
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
    // Bing Webmaster Fix: Removed deprecated Host directive which triggered a syntax error in Bing Webmaster Tools tester.
  };
}
