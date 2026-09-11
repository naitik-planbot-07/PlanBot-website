import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'AI Daily Planner for ADHD & Focus Overwhelm (2026)',
  description: 'How PlanBot AI conquers ADHD task paralysis and decision fatigue with low-friction scheduling, visual timers, and guilt-free dynamic rebalancing.',
  path: '/use-cases/ai-planner-for-adhd-focus',
});

const faqs = [
  {
    question: 'Why do traditional to-do lists fail for people with ADHD?',
    answer: 'Standard to-do lists trigger executive dysfunction and task paralysis because they present a wall of unorganized demands without clear start times or duration estimates. Overdue red badges create shame spirals.',
  },
  {
    question: 'How does PlanBot make daily planning ADHD-friendly?',
    answer: 'PlanBot eliminates blank-page paralysis by turning your tasks into small, clear time blocks. If you miss a task, 1-tap dynamic rescheduling moves it forward without guilt or shame.',
  },
];

export default function AdhdUseCasePage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'AI Daily Planner for ADHD & Focus Overwhelm (2026)',
          'How PlanBot AI conquers ADHD task paralysis and executive dysfunction.',
          `${SITE_URL}/use-cases/ai-planner-for-adhd-focus`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Use Cases', item: '/use-cases' },
          { name: 'ADHD Focus', item: '/use-cases/ai-planner-for-adhd-focus' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link>
          <span>/</span>
          <span className="text-purple-400 font-medium">ADHD Focus</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300 mb-4">
            🧠 Designed for Neurodivergent Focus
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Conquer <span className="text-gradient">Task Paralysis</span> with AI
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            No shame spirals. No overwhelming walls of text. PlanBot transforms chaotic to-do lists into clear, bite-sized daily momentum.
          </p>
        </header>

        {/* 3 Pillars */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 border-t-4 border-t-purple-400">
            <div className="text-2xl mb-3">🧩</div>
            <h2 className="text-lg font-bold text-white mb-2">Zero-Guilt Rescheduling</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Fell off track? No overdue red alerts. Tap one button and PlanBot peacefully reorganizes your afternoon.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-primary">
            <div className="text-2xl mb-3">⏱️</div>
            <h2 className="text-lg font-bold text-white mb-2">Single-Task Clarity</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Focus on one discrete time block at a time instead of juggling 30 open mental loops.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-accent">
            <div className="text-2xl mb-3">🎮</div>
            <h2 className="text-lg font-bold text-white mb-2">Dopamine Gamification</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Earn XP, level up your productivity rank, and close daily focus rings for instant positive feedback.
            </p>
          </div>
        </section>

        {/* Free Tool Cross-Promotion Card */}
        <section className="glass-card p-6 md:p-8 mb-16 border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-purple-500/10 to-surface/40">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Free Interactive Utility</span>
            <h3 className="text-xl font-bold text-white mt-1">Try Our Free Pomodoro Focus Calculator</h3>
            <p className="text-xs text-text-secondary mt-1">Break big goals into gentle 25 or 50-minute sprints with guaranteed recovery breaks.</p>
          </div>
          <Link href="/tools/pomodoro-focus-calculator" className="btn-primary whitespace-nowrap text-xs !py-3 !px-6">
            Open Focus Calculator →
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
          <h2 className="text-3xl font-bold text-white mb-4">Build a daily routine that works with your brain.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Experience low-friction AI planning on Android with PlanBot.
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
