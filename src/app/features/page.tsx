import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import TierFlowchart from '@/components/TierFlowchart';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import PlayStoreLink from '@/components/PlayStoreLink';

/**
 * PlanBot Features Page
 * Highlights core features, Persona planning systems, interactive Tier Progression Flowchart,
 * and comprehensive 4-tier comparison table.
 *
 * Comment / Update (August 2026):
 * - Integrated TierFlowchart component to showcase feature unlock progression.
 * - Updated comparisonRows matrix to include Plan History (3 vs 15 vs 30 vs 100), Focus Scopes,
 *   Analytics Graphs (Locked -> 7-Day Trend -> Heatmap -> Peak Diurnal & Study Pattern AI),
 *   Active Goals, and CSV Data Export.
 */

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Features — AI Planning for Every Goal',
  description: 'Explore PlanBot features: AI plan generation, streak system, weekly AI reports, photo input, gamification. Powered by advanced AI.',
  path: '/features',
  image: '/og/features.jpg',
});

const allFeatures = [
  { 
    icon: '🤖', 
    title: 'AI-Powered Plan Generation', 
    /* E-E-A-T Quality Refinement: Use concrete technical capability description instead of generic marketing buzzwords */
    desc: 'PlanBot uses advanced multi-tier AI models to create daily plans tailored to your goals. Whether preparing for JEE, managing a startup, or training for a marathon, the AI analyzes your objectives and generates actionable schedules.', 
    detail: 'Each tier unlocks progressively more powerful AI — from Basic AI (Free) to our most advanced Premium AI (God).', 
    forWho: 'Students, professionals, athletes, entrepreneurs.', 
    link: '/blog/ai-scheduling-workflow-automation', 
    linkText: 'Read about AI Workflow Automation →' 
  },
  { 
    icon: '📈', 
    title: 'Adaptive Analytics & Study Pattern AI', 
    desc: 'Track your focus trends over time. From daily focus rings and 7-day trend graphs to 30-day heatmap calendars and diurnal time-of-day peak study analysis.', 
    detail: 'Elite and God tiers unlock Productivity Score v2, peer benchmarks against top achievers, and AI study pattern intelligence.', 
    forWho: 'Students and professionals who want measurable productivity gains.', 
    link: '/blog/deep-work-focus-systems-ai', 
    linkText: 'Master Deep Work Systems →' 
  },
  { 
    icon: '🔥', 
    title: 'Streak System & Gamification', 
    desc: 'Stay motivated with daily streaks, XP, levels, and achievements. The gamification layer turns productivity into a game you want to play. Freeze charges protect your streak if you miss a day.', 
    detail: 'Freeze charges regenerate or can be purchased as boost packs.', 
    forWho: 'Anyone who struggles with consistency.', 
    link: '/blog/build-unbreakable-habits-ai-gamification', 
    linkText: 'Learn about Habit Gamification →' 
  },
  { 
    icon: '📊', 
    title: 'Weekly AI Progress Reports', 
    desc: 'Every Monday, Elite and God tier users receive an AI-generated performance analysis — what you accomplished, where you fell behind, and what to adjust.', 
    detail: 'Reports include completion rates, streak health, time distribution, and personalized improvement suggestions.', 
    forWho: 'Serious goal-chasers wanting data-driven insights.', 
    link: '/blog/deep-work-focus-systems-ai', 
    linkText: 'Explore Weekly Reporting →' 
  },
  { 
    icon: '🎯', 
    title: 'Multi-Goal Tracking & Personas', 
    desc: 'Choose your goal personas and track multiple active goals simultaneously (1 Goal on Pro, 3 Goals on Elite, Unlimited on God).', 
    detail: 'Study blocks for students, deep work for professionals, training splits for athletes.', 
    forWho: 'Everyone — PlanBot adapts to YOUR life.', 
    link: '/blog/how-entrepreneurs-use-ai-plan-day', 
    linkText: 'Explore Persona Use Cases →' 
  },
  { 
    icon: '💬', 
    title: 'AI Chat Interface & Photo Input', 
    desc: 'Talk to PlanBot naturally. Describe your goals, adjust plans, get advice — all through conversation. God tier unlocks OCR photo note scanning.', 
    detail: 'Messages: 1/day (Free), 4/day (Pro), 15/day (Elite), unlimited (God).', 
    forWho: 'Anyone preferring conversational planning and digitizing handwritten notes.', 
    link: '/blog/what-is-ai-planner-app-complete-guide', 
    linkText: 'What is an AI Planner App? →' 
  },
];

const comparisonRows = [
  { feature: 'Plan History', free: '3 plans', pro: '15 plans', elite: '30 plans', god: '100 plans (All-Time)' },
  { feature: 'Focus Time Scope', free: "Today's focus", pro: 'Week focus', elite: 'Month focus', god: 'Diurnal Peak Time' },
  { feature: 'Active Goals', free: '—', pro: '1 Active Goal', elite: '3 Active Goals', god: 'Unlimited Goals' },
  { feature: 'Analytics Graphs', free: 'Locked 🔒', pro: '7-Day Trend', elite: 'Heatmap Calendar', god: 'Peer Benchmark + AI' },
  { feature: 'Productivity Score', free: 'Basic Ring (%)', pro: 'Trend Arrow ↑↓', elite: 'Score v2 Breakdown', god: 'Study Pattern AI' },
  { feature: 'AI Plan Generations', free: '2 / day', pro: '4 / day', elite: '5 / day', god: 'Up to 100' },
  { feature: 'Chat Messages', free: '1 / day', pro: '4 / day', elite: '15 / day', god: 'Unlimited' },
  { feature: 'AI Engine Tier', free: 'Basic AI', pro: 'Standard AI', elite: 'Advanced AI', god: 'Premium AI' },
  { feature: 'Weekly AI Report', free: '✗', pro: '✗', elite: '✓', god: '✓' },
  { feature: 'CSV Data Export', free: '✗', pro: '✗', elite: '✗', god: '✓' },
  { feature: 'Ads', free: 'Yes', pro: 'No Ads', elite: 'No Ads', god: 'No Ads' },
  { feature: 'Free Trial', free: '—', pro: '—', elite: '—', god: '3 Days FREE' },
];

export default function FeaturesPage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'PlanBot Features — AI Planning for Every Goal',
        'Explore PlanBot features: AI plan generation, streak system, weekly AI reports, photo input, gamification. Powered by advanced AI.',
        'https://planbotai.app/features'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'Features', item: 'https://planbotai.app/features' }
      ])} />

      <section className="pt-28 pb-12 md:pt-36 md:pb-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          PlanBot Features — <span className="text-gradient">AI Planning for Every Goal</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          PlanBot by PlannextTech combines powerful AI with habit gamification and deep study analytics to help you crush your daily ambitions.
        </p>
      </section>

      {/* ── Tier Progression & Feature Unlock Roadmap ── */}
      <TierFlowchart />

      {/* ── Detailed Feature Deep Dives ── */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {allFeatures.map((f, i) => (
            <div key={f.title}>
              <article className="glass-card p-8 md:p-10">
                <span className="text-5xl mb-4 block">{f.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{f.title}</h2>
                <p className="text-text-secondary leading-relaxed mb-3">{f.desc}</p>
                <p className="text-text-secondary leading-relaxed mb-3">{f.detail}</p>
                <p className="text-sm text-accent font-medium mb-3">Who it&apos;s for: {f.forWho}</p>
                {f.link && (
                  <a href={f.link} className="inline-block mt-2 text-sm font-semibold text-white/80 hover:text-white hover:underline transition-colors">
                    {f.linkText}
                  </a>
                )}
              </article>
              {(i + 1) % 2 === 0 && (
                <div className="text-center mt-8">
                  <PlayStoreLink location="features_page" className="btn-primary">
Download PlanBot Free on Google Play →
</PlayStoreLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Comprehensive Tier Comparison Matrix ── */}
      <section className="py-20 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-center mb-4">Complete Feature &amp; <span className="text-gradient">Tier Comparison</span></h2>
          <p className="section-subheading text-center mb-12">Compare capabilities across all 4 PlanBot tiers</p>
          
          <div className="overflow-x-auto rounded-2xl border border-glass-border bg-surface/50 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-glass-border bg-surface/80">
                  <th className="py-4 px-4 text-sm font-semibold text-text-secondary">Feature</th>
                  <th className="py-4 px-4 text-sm font-semibold text-white">Free (₹0)</th>
                  <th className="py-4 px-4 text-sm font-semibold text-white">Pro (₹99)</th>
                  <th className="py-4 px-4 text-sm font-semibold text-white">Elite (₹129)</th>
                  <th className="py-4 px-4 text-sm font-bold text-accent">God (₹249)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, rIdx) => (
                  <tr key={r.feature} className={`border-b border-glass-border/40 transition-colors hover:bg-white/[0.02] ${rIdx % 2 === 0 ? 'bg-transparent' : 'bg-surface/20'}`}>
                    <td className="py-3.5 px-4 text-sm font-medium text-white">{r.feature}</td>
                    <td className="py-3.5 px-4 text-sm text-text-secondary">{r.free}</td>
                    <td className="py-3.5 px-4 text-sm text-text-secondary">{r.pro}</td>
                    <td className="py-3.5 px-4 text-sm text-white font-medium">{r.elite}</td>
                    <td className="py-3.5 px-4 text-sm text-accent font-semibold">{r.god}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Plan Smarter? <span className="text-gradient">Download PlanBot.</span></h2>
        <p className="text-text-secondary text-base md:text-lg mb-8 max-w-xl mx-auto">
          Start for free with 3 plans history and daily focus tracking. Unlock advanced analytics whenever you&apos;re ready.
        </p>
        <PlayStoreLink location="features_page" className="btn-primary text-lg">
Get PlanBot Free on Android →
</PlayStoreLink>
      </section>
    </>
  );
}
