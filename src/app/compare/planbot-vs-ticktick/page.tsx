import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot vs TickTick: AI Daily Planner vs Habit Tracker (2026)',
  description: 'Comparing PlanBot and TickTick. Discover why intelligent AI schedule generation and diurnal focus analytics outperform standard habit checklists.',
  path: '/compare/planbot-vs-ticktick',
});

const faqs = [
  {
    question: 'How does PlanBot differ from TickTick?',
    answer: 'TickTick is a classic to-do list with a habit tracker and timer. PlanBot is an intelligent AI scheduling engine that generates full daily roadmaps based on your cognitive energy peaks, available study hours, and automatically recalculates when plans shift.',
  },
  {
    question: 'Does PlanBot include focus statistics and habit tracking?',
    answer: 'Yes! PlanBot features Productivity Score v2, diurnal peak study time analysis, 30-day rolling statistics, and streak levels.',
  },
];

export default function PlanbotVsTickTickPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot vs TickTick: AI Daily Planner vs Habit Tracker (2026)',
          'Comparing PlanBot and TickTick.',
          `${SITE_URL}/compare/planbot-vs-ticktick`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'PlanBot vs TickTick', item: '/compare/planbot-vs-ticktick' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-accent font-medium">PlanBot vs TickTick</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ App Comparison
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-gradient">PlanBot</span> vs <span className="text-[#3273DC]">TickTick</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            TickTick tracks checkboxes. PlanBot builds your optimal daily execution timeline with AI and actively keeps you in deep focus.
          </p>
        </header>

        {/* Comparison Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 border-t-4 border-t-primary">
            <h2 className="text-2xl font-bold text-white mb-4">PlanBot AI</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>AI Daily Blueprint:</strong> Automatically sequences your morning routine, study sprints, meals, and recovery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Diurnal Peak Analytics:</strong> Pinpoint the exact hours when your cognitive retention is highest.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Adaptive Auto-Reschedule:</strong> Seamlessly shifts tasks with zero manual drag-and-drop.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-t-4 border-t-[#3273DC]">
            <h2 className="text-2xl font-bold text-white mb-4">TickTick</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Manual Task Entry:</strong> Requires manually entering and arranging every task on your own.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No Circadian Energy AI:</strong> Does not calculate cognitive fatigue or optimal study windows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Rigid Time Shifts:</strong> Lacks automatic schedule rebalancing when unexpected delays occur.</span>
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
          <h2 className="text-3xl font-bold text-white mb-4">Experience true AI productivity.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Download PlanBot on Android and build high-performance daily routines in seconds.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            Download PlanBot Free on Android →
          </a>
        </section>
      </main>
    </>
  );
}
