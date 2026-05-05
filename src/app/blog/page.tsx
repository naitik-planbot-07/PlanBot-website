import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/mdx';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Blog — AI Planning Tips, Study Guides & Productivity',
  description: 'Read AI planning tips, study guides, exam prep strategies, and productivity hacks from the PlanBot team. Learn to plan smarter.',
  path: '/blog',
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Tips, Guides & Strategies for <span className="text-gradient">Goal Achievers</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          AI planning tips, study strategies, and productivity wisdom — from the PlanBot team.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-text-secondary mb-4">📝 Blog posts coming soon!</p>
              <p className="text-text-dim">We&apos;re preparing amazing content about AI planning, study tips, and productivity.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.description}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
