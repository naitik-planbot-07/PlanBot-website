'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PlayStoreLink from '@/components/PlayStoreLink';

interface TimeBlock {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  category: 'morning' | 'deep-focus' | 'break' | 'shallow' | 'workout' | 'evening';
  description: string;
  durationMinutes: number;
}

export default function DailyScheduleGeneratorPage() {
  const [wakeTime, setWakeTime] = useState('06:30');
  const [bedTime, setBedTime] = useState('23:00');
  const [persona, setPersona] = useState<'student' | 'professional' | 'college' | 'freelancer'>('student');
  const [studyHours, setStudyHours] = useState(8);
  const [energyPeak, setEnergyPeak] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [copied, setCopied] = useState(false);

  // Helper to parse HH:MM to total minutes from midnight
  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  // Helper to format minutes to 12-hour AM/PM string
  const formatTimeStr = (totalMins: number) => {
    let normalized = totalMins % (24 * 60);
    if (normalized < 0) normalized += 24 * 60;
    const hours24 = Math.floor(normalized / 60);
    const mins = normalized % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const padMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hours12}:${padMins} ${period}`;
  };

  // Generate dynamic schedule
  const schedule: TimeBlock[] = useMemo(() => {
    const wakeMins = toMinutes(wakeTime);
    let bedMins = toMinutes(bedTime);
    if (bedMins <= wakeMins) bedMins += 24 * 60; // Next day bedtime

    const totalAwakeMins = bedMins - wakeMins;
    const blocks: TimeBlock[] = [];
    let currentMins = wakeMins;

    // 1. Morning Routine (45 mins)
    blocks.push({
      id: 'morning-routine',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 45),
      title: persona === 'student' ? '🌅 Morning Activation & Hydration' : '🌅 Morning Routine & Day Review',
      category: 'morning',
      description: 'Hydrate (500ml), light stretching, healthy breakfast, and day objective review.',
      durationMinutes: 45,
    });
    currentMins += 45;

    // 2. Morning Prep / Warm-up (30 mins)
    blocks.push({
      id: 'morning-prep',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 30),
      title: '🎯 Daily Goal Setup & Quick Review',
      category: 'shallow',
      description: 'Review top 3 high-impact priorities and clear desk environment.',
      durationMinutes: 30,
    });
    currentMins += 30;

    // Calculate deep work distribution based on studyHours
    const targetFocusMins = Math.min(studyHours * 60, totalAwakeMins - 300);
    const sprintDuration = studyHours >= 8 ? 120 : 90;
    const numSprints = Math.max(2, Math.floor(targetFocusMins / sprintDuration));

    // Sprint 1: Deep Focus (Prime Energy)
    const sprint1Title = persona === 'student' ? '⚡ Deep Focus Sprint 1: Hardest Subject / Concepts' : '⚡ Deep Focus Sprint 1: High Cognitive Architecture';
    blocks.push({
      id: 'deep-sprint-1',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + sprintDuration),
      title: sprint1Title,
      category: 'deep-focus',
      description: 'Zero distractions. Phone in another room. Work on your most difficult task.',
      durationMinutes: sprintDuration,
    });
    currentMins += sprintDuration;

    // Break 1: Recharge
    blocks.push({
      id: 'break-1',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 20),
      title: '☕ Brain Rest & Movement',
      category: 'break',
      description: 'Step away from all screens. Walk, hydrate, and relax your eyes.',
      durationMinutes: 20,
    });
    currentMins += 20;

    // Sprint 2: Deep Focus
    const sprint2Title = persona === 'student' ? '⚡ Deep Focus Sprint 2: Problem Solving & PYQs' : '⚡ Deep Focus Sprint 2: Core Deliverable Execution';
    blocks.push({
      id: 'deep-sprint-2',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + sprintDuration),
      title: sprint2Title,
      category: 'deep-focus',
      description: 'High-intensity active application and deliberate practice.',
      durationMinutes: sprintDuration,
    });
    currentMins += sprintDuration;

    // Lunch & Midday Recharge (60 mins)
    blocks.push({
      id: 'lunch-recharge',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 60),
      title: '🥗 Nutritious Lunch & Cognitive Reset',
      category: 'break',
      description: 'Light balanced meal, 15-min walk, or 20-min power nap to reset mental stamina.',
      durationMinutes: 60,
    });
    currentMins += 60;

    // Afternoon Session (Sprint 3 or Shallow Review)
    if (numSprints >= 3 && (bedMins - currentMins) > 240) {
      blocks.push({
        id: 'deep-sprint-3',
        startTime: formatTimeStr(currentMins),
        endTime: formatTimeStr(currentMins + sprintDuration),
        title: persona === 'student' ? '⚡ Deep Focus Sprint 3: Secondary Subject / Theory' : '⚡ Deep Focus Sprint 3: Deep Work Block',
        category: 'deep-focus',
        description: 'Structured progress on key secondary milestones with full attention.',
        durationMinutes: sprintDuration,
      });
      currentMins += sprintDuration;

      blocks.push({
        id: 'break-2',
        startTime: formatTimeStr(currentMins),
        endTime: formatTimeStr(currentMins + 20),
        title: '🍎 Snack & Screen-Free Rest',
        category: 'break',
        description: 'Hydration and light recharge.',
        durationMinutes: 20,
      });
      currentMins += 20;
    }

    // Shallow Tasks / Admin / Revision (60 mins)
    blocks.push({
      id: 'shallow-block',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 60),
      title: persona === 'student' ? '📝 Formula Revision & Error Log Analysis' : '📧 Communications, Admin & Daily Wrap-Up',
      category: 'shallow',
      description: 'Low-energy tasks, clearing backlogs, and reviewing today’s completed milestones.',
      durationMinutes: 60,
    });
    currentMins += 60;

    // Physical Activity & Personal Time (60 mins)
    blocks.push({
      id: 'workout-personal',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 60),
      title: '🏃 Physical Exercise & Decompression',
      category: 'workout',
      description: 'Gym, running, sports, or walk. Physical movement boosts neuroplasticity and memory.',
      durationMinutes: 60,
    });
    currentMins += 60;

    // Dinner & Social (60 mins)
    blocks.push({
      id: 'dinner-social',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(currentMins + 60),
      title: '🍲 Dinner & Family / Social Connection',
      category: 'break',
      description: 'Relaxed meal with family/friends. Disconnect from high-pressure tasks.',
      durationMinutes: 60,
    });
    currentMins += 60;

    // Night sprint for night owls or heavy study requirements
    if (energyPeak === 'night' || studyHours >= 10) {
      const remainingTime = bedMins - currentMins - 45;
      if (remainingTime >= 60) {
        const nightSprintMins = Math.min(remainingTime, 90);
        blocks.push({
          id: 'night-sprint',
          startTime: formatTimeStr(currentMins),
          endTime: formatTimeStr(currentMins + nightSprintMins),
          title: '⚡ Night Mastery Sprint: Flashcards & Active Recall',
          category: 'deep-focus',
          description: 'Quiet night focus session for high retention revision.',
          durationMinutes: nightSprintMins,
        });
        currentMins += nightSprintMins;
      }
    }

    // Evening Wind-down (45 mins before bed)
    blocks.push({
      id: 'evening-winddown',
      startTime: formatTimeStr(currentMins),
      endTime: formatTimeStr(bedMins),
      title: '🌙 Night Review & Sleep Preparation',
      category: 'evening',
      description: 'Log progress, no blue light 30 mins before sleep, read a book, deep recovery sleep.',
      durationMinutes: Math.max(30, bedMins - currentMins),
    });

    return blocks;
  }, [wakeTime, bedTime, persona, studyHours, energyPeak]);

  // Copy timetable text
  const handleCopy = () => {
    const text = [
      `📅 MY OPTIMIZED DAILY SCHEDULE (${persona.toUpperCase()})`,
      `⏰ Wake: ${wakeTime} | Bed: ${bedTime} | Target Focus: ${studyHours} Hours`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...schedule.map(
        (b) => `[${b.startTime} - ${b.endTime}] ${b.title}\n→ ${b.description}`
      ),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Generated with PlanBot AI. Track your daily streaks on Android: https://play.google.com/store/apps/details?id=cpm.planbot`,
    ].join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const getCategoryBadge = (cat: TimeBlock['category']) => {
    switch (cat) {
      case 'deep-focus':
        return { bg: 'bg-primary/20 text-accent border-primary/40', label: '⚡ Deep Focus' };
      case 'morning':
        return { bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', label: '🌅 Routine' };
      case 'break':
        return { bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', label: '☕ Rest & Meal' };
      case 'shallow':
        return { bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40', label: '📝 Shallow / Review' };
      case 'workout':
        return { bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', label: '🏃 Exercise' };
      case 'evening':
        return { bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40', label: '🌙 Recovery' };
      default:
        return { bg: 'bg-white/10 text-white border-white/20', label: 'Task' };
    }
  };

  return (
    <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <span>/</span>
        <span className="text-accent font-medium">Daily Schedule Generator</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/30 text-accent mb-3 inline-block">
          ⚡ Free Interactive Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Free AI Daily Schedule &amp; <span className="text-gradient">Time-Blocking Generator</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Create an optimized, science-backed daily timetable tailored to your wake times, study/work goals, and peak energy cycles in seconds.
        </p>
      </div>

      {/* Interactive Controls & Live Output Grid */}
      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-6 h-fit">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span> Customize Your Routine
          </h2>

          {/* Persona Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              Your Primary Focus
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'student', label: '🎓 Exam Student' },
                { key: 'professional', label: '💼 Professional' },
                { key: 'college', label: '📚 College' },
                { key: 'freelancer', label: '💻 Creator' },
              ].map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPersona(p.key as any)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
                    persona === p.key
                      ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.3)]'
                      : 'bg-surface/40 border-glass-border text-text-secondary hover:border-white/20'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wake & Sleep Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
                Wake Up Time
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full bg-surface/60 border border-glass-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
                Target Bedtime
              </label>
              <input
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-full bg-surface/60 border border-glass-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Target Focus Hours Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                Target Focus / Study Hours
              </label>
              <span className="text-sm font-bold text-accent px-2 py-0.5 rounded bg-primary/20">
                {studyHours} Hours / Day
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              step={1}
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-dim mt-1">
              <span>4 hrs (Light)</span>
              <span>8 hrs (Standard)</span>
              <span>12 hrs (Intensive)</span>
            </div>
          </div>

          {/* Peak Energy Cycle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              When Is Your Peak Focus?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'morning', label: '🌅 Morning (8AM-12PM)' },
                { key: 'afternoon', label: '☀️ Afternoon (1PM-5PM)' },
                { key: 'evening', label: '🌆 Evening (6PM-10PM)' },
                { key: 'night', label: '🦉 Night Owl (10PM+)' },
              ].map((cycle) => (
                <button
                  key={cycle.key}
                  type="button"
                  onClick={() => setEnergyPeak(cycle.key as any)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
                    energyPeak === cycle.key
                      ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.3)]'
                      : 'bg-surface/40 border-glass-border text-text-secondary hover:border-white/20'
                  }`}
                >
                  {cycle.label}
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
              {copied ? '✅ Timetable Copied to Clipboard!' : '📋 Copy Schedule as Text'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-glass-border bg-surface/30 text-text-secondary hover:text-white hover:border-white/30 text-xs font-medium transition-colors text-center"
            >
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Right Column: Live Schedule Display (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📅</span> Generated Timetable
              <span className="text-xs font-normal text-text-dim">({schedule.length} Time Blocks)</span>
            </h2>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              ● Live Sync
            </span>
          </div>

          <div className="space-y-3">
            {schedule.map((block) => {
              const badge = getCategoryBadge(block.category);
              return (
                <div
                  key={block.id}
                  className="glass-card p-4 md:p-5 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-4">
                    <div className="min-w-[105px] text-xs font-mono font-semibold text-accent bg-surface/80 px-2.5 py-1.5 rounded-lg border border-glass-border text-center">
                      {block.startTime}
                      <div className="text-[10px] text-text-dim">{block.durationMinutes} mins</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm md:text-base font-bold text-white">{block.title}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{block.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PlanBot Android App Conversion Banner */}
      <section className="glass-card p-8 md:p-12 border-primary/40 bg-gradient-to-r from-primary/10 via-surface/40 to-accent/10 mb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent mb-3 inline-block">
              🚀 Upgrade from Static to Active AI
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              What happens when your day gets interrupted?
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Static schedules fail the moment a meeting runs late or a chapter takes extra time. The <strong className="text-white">PlanBot Android app</strong> dynamically reorganizes your remaining schedule automatically, sends streak reminders, and tracks your daily focus XP.
            </p>
          </div>
          <PlayStoreLink 
              location="daily_schedule_generator"
              className="btn-primary whitespace-nowrap text-sm !px-6 !py-3.5 flex items-center gap-2"
            >
              Automate Your Schedule on Android →
            </PlayStoreLink>
        </div>
      </section>

      {/* Comprehensive SEO Content & FAQ Guide */}
      <article className="prose prose-invert max-w-4xl mx-auto space-y-10 text-text-secondary leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            The Science of Time-Blocking &amp; Circadian Productivity
          </h2>
          <p>
            Time-blocking is the gold standard time-management framework utilized by high-performing exam toppers, software engineers, and founders. Unlike open-ended to-do lists, time-blocking assigns a dedicated, non-negotiable temporal slot to each task.
          </p>
          <p>
            According to Parkinson&apos;s Law, work expands to fill the time available for its completion. By allocating a strict 90 to 120-minute window to a difficult concept or project milestone, you force cognitive compression and eliminate multitasking friction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            3 Golden Rules to Make Your Daily Schedule Stick
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            <div className="glass-card p-5">
              <h3 className="text-base font-bold text-white mb-2">1. Never Skip Buffers</h3>
              <p className="text-xs text-text-dim">
                Always schedule 15–20 minutes of buffer between deep focus blocks to accommodate cognitive fatigue and bio breaks.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-base font-bold text-white mb-2">2. Match Energy to Task</h3>
              <p className="text-xs text-text-dim">
                Schedule your most cognitively taxing subjects (e.g. Physics, Data Structures) during your natural peak energy window.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-base font-bold text-white mb-2">3. Night Review Ritual</h3>
              <p className="text-xs text-text-dim">
                Always audit what was completed the night before so you wake up with absolute execution clarity without decision fatigue.
              </p>
            </div>
          </div>
        </section>

        {/* SEO Internal Link Authority Module */}
        <section className="pt-6 border-t border-glass-border">
          <h3 className="text-lg font-bold text-white mb-4">Deep Dives on AI Planning &amp; Automated Scheduling:</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/what-is-ai-planner-app-complete-guide" className="glass-card p-4 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-1">What is an AI Planner App? Complete Guide 2026 →</h4>
              <p className="text-xs text-text-secondary">Learn how AI daily planners eliminate morning decision fatigue and optimize routines.</p>
            </Link>
            <Link href="/blog/ai-scheduling-workflow-automation" className="glass-card p-4 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-1">AI-Driven Scheduling &amp; Workflow Automation →</h4>
              <p className="text-xs text-text-secondary">Discover how adaptive AI calendars re-balance your day when unexpected delays occur.</p>
            </Link>
            <Link href="/use-cases/ai-planner-for-students-exams" className="glass-card p-4 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-1">AI Planner for Students &amp; Exam Prep →</h4>
              <p className="text-xs text-text-secondary">Custom study routines and spaced revision plans for JEE, NEET, UPSC, and Bank PO.</p>
            </Link>
            <Link href="/compare/planbot-vs-google-calendar" className="glass-card p-4 hover:border-primary/50 transition-colors block">
              <h4 className="text-sm font-bold text-white mb-1">PlanBot vs Google Calendar Comparison →</h4>
              <p className="text-xs text-text-secondary">Why automated AI time-blocking outperforms static manual calendar events.</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
