import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot vs Motion: Best AI Planner Comparison (2026)',
  description: 'Comparing PlanBot and Motion. Discover why PlanBot is the lightweight, affordable AI daily planner alternative for Android users and students.',
  path: '/compare/planbot-vs-motion',
});

const faqs = [
  {
    question: 'How is PlanBot different from Motion?',
    answer: 'Motion is an enterprise-focused desktop web app priced at $19–$34/month designed for corporate calendars. PlanBot is a lightweight, mobile-first Android app starting at ₹99/mo designed specifically for students, exam aspirants, and ambitious individuals.',
  },
  {
    question: 'Does PlanBot have automatic dynamic rescheduling like Motion?',
    answer: 'Yes! When your tasks run late or unexpected events occur, PlanBot AI instantly recalculates and reorganizes your remaining schedule with one tap.',
  },
  {
    question: 'Why is PlanBot so much more affordable than Motion?',
    answer: 'PlanBot is built with lean, high-efficiency AI algorithms optimized for individuals rather than bloated enterprise sales overhead, making world-class AI scheduling accessible for as low as ₹99/month (or free on the starter tier).',
  },
];

export default function PlanbotVsMotionPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot vs Motion: Best AI Planner Comparison (2026)',
          'Comparing PlanBot and Motion AI daily planners.',
          `${SITE_URL}/compare/planbot-vs-motion`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'PlanBot vs Motion', item: '/compare/planbot-vs-motion' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-accent font-medium">PlanBot vs Motion</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ 2026 App Comparison
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-gradient">PlanBot</span> vs <span className="text-gray-300">Motion</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Motion charges up to $34/month for corporate team scheduling. PlanBot delivers snappy, mobile-first AI time-blocking directly on your Android phone starting at ₹99/mo.
          </p>
        </header>

        {/* Feature Comparison Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 border-t-4 border-t-primary">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">PlanBot</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-accent border border-primary/30">
                ₹0 – ₹99/mo
              </span>
            </div>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Mobile-First Native App:</strong> Built specifically for Android smartphones with instant offline support.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Student &amp; Individual Focus:</strong> Optimized for exam preparation, deep work habits, and personal goals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Gamification &amp; Focus XP:</strong> Daily streak rings, Productivity Score v2, and diurnal energy benchmarks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Ultra-Affordable:</strong> Free tier available; Pro tier at just ₹99/month.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-t-4 border-t-gray-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Motion</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-dim border border-glass-border">
                $19 – $34/mo
              </span>
            </div>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Enterprise Pricing:</strong> Prohibitive $19–$34/mo pricing out of reach for students and solo creators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Desktop Heavy:</strong> Built primarily for enterprise desktop web browsers; mobile app is secondary.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No Study / Exam Algorithms:</strong> Lacks spaced repetition or exam revision frameworks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No Free Plan:</strong> Requires credit card upfront with paid trial.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Detailed Breakdown Section */}
        <section className="glass-card p-8 md:p-12 mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-white">Why Users Are Choosing PlanBot Over Motion</h2>
          <p className="text-text-secondary leading-relaxed text-sm">
            Motion made headlines by introducing algorithmic calendar scheduling, but its steep price tag ($228 to $408 billed annually) makes it inaccessible to high-performing students, freelancers, and competitive exam aspirants.
          </p>
          <p className="text-text-secondary leading-relaxed text-sm">
            PlanBot bridges this gap by delivering a lightning-fast, AI-driven daily planning experience right in your pocket. Whether you have 3 study goals or 10 professional deliverables, PlanBot computes your daily roadmap without cognitive clutter.
          </p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to automate your day?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Stop paying expensive enterprise subscriptions. Get smart AI daily scheduling on Android for free.
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
