import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot vs Todoist: Best AI Planner Comparison (2026)',
  description: 'Comparing PlanBot and Todoist. Why time-blocking with AI prevents task rollover anxiety and beats static to-do lists.',
  path: '/compare/planbot-vs-todoist',
});

const faqs = [
  {
    question: 'Why is an AI planner better than a to-do list like Todoist?',
    answer: 'A to-do list tells you WHAT to do, but leaves WHEN you will do it completely unassigned. This causes over-scheduling and rollover anxiety. PlanBot calculates the time each task takes and places it into an actual realistic daily schedule.',
  },
  {
    question: 'Can PlanBot handle recurring daily routines?',
    answer: 'Yes! You can set up morning routines, workout blocks, study sessions, and work sprints that PlanBot fits automatically into your daily calendar.',
  },
];

export default function PlanbotVsTodoistPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot vs Todoist: Best AI Planner Comparison (2026)',
          'Comparing PlanBot and Todoist AI daily planners.',
          `${SITE_URL}/compare/planbot-vs-todoist`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'PlanBot vs Todoist', item: '/compare/planbot-vs-todoist' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-accent font-medium">PlanBot vs Todoist</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ App Comparison
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-gradient">PlanBot</span> vs <span className="text-[#E44332]">Todoist</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Todoist gives you an endless checklist. PlanBot builds a realistic, time-aware daily timetable that actually fits within your waking hours.
          </p>
        </header>

        {/* Feature Comparison Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 border-t-4 border-t-primary">
            <h2 className="text-2xl font-bold text-white mb-4">PlanBot</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Time-Aware Planning:</strong> AI prevents you from putting 12 hours of work into an 8-hour day.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Circadian Energy Matching:</strong> Places deep cognitive tasks during your peak morning/afternoon focus window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Productivity Score v2:</strong> Deep analytics on actual focus time vs planned time.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-t-4 border-t-[#E44332]">
            <h2 className="text-2xl font-bold text-white mb-4">Todoist</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Time-Blind Checklists:</strong> A list of 40 tasks has no concept of how many hours each task takes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Task Rollover Guilt:</strong> Incomplete tasks pile up day after day, causing anxiety and burnout.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Manual Priority Sorting:</strong> You have to manually organize and re-date overdue tasks.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-6">
                <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-surface/30 p-10 md:p-12 rounded-2xl border border-glass-border">
          <h2 className="text-3xl font-bold text-white mb-4">Upgrade from static checklists to active AI.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Experience the clarity of knowing exactly what to do next without second-guessing your calendar.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            Download PlanBot for Free →
          </a>
        </section>
      </main>
    </>
  );
}
