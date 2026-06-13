import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { createArticleSchema, createSpeakableSchema, createBreadcrumbSchema, createHowToSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import BlogCard from '@/components/BlogCard';
import EmailCapture from '@/components/EmailCapture';

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
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.heroImage || '/logo.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: { canonical: `https://planbotai.app/blog/${params.slug}/` },
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
      <StructuredData data={createArticleSchema({ title: post.title, description: post.description, date: post.date, author: post.author, slug: post.slug, image: post.heroImage })} />
      {/* Phase 2 — Speakable schema for AEO/voice search on blog posts */}
      <StructuredData data={createSpeakableSchema(`https://planbotai.app/blog/${post.slug}/`, post.title)} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app/' },
        { name: 'Blog', item: 'https://planbotai.app/blog/' },
        { name: post.title, item: `https://planbotai.app/blog/${post.slug}/` }
      ])} />
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
              <span>{post.date}</span>
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
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {/* E-E-A-T Author Bio Section */}
          <div className="mt-12 glass-card p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start border-l-4 border-l-primary">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0">
              👨‍💻
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{post.author.name}</h4>
              <p className="text-sm font-medium text-accent mb-2">{post.author.role}</p>
              <p className="text-sm text-text-secondary">
                Expertise: {post.author.expertise}. {post.author.name} built PlanBot to help students and professionals manage their time and achieve their goals using advanced AI automation.
              </p>
            </div>
          </div>

          <div className="mt-16 glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Start Planning with AI?</h3>
            <p className="text-text-secondary mb-6">PlanBot is free on Android. Download now and create your first AI plan today.</p>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Get PlanBot Free →</a>
          </div>

          <EmailCapture />

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Keep Reading</h3>
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
