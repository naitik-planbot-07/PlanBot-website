import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot vs Google Calendar: Best AI Daily Planner (2026)',
  description: 'Comparing PlanBot and Google Calendar. Discover why static calendar time-blocking fails and how AI dynamic rescheduling keeps your day on track.',
  path: '/compare/planbot-vs-google-calendar',
});

const faqs = [
  {
    question: 'Why does time-blocking in Google Calendar often fail?',
    answer: 'Google Calendar events are rigid and static. If your first morning task takes 45 minutes longer than estimated, every subsequent calendar block is ruined unless you manually drag and resize every single item for the rest of the day.',
  },
  {
    question: 'How does PlanBot fix this?',
    answer: 'PlanBot treats your day as a fluid stream. When a delay happens, tap one button and PlanBot AI recalculates your remaining hours, protects your meal/rest buffers, and prioritizes your non-negotiables automatically.',
  },
];

export default function PlanbotVsGoogleCalendarPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot vs Google Calendar: Best AI Daily Planner (2026)',
          'Comparing PlanBot and Google Calendar.',
          `${SITE_URL}/compare/planbot-vs-google-calendar`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
          { name: 'PlanBot vs Google Calendar', item: '/compare/planbot-vs-google-calendar' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-accent font-medium">PlanBot vs Google Calendar</span>
        </nav>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ App Comparison
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-gradient">PlanBot</span> vs <span className="text-[#4285F4]">Google Calendar</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Google Calendar was built for meetings, not dynamic daily execution. See why thousands are switching to PlanBot for personal daily time-blocking.
          </p>
        </header>

        {/* Feature Comparison Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 border-t-4 border-t-primary">
            <h2 className="text-2xl font-bold text-white mb-4">PlanBot AI</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Dynamic Auto-Shift:</strong> 1-tap recalculation when tasks run over or you wake up late.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Built-in Focus Tracking:</strong> Track actual focus minutes, study streaks, and XP points.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>AI Daily Blueprint Generation:</strong> Type your goals or snap a photo of your notes to generate a full timetable.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-t-4 border-t-[#4285F4]">
            <h2 className="text-2xl font-bold text-white mb-4">Google Calendar</h2>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Rigid Time Blocks:</strong> Delays break the entire day unless manually dragged and resized.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No AI Daily Optimization:</strong> You must create every single time block manually by typing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>No Habit Gamification:</strong> Zero feedback loops or productivity performance scores.</span>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready for effortless daily time-blocking?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Stop dragging calendar boxes around. Let AI manage your daily roadmap.
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
