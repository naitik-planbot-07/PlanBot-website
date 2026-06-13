import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { createWebPageSchema, createBreadcrumbSchema, createSpeakableSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'The Complete Guide to AI Planning in 2026',
  description: 'Everything you need to know about AI daily planners. Discover how students, professionals, and entrepreneurs use AI to automate their scheduling and achieve goals.',
  alternates: {
    canonical: 'https://planbotai.app/blog/ai-planner-guide/',
  },
};

export default function AiPlannerGuidePage() {
  return (
    <>
      <StructuredData data={createWebPageSchema(
        'The Complete Guide to AI Planning in 2026',
        'Everything you need to know about AI daily planners.',
        'https://planbotai.app/blog/ai-planner-guide/'
      )} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Home', item: 'https://planbotai.app/' },
        { name: 'Blog', item: 'https://planbotai.app/blog/' },
        { name: 'AI Planner Guide', item: 'https://planbotai.app/blog/ai-planner-guide/' }
      ])} />
      <StructuredData data={createSpeakableSchema('https://planbotai.app/blog/ai-planner-guide/', 'The Complete Guide to AI Planning')} />

      <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-pink-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-accent text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Comprehensive Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              The Complete Guide to <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Planning</span> in 2026
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Welcome to the ultimate resource for understanding, selecting, and mastering AI daily planners. Whether you are a student, professional, or entrepreneur, learn how to automate your schedule.
            </p>
          </header>

          <div className="space-y-12">
            {/* Section 1: Introduction */}
            <section className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🤖</span> What is AI Planning?
              </h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                Traditional to-do lists are passive grids. They record tasks but don't help you execute them. AI Planning uses artificial intelligence to dynamically structure your day, balance your cognitive load, and adapt to unexpected changes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/what-is-ai-planner-app-complete-guide" className="block p-4 rounded-xl border border-white/10 hover:border-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">AI Planner Complete Guide</h3>
                  <p className="text-sm text-text-secondary">Everything you need to know about how AI scheduling works.</p>
                </Link>
                <Link href="/blog/how-planbot-ai-works" className="block p-4 rounded-xl border border-white/10 hover:border-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">Under the Hood: PlanBot AI</h3>
                  <p className="text-sm text-text-secondary">Discover the architecture behind the fastest AI planner.</p>
                </Link>
              </div>
            </section>

            {/* Section 2: For Students */}
            <section className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">📚</span> AI for Students & Exams
              </h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                Competitive exams require grueling 10-hour study schedules spanning several months. AI planners automate subject rotation, space repetition, and break scheduling so you can focus entirely on learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/blog/how-to-create-jee-study-plan-with-ai" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">JEE Main & Adv</h3>
                </Link>
                <Link href="/blog/neet-2027-study-plan-ai-guide" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">NEET UG</h3>
                </Link>
                <Link href="/blog/upsc-daily-study-schedule-ai-planner" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">UPSC Civil Services</h3>
                </Link>
                <Link href="/blog/cat-2026-preparation-ai-study-plan" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">CAT Prep</h3>
                </Link>
                <Link href="/blog/gate-2027-preparation-ai-study-plan" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">GATE</h3>
                </Link>
                <Link href="/blog/ai-productivity-hacks-college-students" className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors text-center">
                  <h3 className="font-semibold text-white">College Hacks</h3>
                </Link>
              </div>
            </section>

            {/* Section 3: vs Competitors */}
            <section className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">⚔️</span> AI Planner vs Traditional Apps
              </h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                Why is an AI Planner better than a simple to-do list? We've compared PlanBot against the most popular productivity apps on the market to show you the difference between manual and automated planning.
              </p>
              <div className="space-y-3">
                <Link href="/blog/planbot-vs-google-calendar" className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/50 transition-colors">
                  <span className="font-semibold text-white">PlanBot vs Google Calendar</span>
                  <span className="text-accent text-sm">Read Comparison →</span>
                </Link>
                <Link href="/blog/planbot-vs-notion" className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/50 transition-colors">
                  <span className="font-semibold text-white">PlanBot vs Notion</span>
                  <span className="text-accent text-sm">Read Comparison →</span>
                </Link>
                <Link href="/blog/planbot-vs-todoist" className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/50 transition-colors">
                  <span className="font-semibold text-white">PlanBot vs Todoist</span>
                  <span className="text-accent text-sm">Read Comparison →</span>
                </Link>
                <Link href="/blog/planbot-vs-ticktick" className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/50 transition-colors">
                  <span className="font-semibold text-white">PlanBot vs TickTick</span>
                  <span className="text-accent text-sm">Read Comparison →</span>
                </Link>
              </div>
            </section>

            {/* Section 4: Focus & Deep Work */}
            <section className="glass-card p-8 md:p-10 relative overflow-hidden group">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🧠</span> Mastering Deep Work
              </h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                Planning is only half the battle. You also need to execute. Learn how to use AI and gamification to build unbreakable focus, eliminate procrastination, and manage your cognitive load.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/deep-work-focus-systems-ai" className="block p-4 rounded-xl border border-white/10 hover:border-pink-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">Mastering Deep Work</h3>
                </Link>
                <Link href="/blog/build-unbreakable-habits-ai-gamification" className="block p-4 rounded-xl border border-white/10 hover:border-pink-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">Gamification & Habits</h3>
                </Link>
                <Link href="/blog/planbot-adhd-focus" className="block p-4 rounded-xl border border-white/10 hover:border-pink-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">ADHD & AI Planners</h3>
                </Link>
                <Link href="/blog/how-to-stop-procrastinating-ai-solution" className="block p-4 rounded-xl border border-white/10 hover:border-pink-accent/50 bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white mb-1">Stopping Procrastination</h3>
                </Link>
              </div>
            </section>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/" className="btn-primary inline-block">
              Start Planning Free →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
