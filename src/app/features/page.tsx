import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { createMetadata } from '@/lib/seo';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Features — AI Planning for Every Goal',
  description: 'Explore PlanBot features: AI plan generation, streak system, weekly AI reports, photo input, gamification. Powered by advanced AI.',
  path: '/features',
});

const allFeatures = [
  { icon: '🤖', title: 'AI-Powered Plan Generation', desc: 'PlanBot uses cutting-edge AI models to create daily plans tailored to your goals. Whether preparing for JEE, managing a startup, or training for a marathon, the AI analyzes your objectives and generates actionable schedules.', detail: 'Each tier unlocks progressively more powerful AI — from Basic AI (Free) to our most advanced Premium AI (God).', forWho: 'Students, professionals, athletes, entrepreneurs.' },
  { icon: '🔥', title: 'Streak System & Gamification', desc: 'Stay motivated with daily streaks, XP, levels, and achievements. The gamification layer turns productivity into a game you want to play. Freeze charges protect your streak if you miss a day.', detail: 'Freeze charges regenerate or can be purchased as boost packs.', forWho: 'Anyone who struggles with consistency.' },
  { icon: '📊', title: 'Weekly AI Progress Reports', desc: 'Every Monday, Elite and God tier users receive an AI-generated performance analysis — what you accomplished, where you fell behind, and what to adjust.', detail: 'Reports include completion rates, streak health, time distribution, and personalized improvement suggestions.', forWho: 'Serious goal-chasers wanting data-driven insights.' },
  { icon: '📸', title: 'Upload Photo Input', desc: 'Upload a photo of handwritten notes or a whiteboard and PlanBot extracts the text into actionable tasks automatically. Available on God tier.', detail: 'Perfect for students digitizing class notes into study plans.', forWho: 'Students and professionals.' },
  { icon: '🎯', title: 'Goal Personas', desc: 'Choose a persona — Student, Professional, Athlete, Entrepreneur, or Fitness Enthusiast — and the AI adapts its planning logic to your lifestyle.', detail: 'Study blocks for students, deep work for professionals, training splits for athletes.', forWho: 'Everyone — PlanBot adapts to YOUR life.' },
  { icon: '💬', title: 'AI Chat Interface', desc: 'Talk to PlanBot naturally. Describe your goals, adjust plans, get advice — all through conversation. No forms or templates.', detail: 'Messages: 1/day (Free), 4/day (Pro), 15/day (Elite), unlimited (God).', forWho: 'Anyone preferring conversational interfaces.' },
];

const comparisonRows = [
  { feature: 'AI Plans/Day', free: '2', pro: '4', elite: '5', god: 'Unlimited' },
  { feature: 'Messages/Day', free: '1', pro: '4', elite: '15', god: 'Unlimited' },
  { feature: 'AI Model', free: 'Basic AI', pro: 'Standard AI', elite: 'Advanced AI', god: 'Premium AI' },
  { feature: 'Ads', free: 'Yes', pro: 'No', elite: 'No', god: 'No' },
  { feature: 'Weekly AI Report', free: '✗', pro: '✗', elite: '✓', god: '✓' },
  { feature: 'OCR Input', free: '✗', pro: '✗', elite: '✗', god: '✓' },
  { feature: 'Free Trial', free: '—', pro: '—', elite: '—', god: '3 days' },
];

export default function FeaturesPage() {
  return (
    <>
      <StructuredData data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'PlanBot', applicationCategory: 'ProductivityApplication', operatingSystem: 'Android' }} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          PlanBot Features — <span className="text-gradient">AI Planning for Every Goal</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          PlanBot by PlannextTech combines powerful AI with gamification to help you achieve any goal.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {allFeatures.map((f, i) => (
            <div key={f.title}>
              <article className="glass-card p-8 md:p-10">
                <span className="text-5xl mb-4 block">{f.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{f.title}</h2>
                <p className="text-text-secondary leading-relaxed mb-3">{f.desc}</p>
                <p className="text-text-secondary leading-relaxed mb-3">{f.detail}</p>
                <p className="text-sm text-accent font-medium">Who it&apos;s for: {f.forWho}</p>
              </article>
              {(i + 1) % 2 === 0 && (
                <div className="text-center mt-8">
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Download PlanBot Free →</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-center mb-12">Feature <span className="text-gradient">Comparison</span></h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-glass-border">
                <th className="py-4 px-4 text-sm font-semibold text-text-secondary">Feature</th>
                <th className="py-4 px-4 text-sm font-semibold text-white">Free</th>
                <th className="py-4 px-4 text-sm font-semibold text-white">Pro</th>
                <th className="py-4 px-4 text-sm font-semibold text-white">Elite</th>
                <th className="py-4 px-4 text-sm font-semibold text-accent">God</th>
              </tr></thead>
              <tbody>
                {comparisonRows.map((r) => (
                  <tr key={r.feature} className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-sm font-medium text-white">{r.feature}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{r.free}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{r.pro}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{r.elite}</td>
                    <td className="py-3 px-4 text-sm text-accent font-medium">{r.god}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Smarter? <span className="text-gradient">Download PlanBot.</span></h2>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">Get PlanBot Free on Android →</a>
      </section>
    </>
  );
}
