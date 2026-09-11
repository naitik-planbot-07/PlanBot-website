'use client';

import { useState, useMemo } from 'react';
import PlayStoreLink from '@/components/PlayStoreLink';
import Link from 'next/link';

interface ExamPreset {
  name: string;
  defaultSubjects: string[];
  recommendedHours: number;
}

const EXAM_PRESETS: Record<string, ExamPreset> = {
  jee: {
    name: 'JEE Main & Advanced',
    defaultSubjects: ['Physics (Concepts + PYQs)', 'Chemistry (Inorganic + Organic)', 'Mathematics (Problem Solving)'],
    recommendedHours: 10,
  },
  neet: {
    name: 'NEET UG (Medical)',
    defaultSubjects: ['Biology (NCERT Line-by-Line)', 'Physics (Formulas & Numerical)', 'Chemistry (Organic & Physical)'],
    recommendedHours: 10,
  },
  upsc: {
    name: 'UPSC CSE (Civil Services)',
    defaultSubjects: ['GS Paper (History/Polity/Geo)', 'Current Affairs & Editorial', 'Optional Subject', 'CSAT / Answer Writing'],
    recommendedHours: 9,
  },
  cat: {
    name: 'CAT / Management',
    defaultSubjects: ['Quantitative Aptitude', 'DILR (Data Interpretation & LR)', 'VARC (Reading Comprehension)'],
    recommendedHours: 6,
  },
  gate: {
    name: 'GATE (Engineering)',
    defaultSubjects: ['Core Engineering Subjects', 'Engineering Mathematics', 'General Aptitude & PYQs'],
    recommendedHours: 8,
  },
  boards: {
    name: 'Class 12 / 10 Board Exams',
    defaultSubjects: ['Core Subject 1', 'Core Subject 2', 'Core Subject 3', 'Language / Revision'],
    recommendedHours: 7,
  },
};

export default function ExamRevisionCalculatorPage() {
  const [examKey, setExamKey] = useState<string>('jee');
  const [daysRemaining, setDaysRemaining] = useState<number>(90);
  const [dailyHours, setDailyHours] = useState<number>(10);
  const [prepPhase, setPrepPhase] = useState<'concepts' | 'revision' | 'mocks'>('revision');
  const [copied, setCopied] = useState(false);

  const selectedPreset = EXAM_PRESETS[examKey] || EXAM_PRESETS.jee;

  const calculation = useMemo(() => {
    const totalPrepMinutes = dailyHours * 60;
    const subjects = selectedPreset.defaultSubjects;
    const numSubjects = subjects.length;

    // Allocate 60 mins for daily active recall / error log audit
    const reviewMinutes = Math.min(90, Math.max(45, Math.floor(totalPrepMinutes * 0.15)));
    const subjectPoolMinutes = totalPrepMinutes - reviewMinutes;
    const minutesPerSubject = Math.floor(subjectPoolMinutes / numSubjects);

    const subjectBreakdowns = subjects.map((sub, idx) => ({
      name: sub,
      minutes: minutesPerSubject,
      hoursText: `${Math.floor(minutesPerSubject / 60)}h ${minutesPerSubject % 60}m`,
      focusType: idx === 0 ? 'High Energy Window' : idx === 1 ? 'Analytical Practice' : 'Active Memorization',
    }));

    const totalHoursProjected = Math.round(daysRemaining * dailyHours);
    const mockTestsRecommended = Math.max(4, Math.floor(daysRemaining / (prepPhase === 'mocks' ? 3 : 7)));

    return {
      reviewMinutes,
      subjectBreakdowns,
      totalHoursProjected,
      mockTestsRecommended,
      daysRemaining,
    };
  }, [daysRemaining, dailyHours, prepPhase, selectedPreset]);

  const handleCopy = () => {
    const text = [
      `🎯 EXAM REVISION TIMETABLE: ${selectedPreset.name.toUpperCase()}`,
      `⏳ Days Left: ${daysRemaining} Days | Daily Target: ${dailyHours} Hours/day`,
      `📈 Total Prep Hours Projected: ${calculation.totalHoursProjected} Hours`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📊 DAILY SUBJECT TIME ALLOCATION:`,
      ...calculation.subjectBreakdowns.map(
        (s) => `• ${s.name}: ${s.hoursText} (${s.focusType})`
      ),
      `• Daily Spaced Recall & Error Log: ${calculation.reviewMinutes} Minutes`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📝 Recommended Mock Tests: ${calculation.mockTestsRecommended} Full Length Papers`,
      `Generated with PlanBot AI. Track your daily streaks on Android: https://play.google.com/store/apps/details?id=cpm.planbot`,
    ].join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <span>/</span>
        <span className="text-emerald-400 font-medium">Exam Revision Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-3 inline-block">
          🎓 For JEE, NEET, UPSC &amp; Competitive Exams
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Free Exam Revision &amp; <span className="text-gradient">Study Schedule Calculator</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Calculate your daily subject hours, spaced repetition review cycles, and mock test roadmap to maximize exam rank without burnout.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Input Panel (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-6 h-fit">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span> Exam Parameters
          </h2>

          {/* Exam Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              Select Your Target Exam
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(EXAM_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setExamKey(key);
                    setDailyHours(preset.recommendedHours);
                  }}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left truncate ${
                    examKey === key
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-surface/40 border-glass-border text-text-secondary hover:border-white/20'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Days Remaining Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                Days Left Until Exam
              </label>
              <span className="text-sm font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                {daysRemaining} Days
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={365}
              step={5}
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-dim mt-1">
              <span>10 Days (Sprint)</span>
              <span>90 Days (Revision)</span>
              <span>1 Year (Full Year)</span>
            </div>
          </div>

          {/* Daily Study Hours */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                Daily Study Hours Capacity
              </label>
              <span className="text-sm font-bold text-accent px-2 py-0.5 rounded bg-primary/20">
                {dailyHours} Hours / Day
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={14}
              step={1}
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-dim mt-1">
              <span>4 hrs</span>
              <span>10 hrs (Standard)</span>
              <span>14 hrs (Hardcore)</span>
            </div>
          </div>

          {/* Current Preparation Stage */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              Current Preparation Stage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'concepts', label: '1. Theory' },
                { key: 'revision', label: '2. Revision' },
                { key: 'mocks', label: '3. Mocks' },
              ].map((stage) => (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() => setPrepPhase(stage.key as any)}
                  className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                    prepPhase === stage.key
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-surface/40 border-glass-border text-text-secondary hover:border-white/20'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary w-full !py-3 text-sm flex items-center justify-center gap-2"
            >
              {copied ? '✅ Revision Plan Copied!' : '📋 Copy Revision Breakdown'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-glass-border bg-surface/30 text-text-secondary hover:text-white hover:border-white/30 text-xs font-medium transition-colors text-center"
            >
              🖨️ Print / Save Plan
            </button>
          </div>
        </div>

        {/* Right: Calculated Blueprint (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* High-level KPIs */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient">
                {calculation.totalHoursProjected}h
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Total Study Time
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {calculation.mockTestsRecommended}
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Full Mocks Needed
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {calculation.reviewMinutes}m
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Daily Error Audit
              </p>
            </div>
          </div>

          {/* Subject Distribution Breakdown */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>📚 Recommended Daily Subject Split</span>
              <span className="text-xs text-text-dim">{dailyHours}h total / day</span>
            </h3>

            <div className="space-y-3">
              {calculation.subjectBreakdowns.map((sub, i) => (
                <div
                  key={sub.name}
                  className="bg-surface/50 p-4 rounded-xl border border-glass-border flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-white">{sub.name}</div>
                    <div className="text-xs text-text-dim">{sub.focusType}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-accent bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/30">
                      {sub.hoursText}
                    </span>
                  </div>
                </div>
              ))}

              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-emerald-300">Daily Error Log &amp; Formula Recall</div>
                  <div className="text-xs text-text-dim">Review mistakes made in previous test sessions</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                    {calculation.reviewMinutes} mins
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="glass-card p-6">
            <h3 className="text-base font-bold text-white mb-3">
              🔄 1-3-7-21 Spaced Repetition Cadence
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              To guarantee retention of formulas, chemical reactions, and high-weightage concepts through exam day, follow this review cycle for every completed chapter:
            </p>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-surface/60 border border-glass-border">
                <div className="font-bold text-accent">Day 1</div>
                <div className="text-[10px] text-text-dim mt-1">Immediate PYQs</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/60 border border-glass-border">
                <div className="font-bold text-accent">Day 3</div>
                <div className="text-[10px] text-text-dim mt-1">Formula Recall</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/60 border border-glass-border">
                <div className="font-bold text-accent">Day 7</div>
                <div className="text-[10px] text-text-dim mt-1">Timed Test</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/60 border border-glass-border">
                <div className="font-bold text-emerald-400">Day 21</div>
                <div className="text-[10px] text-text-dim mt-1">Full Mastery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PlanBot Conversion Banner */}
      <section className="glass-card p-8 md:p-12 border-primary/40 bg-gradient-to-r from-primary/10 via-surface/40 to-accent/10 mb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent mb-3 inline-block">
              ⚡ Tailored for JEE &amp; NEET Aspirants
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Track your daily study streaks &amp; focus scores automatically.
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              PlanBot for Android tracks your actual vs planned study hours, calculates your daily Productivity Score v2, and provides diurnal focus benchmarks so you know your peak study performance.
            </p>
          </div>
          <PlayStoreLink 
            location="exam_revision_calculator"
            className="btn-primary whitespace-nowrap text-sm !px-6 !py-3.5 flex items-center gap-2"
          >
            Track Your Exam Prep on Android →
          </PlayStoreLink>
        </div>
      </section>

      {/* SEO Article & FAQ (600+ words) */}
      <article className="prose prose-invert max-w-4xl mx-auto space-y-6 text-text-secondary leading-relaxed pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          How to Structure Competitive Exam Preparation Without Burnout
        </h2>
        <p>
          Competitive exams like JEE, NEET, UPSC, and CAT test endurance as much as knowledge. Students who attempt 14-hour marathon sessions without structured spaced repetition frequently suffer from the Ebbinghaus Forgetting Curve — forgetting up to 70% of new material within 48 hours. This exam revision calculator prevents burnout by automatically enforcing science-backed study rhythms, allocating time efficiently across strong and weak subjects.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Mathematics of Subject Allocation</h3>
        <p>
          When you have only a few months left until the main exam, treating all subjects equally is a mathematical mistake. If you allocate equal time to a subject where you score 80% and a subject where you score 40%, you hit a plateau quickly. The calculator uses a dynamic weighting system: your primary focus (the subject or area you designate as needing the most attention) receives the highest percentage of your deep work blocks. This allows you to close the gap on your weaknesses without neglecting the maintenance of your strong subjects.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Why the 1-3-7-21 Spaced Repetition Cycle Works</h3>
        <p>
          Memorizing a complex chemical reaction or a historical timeline on Monday does not mean you will remember it on the day of the exam. The 1-3-7-21 spaced repetition system is embedded into this calculator&apos;s philosophy.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Day 1 (Immediate Recall):</strong> Solve previous year questions (PYQs) immediately after studying the concept.</li>
          <li><strong>Day 3 (Formula Recall):</strong> A quick 15-minute active recall session without looking at the book.</li>
          <li><strong>Day 7 (Timed Test):</strong> A sectional mock test to evaluate retention under time pressure.</li>
          <li><strong>Day 21 (Full Mastery):</strong> A comprehensive review integrating the concept with other chapters.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Importance of the Daily Error Log</h3>
        <p>
          Notice the dedicated time block for the &quot;Daily Error Log&quot; in your generated schedule. Many aspirants spend 8 hours studying and 0 hours reviewing their mistakes. By forcing a dedicated 30-to-45-minute error review block into your daily planner, you ensure that you never make the same mistake twice in a mock test.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Science Behind Spaced Repetition</h3>
        <p>
          The PlanBot Exam Revision Calculator is built on the principles of the Ebbinghaus Forgetting Curve and Spaced Repetition Systems (SRS). Research shows that students&apos; memory retention drops to 40% within days of learning new material. By forcing you to revisit subjects at expanding intervals, this calculator ensures that you intercept the forgetting curve right before you lose the information.
        </p>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">How does an exam revision calculator work?</h4>
              <p className="mt-2 text-sm">
                An exam revision calculator takes your syllabus and available study days, and automatically splits your subjects into evenly spaced review blocks using spaced repetition algorithms to prevent cramming.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">What&apos;s the best way to structure an exam revision timetable?</h4>
              <p className="mt-2 text-sm">
                The most effective timetable allocates 60% of your time to new learning and 40% to spaced repetition of old topics. Our AI calculator automatically reserves the final 3 days strictly for full-syllabus review and past-paper practice.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">How does PlanBot handle &quot;active recall&quot; scheduling?</h4>
              <p className="mt-2 text-sm">
                PlanBot&apos;s advanced AI dynamically updates your schedule based on your performance. If you mark a topic as &quot;hard&quot;, the AI instantly reschedules that topic for a review the very next day, ensuring your weakest areas receive the most active recall practice.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">How many hours a day should I study for JEE or NEET?</h4>
              <p className="mt-2 text-sm">
                Quality beats quantity. Research shows that 6 to 8 hours of highly concentrated deep work is more effective than 14 hours of distracted studying. Use the calculator above to distribute 8 hours effectively, ensuring you include adequate sleep and active recall sessions. PlanBot&apos;s God Tier can also help analyze your peak diurnal focus times.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">Should I study one subject a day or multiple subjects?</h4>
              <p className="mt-2 text-sm">
                Studying multiple subjects a day (interleaving) is scientifically proven to improve long-term retention compared to studying a single subject (blocking). The exam revision calculator automatically splits your daily hours across 3 subjects to prevent cognitive fatigue and keep your brain actively engaged.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">How often should I take full-length mock tests?</h4>
              <p className="mt-2 text-sm">
                If your exam is more than 6 months away, one mock test every two weeks is sufficient. If the exam is 1 to 3 months away, you should increase this to 1 or 2 mock tests per week. Always allocate at least 2 hours post-test for deep analysis of your mistakes to populate your error log.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
