import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { createArticleSchema, createSpeakableSchema, createBreadcrumbSchema, createHowToSchema, createFAQSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import BlogCard from '@/components/BlogCard';
import EmailCapture from '@/components/EmailCapture';
import ShareButtons from '@/components/ShareButtons';
import LivePoll from '@/components/LivePoll';
import PlayStoreLink from '@/components/PlayStoreLink';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  // Bing Webmaster Fix (August 2026): Cap meta description at 160 chars
  const formatDescription = (desc: string) => {
    if (!desc || desc.length <= 160) return desc;
    const trimmed = desc.slice(0, 157);
    const lastSpace = trimmed.lastIndexOf(' ');
    const finalTrimmed = lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;
    return finalTrimmed.replace(/[.,\s]+$/, '') + '...';
  };
  const optimizedDescription = formatDescription(post.description);
  const formatTitle = (titleStr: string) => {
    if (!titleStr || titleStr.length <= 60) return titleStr;
    const trimmed = titleStr.slice(0, 57);
    const lastSpace = trimmed.lastIndexOf(' ');
    const finalTrimmed = lastSpace > 40 ? trimmed.slice(0, lastSpace) : trimmed;
    return finalTrimmed.replace(/[.,\s]+$/, '') + '...';
  };
  const safeTitle = formatTitle(post.title);

  return {
    title: { absolute: safeTitle },
    description: optimizedDescription,
    openGraph: {
      title: safeTitle,
      description: optimizedDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.heroImage || '/logo.jpg',
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
    },
    // SEO Fix (August 2026 GSC Fix):
    // Explicitly define canonical and all language alternates (en-US, en-IN, x-default) without trailing slash.
    // This prevents Googlebot from falling back to root layout homepage mappings and generating duplicate canonical conflicts.
    alternates: {
      canonical: `https://planbotai.app/blog/${params.slug}`,
      languages: {
        'en-US': `https://planbotai.app/blog/${params.slug}`,
        'en-IN': `https://planbotai.app/blog/${params.slug}`,
        'x-default': `https://planbotai.app/blog/${params.slug}`,
      },
    },
  };
}

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Fetch 3 related posts based on tags and category
  const relatedPosts = getRelatedPosts(post.slug, post.tags, post.category, 3);

  return (
    <>
      <StructuredData data={createArticleSchema({ title: post.title, description: post.description, date: post.date, updated: post.updated, author: post.author, slug: post.slug, image: post.heroImage })} />
      {/* Phase 2 — Speakable schema for AEO/voice search on blog posts (SEO Fix: removed trailing slashes) */}
      <StructuredData data={createSpeakableSchema(`https://planbotai.app/blog/${post.slug}`, post.title)} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'Blog', item: 'https://planbotai.app/blog' },
        { name: post.title, item: `https://planbotai.app/blog/${post.slug}` }
      ])} />
      {/* GSC Rich Snippet Fix: Injected FAQPage schema when FAQs are defined in frontmatter to trigger expandable accordion SERP results */}
      {post.faqs && post.faqs.length > 0 && (
        <StructuredData data={createFAQSchema(post.faqs)} />
      )}
      {post.howToSteps && post.howToSteps.length > 0 && (
        <StructuredData data={createHowToSchema({
          name: post.title,
          description: post.description,
          steps: post.howToSteps,
        })} />
      )}

      <article className="pt-28 pb-20 md:pt-36 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span>By {post.author.name}</span>
              <span>•</span>
              <span>Published: {post.date}</span>
              {post.updated && (
                <>
                  <span>•</span>
                  <span>Updated: {post.updated}</span>
                </>
              )}
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Hero Image */}
          {post.heroImage && (
            <div className="w-full relative aspect-[21/9] mb-12 rounded-2xl overflow-hidden border border-white/10">
              <Image 
                src={post.heroImage} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose-planbot">
            {/* Registered LivePoll client component for interactive community voting */}
            <MDXRemote 
              source={post.content} 
              components={{ LivePoll }}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} 
            />
          </div>

          {/* Social Share & Organic Backlink Component */}
          <ShareButtons title={post.title} url={`https://planbotai.app/blog/${post.slug}`} />

          {/* E-E-A-T Author Bio Section */}
          <div className="mt-12 glass-card p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start border-l-4 border-l-primary">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0 overflow-hidden relative">
              <Image src="/images/naitik-baldaniya.jpg" alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                <a href="/author/naitik-baldaniya" className="hover:text-accent transition-colors">{post.author.name}</a>
              </h4>
              <p className="text-sm font-medium text-accent mb-2">{post.author.role}</p>
              <p className="text-sm text-text-secondary mb-3">
                Expertise: {post.author.expertise}. {post.author.name} built PlanBot to help students and professionals manage their time and achieve their goals using advanced AI automation.
              </p>
              <div className="flex items-center gap-4">
                <a href="/author/naitik-baldaniya" className="text-xs font-semibold text-primary hover:underline">View Full Profile →</a>
                <a href="https://www.linkedin.com/in/naitik-baldaniya-b0079234a" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#0A66C2] hover:underline">Connect on LinkedIn ↗</a>
              </div>
            </div>
          </div>

          {/* Internal Link Matrix & High-Intent Engagement: Contextual Free Interactive Tools Hub Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">⚡ Free Interactive Tools</span>
              <h4 className="text-base font-bold text-white mt-1">Try Our Free AI Productivity Calculators</h4>
              <p className="text-xs text-text-secondary mt-0.5">Generate daily timetables, exam revision roadmaps, or deep work focus intervals in your browser with zero latency.</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="/tools/daily-schedule-generator" className="px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-medium transition">
                Timetable Generator →
              </a>
              <a href="/tools/exam-revision-calculator" className="px-3 py-1.5 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 text-xs font-medium transition">
                Exam Calculator →
              </a>
            </div>
          </div>

          <div className="mt-12 glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Start Planning with AI?</h3>
            <p className="text-text-secondary mb-6">PlanBot is free on Android. Download now and create your first AI plan today.</p>
            <PlayStoreLink location="blog_post" className="btn-primary">
Get PlanBot Free →
</PlayStoreLink>
          </div>

          <EmailCapture />

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.slug}
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    excerpt={relatedPost.description}
                    date={relatedPost.date}
                    readTime={relatedPost.readTime}
                    category={relatedPost.category}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
