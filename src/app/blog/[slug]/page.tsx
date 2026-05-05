import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllSlugs, getPostBySlug } from '@/lib/mdx';
import { createArticleSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

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
      authors: [post.author],
    },
    alternates: { canonical: `https://planbot.vercel.app/blog/${params.slug}` },
  };
}

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <StructuredData data={createArticleSchema({ title: post.title, description: post.description, date: post.date, author: post.author, slug: post.slug })} />

      <article className="pt-28 pb-20 md:pt-36 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-planbot">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Start Planning with AI?</h3>
            <p className="text-text-secondary mb-6">PlanBot is free on Android. Download now and create your first AI plan today.</p>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Get PlanBot Free →</a>
          </div>
        </div>
      </article>
    </>
  );
}
