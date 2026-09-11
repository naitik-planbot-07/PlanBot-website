import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Comparisons: Best AI Daily Planner Alternatives (2026)',
  description: 'Compare PlanBot with Motion, Notion, Todoist, Google Calendar, and TickTick. Discover why PlanBot is the top AI daily planning app for Android.',
  path: '/compare',
});

const comparisons = [
  {
    competitor: 'Motion',
    slug: 'planbot-vs-motion',
    tagline: 'Affordable mobile AI planning vs $19–$34/mo desktop complexity',
    planbotAdvantage: 'Lightweight Android app, ₹99/mo pricing, offline-friendly, student focus',
    competitorFocus: 'Desktop web app, enterprise teams, expensive ($19–$34/month)',
    badge: 'Top Alternative',
  },
  {
    competitor: 'Notion',
    slug: 'planbot-vs-notion',
    tagline: 'Instant automated time-blocking vs hours of manual template building',
    planbotAdvantage: 'AI auto-generates your day in 3 seconds, dynamic rescheduling',
    competitorFocus: 'Blank-canvas workspace, manual drag-and-drop, zero auto-scheduling',
    badge: 'No Setup Needed',
  },
  {
    competitor: 'Todoist',
    slug: 'planbot-vs-todoist',
    tagline: 'Time-aware scheduling vs overwhelming static task checklists',
    planbotAdvantage: 'Assigns tasks to actual energy windows, prevents daily overload',
    competitorFocus: 'Static lists with no time-blocking, task rollover anxiety',
    badge: 'Time-Aware',
  },
  {
    competitor: 'Google Calendar',
    slug: 'planbot-vs-google-calendar',
    tagline: 'Adaptive AI timetable vs rigid manual time-blocking',
    planbotAdvantage: 'Automatically shifts tasks when you run late or wake up off-schedule',
    competitorFocus: 'Rigid static blocks that break upon the first delay',
    badge: 'Dynamic Reschedule',
  },
  {
    competitor: 'TickTick',
    slug: 'planbot-vs-ticktick',
    tagline: 'AI routine generator & focus scores vs basic habit checkboxes',
    planbotAdvantage: 'Circadian energy matching, Productivity Score v2, diurnal peak stats',
    competitorFocus: 'Standard habit check-offs, basic timer without AI scheduling',
    badge: 'AI Analytics',
  },
];

export default function CompareHubPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot Comparisons: Best AI Daily Planner Alternatives (2026)',
          'Compare PlanBot with Motion, Notion, Todoist, Google Calendar, and TickTick.',
          `${SITE_URL}/compare`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Compare', item: '/compare' },
        ])}
      />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            ⚖️ App Comparisons &amp; Alternatives
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            How <span className="text-gradient">PlanBot</span> Compares
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            See how PlanBot&apos;s mobile AI planning engine stacks up against traditional to-do apps, manual calendars, and expensive enterprise schedulers.
          </p>
        </div>

        {/* Comparisons List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {comparisons.map((c) => (
            <div
              key={c.slug}
              className="glass-card p-6 md:p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/20 text-accent border border-primary/40">
                    {c.badge}
                  </span>
                  <span className="text-xs text-text-dim">Head-to-Head</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  PlanBot vs {c.competitor}
                </h2>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  {c.tagline}
                </p>

                <div className="space-y-3 mb-8 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                    <strong className="block text-emerald-400 mb-0.5">PlanBot:</strong>
                    {c.planbotAdvantage}
                  </div>
                  <div className="p-3 rounded-lg bg-surface/50 border border-glass-border text-text-dim">
                    <strong className="block text-text-secondary mb-0.5">{c.competitor}:</strong>
                    {c.competitorFocus}
                  </div>
                </div>
              </div>

              <Link
                href={`/compare/${c.slug}`}
                className="btn-primary w-full text-center text-xs !py-3 flex items-center justify-center gap-2"
              >
                Read Full Comparison
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Matrix Summary */}
        <section className="glass-card p-8 md:p-12 mb-20 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Feature Comparison at a Glance
          </h2>
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-glass-border text-text-dim">
                <th className="py-3 px-4 font-semibold">Feature</th>
                <th className="py-3 px-4 font-semibold text-accent">PlanBot AI</th>
                <th className="py-3 px-4 font-semibold">Motion</th>
                <th className="py-3 px-4 font-semibold">Notion</th>
                <th className="py-3 px-4 font-semibold">Todoist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-text-secondary">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Automated Daily Scheduling</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✅ Included (AI)</td>
                <td className="py-3 px-4">✅ Included</td>
                <td className="py-3 px-4 text-rose-400">❌ Manual Only</td>
                <td className="py-3 px-4 text-rose-400">❌ Manual Only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Dynamic Rescheduling</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✅ 1-Tap Auto Shift</td>
                <td className="py-3 px-4">✅ Yes</td>
                <td className="py-3 px-4 text-rose-400">❌ No</td>
                <td className="py-3 px-4 text-rose-400">❌ No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Monthly Price</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">₹0 – ₹99/mo</td>
                <td className="py-3 px-4">$19 – $34/mo</td>
                <td className="py-3 px-4">$0 – $10/mo</td>
                <td className="py-3 px-4">$4 – $8/mo</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Mobile Android Focus</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✅ Native App</td>
                <td className="py-3 px-4 text-text-dim">Desktop Heavy</td>
                <td className="py-3 px-4">Web Wrapper</td>
                <td className="py-3 px-4">Mobile App</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Gamified Streaks &amp; XP</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✅ Yes</td>
                <td className="py-3 px-4 text-rose-400">❌ No</td>
                <td className="py-3 px-4 text-rose-400">❌ No</td>
                <td className="py-3 px-4">Karma Points</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* SEO Educational Link Equity Module */}
        <section className="mb-20">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Learn More About AI Planning &amp; Automation Systems
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/blog/what-is-ai-planner-app-complete-guide" className="glass-card p-5 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-2">What is an AI Planner App? →</h4>
              <p className="text-xs text-text-secondary">Comprehensive breakdown of how AI planners replace traditional checklists.</p>
            </Link>
            <Link href="/blog/ai-scheduling-workflow-automation" className="glass-card p-5 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-2">AI Scheduling &amp; Workflow Automation →</h4>
              <p className="text-xs text-text-secondary">Understand how dynamic algorithms prevent schedule collapse in real time.</p>
            </Link>
            <Link href="/tools/daily-schedule-generator" className="glass-card p-5 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-2">Free Daily Schedule Generator →</h4>
              <p className="text-xs text-text-secondary">Test our interactive circadian timetable builder directly in your browser.</p>
            </Link>
          </div>
        </section>

        {/* Play Store CTA */}
        <section className="text-center glass-card p-10 md:p-14 border-primary/40 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Try the Smartest Daily Planner for Android
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Experience effortless AI time-blocking with zero setup hassle. Download PlanBot for free on Google Play.
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
