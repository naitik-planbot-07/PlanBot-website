import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, createWebPageSchema, createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'PlanBot Use Cases: Built for High-Performance Routines (2026)',
  description: 'Explore tailored AI planning workflows for competitive exam aspirants, busy working professionals, college students, and ADHD focus.',
  path: '/use-cases',
});

const useCases = [
  {
    title: 'AI Planner for Students & Exam Aspirants',
    slug: 'ai-planner-for-students-exams',
    badge: 'JEE • NEET • UPSC',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Structure 8–14 hours of daily study, balance syllabus coverage, and automate spaced revision cycles with zero planning fatigue.',
    benefits: ['Daily subject split algorithms', 'PYQ & Mock test pacing', 'Burnout prevention buffer slots'],
  },
  {
    title: 'AI Planner for Working Professionals',
    slug: 'ai-planner-for-working-professionals',
    badge: 'Deep Work • Sprint Focus',
    badgeColor: 'bg-primary/20 text-accent border-primary/40',
    description: 'Time-box high-leverage deliverables, protect deep work focus windows, and maintain work-life balance effortlessly.',
    benefits: ['Circadian energy alignment', 'Meeting buffer protection', 'Daily shutdown & evening wind-down'],
  },
  {
    title: 'AI Planner for ADHD & Focus Overwhelm',
    slug: 'ai-planner-for-adhd-focus',
    badge: 'Anti-Overwhelm • Low Friction',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Eliminate task paralysis and decision fatigue with AI-assisted micro-steps, 1-tap dynamic rescheduling, and rewarding dopamine streaks.',
    benefits: ['Zero-guilt auto rescheduling', 'Visual focus timer rings', 'Gamified level & XP rewards'],
  },
];

export default function UseCasesHubPage() {
  return (
    <>
      <StructuredData
        data={createWebPageSchema(
          'PlanBot Use Cases: Built for High-Performance Routines (2026)',
          'Explore tailored AI planning workflows for students, professionals, and ADHD focus.',
          `${SITE_URL}/use-cases`
        )}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Use Cases', item: '/use-cases' },
        ])}
      />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-4">
            🎯 Tailored Workflows
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Engineered for <span className="text-gradient">Your Workflow</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Whether you are cracking national competitive exams, executing high-stakes engineering sprints, or conquering ADHD task paralysis, PlanBot adapts to your rhythm.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {useCases.map((uc) => (
            <div
              key={uc.slug}
              className="glass-card p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${uc.badgeColor}`}>
                    {uc.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {uc.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {uc.description}
                </p>

                <div className="space-y-2 mb-8">
                  {uc.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-text-dim">
                      <span className="text-accent">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/use-cases/${uc.slug}`}
                className="btn-primary w-full text-center text-sm !py-3 flex items-center justify-center gap-2"
              >
                Explore Workflow
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center glass-card p-10 md:p-14 border-primary/40 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Build Your Ideal Routine with PlanBot AI
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Experience the clarity of an intelligent daily planner designed around human biology. Available now on Android.
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
