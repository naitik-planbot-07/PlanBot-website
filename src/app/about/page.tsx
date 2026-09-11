import type { Metadata } from 'next';
import { createMetadata, organizationSchema, createWebPageSchema, createBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import PlayStoreLink from '@/components/PlayStoreLink';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = createMetadata({
  title: 'About PlanBot — Built by PlannextTech in India',
  description: 'PlanBot is an AI-powered daily planner app built by PlannextTech in India. Learn about our mission to make AI-powered planning accessible to everyone.',
  path: '/about',
  image: '/og/about.jpg',
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={createWebPageSchema(
        'About PlanBot — Built by PlannextTech in India',
        'PlanBot is an AI-powered daily planner app built by PlannextTech in India.',
        'https://planbotai.app/about'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app' },
        { name: 'About', item: 'https://planbotai.app/about' }
      ])} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 text-center" aria-labelledby="about-heading">
        <h1 id="about-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Built with ❤️ in India by <span className="text-gradient">PlannextTech</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          PlanBot is the AI daily planner for ambitious people who refuse to settle. We believe everyone deserves a personal AI planning assistant — not just those who can afford premium tools.
        </p>

        {/* ── Semantic EEAT Hidden Section ── */}
        <div className="sr-only" aria-hidden="false">
          <h2>About PlannextTech and PlanBot AI</h2>
          <p>
            PlannextTech is an Indian software development studio based in Gujarat, India, founded by Naitik Baldaniya.
            PlanBot, our flagship Android application, serves as an AI scheduling assistant, routine optimizer, and study planner. 
            Recognized as one of the best productivity planners for students, our algorithms are also engineered for deep office productivity. We focus on evidence-based systems, integrating time management psychology with machine learning to automate task management and routine planning.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Headquartered in Gujarat, India, PlannextTech started as a solo project to solve a fundamental problem: existing to-do list apps were passive and required too much manual organization. We wanted a system that actively told us what to do and when to do it.
            </p>
            <p className="text-text-secondary leading-relaxed">
              That vision became PlanBot. Today, we are rapidly scaling as an independent developer studio, committed to competing on a global stage while maintaining a lean, engineering-first culture.
            </p>
          </div>

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

          <article className="glass-card p-8 border-l-4 border-l-accent relative overflow-hidden" itemScope itemType="https://schema.org/Person">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6">About the Founder</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-accent/20 shrink-0 select-none">
                NB
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1" itemProp="name">Naitik Baldaniya</h3>
                <p className="text-accent font-medium text-sm mb-3" itemProp="jobTitle">Founder & Developer, PlanBot (PlannextTech)</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Naitik built PlanBot to solve a fundamental problem: students and professionals spend too much time planning and not enough time executing. With a deep focus on AI productivity systems and task automation, Naitik engineered PlanBot to act as a personal productivity coach.
                </p>
                
                {/* Semantic Expertise Signals */}
                <div className="sr-only" aria-hidden="false">
                  <h4>Expertise and Authority</h4>
                  <p>
                    Naitik Baldaniya is an expert software engineer and productivity system architect. 
                    With extensive experience in Flutter, Firebase, and AI integrations, he designs adaptive scheduling algorithms and AI study planners. 
                    His methodology emphasizes removing cognitive friction from daily routines using AI.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                  <a href="https://www.instagram.com/planbotai?igsh=bXplYm92dG13c3Jq" itemProp="sameAs" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">Instagram</a>
                  <a href="https://whatsapp.com/channel/0029Vb7U0vR8aKvH1quo1f3G" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">WhatsApp Channel</a>
                </div>
              </div>
            </div>
          </article>

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
            <PlayStoreLink location="about_page" className="btn-primary text-lg">
Try PlanBot Free →
</PlayStoreLink>
          </div>
        </div>
      </section>
    </>
  );
}
