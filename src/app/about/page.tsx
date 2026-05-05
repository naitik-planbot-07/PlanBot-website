import type { Metadata } from 'next';
import { createMetadata, organizationSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = createMetadata({
  title: 'About PlanBot — Built by PlannextTech in India',
  description: 'PlanBot is an AI-powered daily planner app built by PlannextTech in India. Learn about our mission to make AI-powered planning accessible to everyone.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={organizationSchema} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Built with ❤️ in India by <span className="text-gradient">PlannextTech</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          PlanBot is the AI daily planner for ambitious people who refuse to settle. We believe everyone deserves a personal AI planning assistant — not just those who can afford premium tools.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              Make AI-powered daily planning accessible and affordable for every student, professional, and athlete in India and beyond. PlanBot isn&apos;t just another to-do app — it&apos;s an AI that understands YOUR goals, YOUR schedule, and YOUR ambition.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why PlanBot?</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Most planning apps make you do all the work — filling in tasks, setting times, organizing categories. PlanBot flips the script. Tell the AI your goal, and it creates the plan. You just follow it.
            </p>
            <p className="text-text-secondary leading-relaxed">
              With streak systems, gamification, and weekly AI performance reports, PlanBot keeps you accountable. It&apos;s not just about planning — it&apos;s about execution.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">The Tech Behind PlanBot</h2>
            <ul className="space-y-3 text-text-secondary">
              <li>🤖 <strong className="text-white">Basic AI</strong> — Free tier AI for everyday planning</li>
              <li>✨ <strong className="text-white">Standard & Advanced AI</strong> — Powerful AI for Pro & Elite tiers</li>
              <li>⚡ <strong className="text-white">Premium AI</strong> — Our most powerful AI engine for God tier</li>
              <li>📱 <strong className="text-white">Flutter</strong> — Cross-platform framework for smooth Android experience</li>
              <li>🔥 <strong className="text-white">Firebase</strong> — Real-time backend, auth, and analytics</li>
            </ul>
          </div>

          <div className="text-center">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">Try PlanBot Free →</a>
          </div>
        </div>
      </section>
    </>
  );
}
