import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, createFAQSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Free AI Daily Planner & Productivity Tools | PlanBot',
  description: 'Free online productivity tools by PlanBot: AI Daily Schedule Generator, Exam Revision Calculator, and Pomodoro Deep Work Planner. 100% free with no login required.',
  path: '/tools',
});

const tools = [
  {
    title: 'AI Daily Schedule & Time-Blocking Generator',
    slug: 'daily-schedule-generator',
    badge: 'Most Popular',
    badgeColor: 'bg-primary/20 text-accent border-primary/40',
    description: 'Generate an optimized, color-coded daily timetable based on your wake time, energy peaks, and daily study/work goals. Features 1-click text export.',
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['Custom energy peaks', 'Spaced study & focus blocks', '1-click copy & print', 'Zero login required'],
  },
  {
    title: 'Exam Revision & Study Schedule Calculator',
    slug: 'exam-revision-calculator',
    badge: 'For Students',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Calculate daily subject distribution, spaced repetition cycles, and mock test pacing for JEE, NEET, UPSC, CAT, GATE, and Board Exams.',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    features: ['JEE, NEET, UPSC presets', 'Subject weight allocation', 'Spaced review roadmap', 'Burnout prevention buffer'],
  },
  {
    title: 'Pomodoro & Deep Work Focus Calculator',
    slug: 'pomodoro-focus-calculator',
    badge: 'Focus System',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Calculate optimal focus sprints, rest intervals, and cognitive energy curves using Pomodoro, 50/10, or 90/20 Ultradian rhythms.',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ['Pomodoro / Ultradian / 50-10', 'Cognitive fatigue curves', 'Finish time projector', 'Interactive session plan'],
  },
  {
    title: 'Weather Forecast & Daily Routine Planner',
    slug: 'weather-forecast',
    badge: 'New Tool',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Track past 2 days, today, and 7-day weather forecasts with GPS or manual city search. Plan commute and focus blocks with AI weather advisories.',
    icon: (
      <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    features: ['Past 2 days + 7-day outlook', 'GPS auto-detection & city search', 'AI commute & routine advisory', '100% free with no login'],
  },
];

const faqs = [
  {
    question: 'Are these productivity and schedule tools free to use?',
    answer: 'Yes, all PlanBot online tools are 100% free with no sign-up or credit card required. You can generate custom schedules, calculate exam revision allocations, and copy results directly.',
  },
  {
    question: 'How do these online tools compare to the PlanBot Android app?',
    answer: 'These web tools generate static schedules and calculations. The PlanBot Android app is an active AI assistant that dynamically adapts your schedule when tasks run late, tracks your streaks/XP, logs analytics, and sends focus notifications.',
  },
  {
    question: 'Can I export my generated schedule to my phone or calendar?',
    answer: 'Yes! You can copy the generated timetable with one click to your clipboard, print or save as a PDF, or download the PlanBot Android app for automated daily tracking.',
  },
];

export default function ToolsHubPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'Free AI Daily Planner & Productivity Tools | PlanBot',
          'Free online productivity tools by PlanBot: AI Daily Schedule Generator, Exam Revision Calculator, and Pomodoro Deep Work Planner.',
          `${SITE_URL}/tools`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Tools', item: '/tools' },
        ])}
      />
      <StructuredData data={createFAQSchema(faqs)} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚡ 100% Free Tools • No Sign Up Required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Free AI Productivity &amp; <span className="text-gradient">Planning Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Science-backed calculators and timetable generators designed to optimize your daily routines, exam preparation, and deep work focus.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="glass-card p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-surface/50 border border-glass-border group-hover:border-primary/40 transition-colors">
                    {tool.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="space-y-2 mb-8">
                  {tool.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-text-dim">
                      <span className="text-accent">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/tools/${tool.slug}`}
                className="btn-primary w-full text-center text-sm !py-3 flex items-center justify-center gap-2"
              >
                Launch Free Tool
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Why Use PlanBot Web Tools Section */}
        <section className="mb-20 glass-card p-8 md:p-12 border-primary/20">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why We Built These Free Tools
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Most online planners force you behind a paywall or complex signup form before you can even structure your day. We believe everyone deserves instant access to high-performance time management frameworks — whether you are preparing for JEE/NEET, tackling university exams, or structuring 8 hours of deep work.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-glass-border">
              <div>
                <div className="text-2xl font-bold text-gradient mb-1">0 Signups</div>
                <p className="text-xs text-text-dim">Generate and copy your timetable instantly without an account.</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">Algorithmic</div>
                <p className="text-xs text-text-dim">Based on proven circadian energy rhythms &amp; spaced repetition.</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">1-Click Export</div>
                <p className="text-xs text-text-dim">Copy clean markdown or plain text straight to your notes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* App CTA */}
        <section className="text-center glass-card p-10 md:p-14 border-primary/40 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want AI to Dynamically Adjust Your Day in Real Time?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Static timetables break when you wake up late or a task takes longer than planned. PlanBot for Android uses adaptive AI to recalculate your remaining day in 3 seconds.
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
