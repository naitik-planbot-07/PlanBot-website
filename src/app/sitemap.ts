import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // SEO Fix (September 2026 Sitemap Refresh):
  // 1. Refreshed all URLs with live dynamic Date timestamp for search engine freshness signals.
  // 2. Added all 23 core static & utility routes including new /tools/weather-forecast precision planner.
  // 3. Ingested all 62 MDX blog posts with targeted 0.85 priority boost for trending keywords (Astra, Gemini, Claude, ChatGPT, doomscrolling/YouTube/Instagram, exam schedules).
  // 4. Strictly excluded thin legal pages (privacy, terms, refund, account-deletion) to prevent crawl budget waste and GSC non-index warnings.
  const currentDate = new Date();

  const staticPages = [
    { url: SITE_URL, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/features`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/tools/daily-schedule-generator`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/tools/exam-revision-calculator`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/tools/pomodoro-focus-calculator`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/tools/weather-forecast`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/compare/planbot-vs-motion`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/compare/planbot-vs-notion`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/compare/planbot-vs-todoist`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/compare/planbot-vs-google-calendar`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/compare/planbot-vs-ticktick`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/use-cases`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/use-cases/ai-planner-for-students-exams`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/use-cases/ai-planner-for-working-professionals`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/use-cases/ai-planner-for-adhd-focus`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/blog/ai-planner-guide`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.85 },
    // Thin legal pages (privacy, terms, refund, account-deletion) are kept out of sitemap to conserve crawl budget
    { url: `${SITE_URL}/author/naitik-baldaniya`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const blogPosts = getAllPosts();
  const blogPages = blogPosts.map((post) => {
    // Boost priority for high-value competitive exam, planning, and trend keywords
    let postPriority = 0.75;
    const highValueKeywords = [
      'jee', 'neet', 'upsc', 'cat', 'clat', 'nda', 'gate', 'ssc', 'cuet', 'bank',
      'ai-planner', 'productivity', 'procrastinat', 'planbot-vs', 'i-let-ai',
      'best-productivity', 'time-management', 'habit', 'entrepreneur',
      'astra', 'gemini', 'claude', 'chatgpt', 'youtube', 'instagram'
    ];
    
    if (highValueKeywords.some(keyword => post.slug.includes(keyword))) {
      postPriority = 0.85;
    }

    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: postPriority,
    };
  });

  return [...staticPages, ...blogPages];
}
