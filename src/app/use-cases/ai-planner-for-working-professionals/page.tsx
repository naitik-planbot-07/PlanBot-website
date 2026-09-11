import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'AI Daily Planner for Working Professionals & Developers (2026)',
  description: 'How PlanBot AI helps developers, managers, and entrepreneurs time-box deep work, protect cognitive focus, and prevent workday burnout.',
  path: '/use-cases/ai-planner-for-working-professionals',
});

const faqs = [
  {
    question: 'How does PlanBot help busy professionals with unpredictable schedules?',
    answer: 'PlanBot uses dynamic AI rebalancing. When a client meeting runs over or urgent fire drills occur, PlanBot recalculates your remaining workday with one tap, protecting your highest-priority deliverables.',
  },
  {
    question: 'Can I structure evening wind-down rituals to disconnect from work?',
    answer: 'Yes! PlanBot includes structured shutdown rituals that help you review completed milestones, plan tomorrow, and power down without lingering work stress.',
  },
];

export default function ProfessionalUseCasePage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'AI Daily Planner for Working Professionals & Developers (2026)',
          'How PlanBot AI helps professionals time-box deep work and prevent burnout.',
          `${SITE_URL}/use-cases/ai-planner-for-working-professionals`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Use Cases', item: '/use-cases' },
          { name: 'Working Professionals', item: '/use-cases/ai-planner-for-working-professionals' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link>
          <span>/</span>
          <span className="text-accent font-medium">Working Professionals</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            💼 Deep Work &amp; High Leverage
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Take Control of Your <span className="text-gradient">Workday</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Eliminate context-switching friction. PlanBot structures your high-impact deliverables around your peak biological energy windows.
          </p>
        </header>

        {/* 3 Pillars */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 border-t-4 border-t-primary">
            <div className="text-2xl mb-3">⚡</div>
            <h2 className="text-lg font-bold text-white mb-2">Deep Work Protection</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Ring-fences 90-minute uninterrupted focus blocks for coding, writing, and high-level strategy before checking shallow inbox tasks.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-accent">
            <div className="text-2xl mb-3">🛡️</div>
            <h2 className="text-lg font-bold text-white mb-2">Meeting Buffer Shield</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Automatically inserts cognitive decompression buffers so back-to-back calls don&apos;t destroy your afternoon focus.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-purple-400">
            <div className="text-2xl mb-3">🌙</div>
            <h2 className="text-lg font-bold text-white mb-2">Shutdown Ritual</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              A 5-minute evening review that cleanly closes your mental workday and guarantees guilt-free personal evenings.
            </p>
          </div>
        </section>

        {/* Free Tool Cross-Promotion Card */}
        <section className="glass-card p-6 md:p-8 mb-16 border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/10 to-surface/40">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Free Interactive Utility</span>
            <h3 className="text-xl font-bold text-white mt-1">Try Our Free Daily Time-Blocking Generator</h3>
            <p className="text-xs text-text-secondary mt-1">Create an optimized workday schedule based on your start time and focus goals.</p>
          </div>
          <Link href="/tools/daily-schedule-generator" className="btn-primary whitespace-nowrap text-xs !py-3 !px-6">
            Generate Timetable →
          </Link>
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
          <h2 className="text-3xl font-bold text-white mb-4">Reclaim 2+ hours of deep focus every day.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Experience effortless AI scheduling on Android with PlanBot.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            Download PlanBot on Android Free →
          </a>
        </section>
      </main>
    </>
  );
}
