import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'AI Daily Study Planner for JEE, NEET & UPSC Students (2026)',
  description: 'How PlanBot AI helps competitive exam aspirants structure 10+ daily study hours, automate subject revision cycles, and maximize exam rank without burnout.',
  path: '/use-cases/ai-planner-for-students-exams',
});

const faqs = [
  {
    question: 'How does PlanBot help with JEE, NEET, and UPSC prep?',
    answer: 'PlanBot automatically balances your daily hours across multiple subjects (e.g., Physics, Chemistry, Math/Bio or GS Papers), incorporates spaced revision blocks for error logs and PYQs, and alerts you when study sessions run late.',
  },
  {
    question: 'Can PlanBot handle 12–14 hour daily study schedules?',
    answer: 'Yes. PlanBot incorporates mandatory cognitive rest and hydration buffers between 90–120 minute deep work sprints to maintain high retention throughout marathon study days.',
  },
];

export default function StudentExamUseCasePage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'AI Daily Study Planner for JEE, NEET & UPSC Students (2026)',
          'How PlanBot AI helps competitive exam aspirants structure study hours and maximize exam rank.',
          `${SITE_URL}/use-cases/ai-planner-for-students-exams`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Use Cases', item: '/use-cases' },
          { name: 'Students & Exams', item: '/use-cases/ai-planner-for-students-exams' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link>
          <span>/</span>
          <span className="text-emerald-400 font-medium">Students &amp; Exams</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-4">
            🎓 Tailored for High-Rank Aspirants
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            The AI Study Planner Built for <span className="text-gradient">Toppers</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours redrawing paper timetables. PlanBot AI generates your daily exam timetable, protects your focus stamina, and turns consistency into a game.
          </p>
        </header>

        {/* 3 Pillars for Students */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 border-t-4 border-t-emerald-400">
            <div className="text-2xl mb-3">⚖️</div>
            <h2 className="text-lg font-bold text-white mb-2">Subject Auto-Balancing</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Prevents the common trap of over-studying your favorite subject while neglecting high-scoring secondary subjects.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-primary">
            <div className="text-2xl mb-3">🔄</div>
            <h2 className="text-lg font-bold text-white mb-2">Spaced PYQ &amp; Error Review</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Automatically schedules review slots for previous years&apos; questions (PYQs) and mock test error logs before forgetting sets in.
            </p>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-accent">
            <div className="text-2xl mb-3">🔥</div>
            <h2 className="text-lg font-bold text-white mb-2">Streaks &amp; Productivity XP</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Build unbreakable daily study momentum with visual focus rings, level ups, and peer percentile benchmarks.
            </p>
          </div>
        </section>

        {/* Free Tool Cross-Promotion Card */}
        <section className="glass-card p-6 md:p-8 mb-16 border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-500/10 to-surface/40">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Free Interactive Utility</span>
            <h3 className="text-xl font-bold text-white mt-1">Try Our Free Exam Revision Calculator</h3>
            <p className="text-xs text-text-secondary mt-1">Calculate your daily subject distribution and mock test cadence in 30 seconds.</p>
          </div>
          <Link href="/tools/exam-revision-calculator" className="btn-primary whitespace-nowrap text-xs !py-3 !px-6">
            Launch Calculator →
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
          <h2 className="text-3xl font-bold text-white mb-4">Start your top rank prep today.</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Join thousands of JEE, NEET, and UPSC aspirants who trust PlanBot on Android for their daily study schedules.
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
