import type { Metadata } from 'next';
import Image from 'next/image';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, personSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/mdx';

// SEO Fix (August 2026 GSC Fix):
// Use createMetadata to enforce self-referencing canonicals and language alternates for author profile.
export const metadata: Metadata = createMetadata({
  title: 'Naitik Baldaniya - Founder & CEO of PlanBot',
  description: 'The 17-year-old founder of PlanBot - started coding at 12, began PlanBot at 14 in May 2024, launched 1 March 2026. The full story.',
  path: '/author/naitik-baldaniya',
});

export default function AuthorPage() {
  const posts = getAllPosts();

  return (
    <>
      <StructuredData data={createWebPageSchema(
        'Naitik Baldaniya - Founder & CEO of PlanBot',
        'Productivity expert and software developer dedicated to building AI-driven scheduling and focus systems.',
        `${SITE_URL}/author/naitik-baldaniya`
      )} />
      <StructuredData data={personSchema} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'About', item: 'https://planbotai.app/about' },
        { name: 'Naitik Baldaniya', item: 'https://planbotai.app/author/naitik-baldaniya' },
      ])} />

      <div className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start border-l-4 border-l-primary">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/20 flex items-center justify-center text-5xl shrink-0 overflow-hidden relative">
            <Image src="/images/naitik-baldaniya.jpg" alt="Naitik Baldaniya" fill className="object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Naitik Baldaniya</h1>
            <p className="text-lg md:text-xl font-medium text-accent mb-4">Founder & CEO, PlanBot</p>
            <div className="text-text-secondary mb-6 leading-relaxed">
              <p className="mb-4">
                Naitik Baldaniya is a 17-year-old software developer from Gujarat, India - and the founder of PlanBot. He wrote his first program at 12, started building PlanBot in May 2024 at age 14, and launched it on Google Play on 1 March 2026. He is currently finishing a Diploma in IT in Ahmedabad (class of 2027) while running PlanBot solo.
              </p>
              <p>
                PlanBot began at the gym in May 2024, from one honest observation: he could not manage his own time, and every to-do app he tried only stored tasks instead of making the plan. So he built the AI that does the planning - you provide the goal, it provides the schedule. He is self-taught, works solo under PlannextTech (founded 2024), and ships everything himself, from the AI plan builder to the focus timer. His mission: make real AI planning free enough for every student tired of color-coded to-do lists that never get done.
              </p>
            </div>
            <div className="mt-6">
              <a href="https://www.linkedin.com/in/naitik-baldaniya-b0079234a" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-block">
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <h2 className="section-heading mb-8">Articles by <span className="text-gradient">Naitik Baldaniya</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Play Store CTA Module */}
        <div className="mt-16 glass-card p-8 md:p-10 text-center border-primary/40">
          <h3 className="text-2xl font-bold text-white mb-3">Experience AI Planning Built by Naitik</h3>
          <p className="text-text-secondary max-w-xl mx-auto mb-6">
            Get automated daily schedules, habit streaks, and diurnal focus analytics for free on Android.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            Download PlanBot Free on Google Play →
          </a>
        </div>
      </div>
    </>
  );
}
