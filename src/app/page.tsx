import type { Metadata } from 'next';
import SmokeBackground from '@/components/SmokeBackground';
import FeatureTicker from '@/components/FeatureTicker';
import PricingCard from '@/components/PricingCard';
import BlogCard from '@/components/BlogCard';
import StructuredData from '@/components/StructuredData';
import { getAllPosts } from '@/lib/mdx';
import { websiteSchema, mobileAppSchema, createFAQSchema, createWebPageSchema, createBreadcrumbSchema, createSpeakableSchema } from '@/lib/seo';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export const metadata: Metadata = {
  title: 'PlanBot — AI Daily Planner App for Students, Professionals & Athletes',
  description:
    'PlanBot creates your perfect personalized daily plan in seconds using advanced AI. Whether you\'re cracking JEE, building a business, or training for a race — your goal, your plan. Free on Android.',
  keywords: [
    'ai planner app india',
    'ai study planner',
    'daily planner app android india',
    'planbot app',
    'ai goal planner',
    'jee study planner app',
    'neet preparation app',
    'productivity app india 2026',
  ],
};

const homeFAQs = [
  {
    question: 'What is PlanBot?',
    answer:
      'PlanBot is an AI-powered daily planner app for Android that creates personalized plans for students, professionals, athletes, and entrepreneurs using advanced AI technology.',
  },
  {
    question: 'Is PlanBot free?',
    answer:
      'Yes. PlanBot is free to download with 2 AI plans per day. Paid plans start at ₹99/month for Pro tier.',
  },
  {
    question: 'What AI does PlanBot use?',
    answer:
      'PlanBot uses multiple advanced AI models across its tiers. Each tier unlocks a progressively more powerful AI engine — from basic AI (Free) to our most advanced AI (God tier).',
  },
  {
    question: 'Is PlanBot available on iPhone?',
    answer:
      'PlanBot is currently available on Android only. Download from the Google Play Store. iOS support is planned for the future.',
  },
];

const features = [
  { icon: '🤖', title: 'AI-Powered Plans', desc: 'Advanced AI creates plans tailored to YOUR goal in seconds', link: '/blog/ai-scheduling-workflow-automation' },
  { icon: '🔥', title: 'Streak System', desc: 'Daily streaks, XP levels, and freeze protection keep you going', link: '/blog/build-unbreakable-habits-ai-gamification' },
  { icon: '📊', title: 'Weekly AI Reports', desc: 'Elite users get a personalized AI performance analysis every Monday', link: '/blog/deep-work-focus-systems-ai' },
  { icon: '🎯', title: 'Works for Everyone', desc: 'JEE, NEET, Job, Business, Sports, Fitness — any goal type', link: '/blog/student-routine-generation-ai' },
  { icon: '❄️', title: 'Streak Freeze', desc: 'Protect your streak with freeze charges. Never lose progress again', link: '/features' },
  { icon: '🎁', title: '3-Day God Trial', desc: 'Try our most powerful tier FREE. No credit card needed', link: '/pricing' },
];

const steps = [
  { num: '01', title: 'Choose Your Goal', desc: 'Pick from Student, Professional, Athlete, Business & more', link: '/blog/how-entrepreneurs-use-ai-plan-day' },
  { num: '02', title: 'AI Builds Your Plan', desc: 'Our AI creates a personalized daily schedule just for you', link: '/blog/ai-scheduling-workflow-automation' },
  { num: '03', title: 'Track & Improve', desc: 'Streaks, XP, and weekly AI performance reports', link: '/blog/deep-work-focus-systems-ai' },
];

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={mobileAppSchema} />
      <StructuredData data={createFAQSchema(homeFAQs)} />
      <StructuredData data={createWebPageSchema(
        'PlanBot — AI Daily Planner App',
        'PlanBot creates your perfect personalized daily plan in seconds using advanced AI.',
        'https://planbotai.app/'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app/' }
      ])} />
      {/* Phase 2 Fix #6 — Speakable schema for voice/AEO */}
      <StructuredData data={createSpeakableSchema('https://planbotai.app/', 'PlanBot — AI Daily Planner App')} />

      {/* ── Hidden Semantic Entities for AI/SEO ── */}
      <div className="sr-only" aria-hidden="false">
        <h2>Advanced AI Planner App & Productivity Assistant</h2>
        <p>
          PlanBot is an AI productivity app designed to be the ultimate daily planner AI. It functions as an AI scheduling assistant, study planner, and routine optimization engine. 
          By using our AI schedule generator, students achieve better focus optimization, and professionals master time management. 
          PlanBot replaces manual task management with adaptive scheduling, acting as your personal AI organization tool and routine planner AI.
        </p>
      </div>

      {/* ── Hero Section ── */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <SmokeBackground smokeColor="#1E90FF" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            AI Daily Planner for Every Goal —{' '}
            <span className="text-gradient">Students, Professionals & Athletes</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            PlanBot creates your perfect personalized daily plan in seconds using advanced AI. Whether you&apos;re
            cracking JEE, building a business, or training for a race — your goal, your plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">
              Get PlanBot Free on Android →
            </a>
            <a href="/features" className="btn-secondary">
              Explore Features
            </a>
          </div>
          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-text-secondary">
            <span>🤖 Powered by Advanced AI</span>
            <span className="hidden md:inline">•</span>
            <span>🔥 Streak System</span>
            <span className="hidden md:inline">•</span>
            <span>📊 Weekly AI Reports</span>
            <span className="hidden md:inline">•</span>
            <span>⭐ Free to Start</span>
          </div>
        </div>
      </header>

      {/* ── App Notice ── */}
      <aside className="bg-surface/50 border-y border-glass-border py-4 px-4 text-center" aria-label="App download notice">
        <p className="text-sm text-text-secondary">
          📱 PlanBot is an Android app. This website shares tips and guides.{' '}
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold underline hover:text-primary">
            Download the app to start planning →
          </a>
        </p>
      </aside>

      {/* ── Feature Ticker ── */}
      <FeatureTicker />

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center mb-4">
            How <span className="text-gradient">PlanBot</span> Works
          </h2>
          <p className="section-subheading text-center mb-16">Three steps to your perfect plan</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.num} className="text-center md:text-left">
                <span className="inline-block text-5xl font-bold text-gradient mb-4">{step.num}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-text-secondary mb-3">{step.desc}</p>
                {step.link && (
                  <a href={step.link} className="text-sm text-accent underline hover:text-primary font-medium">Read guide →</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-20 md:py-28 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center mb-4">
            Everything You Need to <span className="text-gradient">Achieve Your Goals</span>
          </h2>
          <p className="section-subheading text-center mb-16">
            PlanBot, the AI planner app, combines powerful AI with gamification to keep you on track.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 md:p-8">
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary mb-3">{f.desc}</p>
                {f.link && (
                  <a href={f.link} className="text-xs font-semibold text-accent underline hover:text-primary">Learn more →</a>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Download PlanBot Free →
            </a>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="section-subheading text-center mb-16">Start free. Upgrade when you&apos;re ready.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PricingCard
              tier="Free"
              price="Free"
              features={['2 AI plans/day', 'Basic AI', 'Streak system']}
            />
            <PricingCard
              tier="Pro"
              price="₹99"
              yearlyPrice="₹999"
              features={['4 AI plans/day', 'No ads', 'Standard AI']}
            />
            <PricingCard
              tier="Elite"
              price="₹129"
              yearlyPrice="₹1,299"
              features={['5 AI plans/day', 'Weekly AI Report', 'Advanced AI']}
            />
            <PricingCard
              tier="God"
              price="₹249"
              yearlyPrice="₹2,499"
              features={['Unlimited plans', 'Premium AI', '3-day FREE trial']}
              highlighted
              badge="MOST POWERFUL"
            />
          </div>

          <p className="text-center text-sm text-text-dim mt-8">
            All plans available in the app. Download to subscribe. Save up to 30% with yearly plans.
          </p>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      {latestPosts.length > 0 && (
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-surface/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-heading text-center mb-4">
              Tips, Guides & Strategies for <span className="text-gradient">Goal Achievers</span>
            </h2>
            <p className="section-subheading text-center mb-16">
              Learn how to plan smarter with AI — from the PlanBot Team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.description}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="/blog" className="btn-secondary">
                View All Articles →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── SEO FAQ Section ── */}
      <section className="py-16 px-4 sm:px-6" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="sr-only">Frequently Asked Questions about PlanBot AI Planner</h2>
          <div className="space-y-3">
            {homeFAQs.map((faq, i) => (
              <details key={i} className="group border border-glass-border bg-surface/30 rounded-lg transition-colors hover:bg-surface/50">
                <summary className="cursor-pointer p-4 font-medium text-white flex justify-between items-center list-none outline-none">
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <span className="text-accent transition-transform duration-300 group-open:rotate-180" aria-hidden="true">▼</span>
                </summary>
                <div className="p-4 pt-0 text-text-secondary text-sm md:text-base leading-relaxed">
                  <span>{faq.answer}</span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Planning Smarter. <span className="text-gradient">It&apos;s Free.</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Available on Android • Free to download • No credit card needed
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">
            Get PlanBot Free on Android →
          </a>
        </div>
      </section>

      {/* ── EEAT & SEO Credibility Section ── */}
      <footer className="py-8 px-4 sm:px-6 border-t border-glass-border bg-surface/20" aria-label="Trust and Authority Signals">
        <div className="max-w-5xl mx-auto text-xs text-text-dim leading-relaxed text-center md:text-left">
          <h2 className="sr-only">About PlanBot AI & Our Mission</h2>
          <p className="mb-3">
            <strong className="text-white/60">PlanBot</strong> is developed by <strong className="text-white/60">PlannextTech</strong>, founded by <strong className="text-white/60">Naitik Baldaniya</strong>. We are a team of productivity experts and developers committed to building advanced AI scheduling assistants. Our mission is to help Indian students (JEE, NEET), professionals, and athletes optimize their routines using cutting-edge AI daily planner technology.
          </p>
          <p className="mb-3">
            With a growing user base relying on our AI study planners and productivity tools, PlanBot sets the standard for personalized scheduling, habit building, and AI-driven time management. We prioritize user privacy, data-driven productivity improvement, and seamless mobile experiences.
          </p>
          <div className="sr-only" aria-hidden="false">
            <h3>Our Planning Methodology</h3>
            <p>Our productivity workflow methodology combines evidence-based productivity principles with advanced machine learning. By utilizing adaptive scheduling, PlanBot continually learns from your task completion rates, optimizing your focus time and enforcing schedule automation. It serves as a comprehensive productivity methodology engine designed to eliminate procrastination and maximize output.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
