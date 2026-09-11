import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot vs Notion: Which is the Best AI Planner? (2026)',
  description: 'Comparing PlanBot and Notion. Why automated AI daily scheduling beats hours of manual template building and database configuration.',
  path: '/compare/planbot-vs-notion',
});

const faqs = [
  {
    question: 'Can Notion automatically schedule my day like PlanBot?',
    answer: 'No. Notion is an all-in-one document workspace and database. It requires manual task creation, manual time entry, and manual reorganization. PlanBot actively generates and adjusts your daily timeline using artificial intelligence.',
  },
  {
    question: 'Can I use PlanBot alongside Notion?',
    answer: 'Yes! Many users keep Notion as their long-term knowledge base or notes repository, while using PlanBot on Android as their daily execution engine to actually complete daily focus blocks.',
  },
];

export default function PlanbotVsNotionPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot vs Notion: Which is the Best AI Planner? (2026)',
          'Comparing PlanBot and Notion AI daily planners.',
          `${SITE_URL}/compare/planbot-vs-notion`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'PlanBot vs Notion', item: '/compare/planbot-vs-notion' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-accent font-medium">PlanBot vs Notion</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ App Comparison
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-gradient">PlanBot</span> vs <span className="text-gray-300">Notion</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Notion is a powerful document workspace, but building daily planner templates takes hours. PlanBot generates your complete daily schedule in 3 seconds.
          </p>
        </header>

        {/* Comparison Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 border-t-4 border-t-primary">
            <h2 className="text-2xl font-bold text-white mb-4">PlanBot</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Instant Setup:</strong> Zero template building or database relations. Open app and start planning immediately.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Dynamic Auto-Reschedule:</strong> If a task takes longer than planned, AI reshuffles your day instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Gamified Motivation:</strong> Daily focus rings, streaks, and XP systems maintain your consistency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Native Android Speed:</strong> Opens in milliseconds with lightweight offline execution.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-t-4 border-t-gray-500">
            <h2 className="text-2xl font-bold text-white mb-4">Notion</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>High Setup Friction:</strong> You must design databases, formulas, and views before you can even plan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Static Drag-and-Drop:</strong> Missed tasks require manual rescheduling item by item.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No Built-in Gamification:</strong> Relies entirely on willpower without habit feedback loops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Heavy Mobile Load Times:</strong> Slow web-wrapper mobile app can lag on complex pages.</span>
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
          <h2 className="text-3xl font-bold text-white mb-4">Stop tweaking templates. Start getting things done.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Let PlanBot handle the scheduling logistics so you can focus 100% on deep work and study execution.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            Get PlanBot Free on Android →
          </a>
        </section>
      </main>
    </>
  );
}
