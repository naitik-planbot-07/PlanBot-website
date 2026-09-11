'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import PlayStoreLink from '@/components/PlayStoreLink';

interface FocusMethod {
  name: string;
  focusMins: number;
  shortBreakMins: number;
  longBreakMins: number;
  longBreakInterval: number;
  description: string;
}

const METHODS: Record<string, FocusMethod> = {
  pomodoro: {
    name: 'Classic Pomodoro',
    focusMins: 25,
    shortBreakMins: 5,
    longBreakMins: 15,
    longBreakInterval: 4,
    description: 'Best for overcoming procrastination and maintaining sustained momentum.',
  },
  sprint50: {
    name: '50/10 Deep Work Sprint',
    focusMins: 50,
    shortBreakMins: 10,
    longBreakMins: 25,
    longBreakInterval: 3,
    description: 'Ideal for complex problem solving, coding, and heavy exam chapters.',
  },
  ultradian: {
    name: '90/20 Ultradian Rhythm',
    focusMins: 90,
    shortBreakMins: 20,
    longBreakMins: 30,
    longBreakInterval: 2,
    description: 'Synchronized with human biological circadian focus peaks for maximum cognitive output.',
  },
};

export default function PomodoroCalculatorPage() {
  const [methodKey, setMethodKey] = useState<string>('sprint50');
  const [targetWorkHours, setTargetWorkHours] = useState<number>(6);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [checkedSessions, setCheckedSessions] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const selectedMethod = METHODS[methodKey] || METHODS.sprint50;

  const calculation = useMemo(() => {
    const targetWorkMins = targetWorkHours * 60;
    const numSessions = Math.max(1, Math.round(targetWorkMins / selectedMethod.focusMins));
    const totalActualFocusMins = numSessions * selectedMethod.focusMins;

    let totalBreakMins = 0;
    const sessionsList = [];

    const [startH, startM] = startTime.split(':').map(Number);
    let currentMins = startH * 60 + startM;

    for (let i = 1; i <= numSessions; i++) {
      const sessionStart = currentMins;
      const sessionEnd = currentMins + selectedMethod.focusMins;
      currentMins = sessionEnd;

      const isLongBreak = i % selectedMethod.longBreakInterval === 0 && i < numSessions;
      const breakDuration = i === numSessions ? 0 : (isLongBreak ? selectedMethod.longBreakMins : selectedMethod.shortBreakMins);
      totalBreakMins += breakDuration;

      const formatTime = (mins: number) => {
        let norm = mins % (24 * 60);
        const h24 = Math.floor(norm / 60);
        const m = norm % 60;
        const period = h24 >= 12 ? 'PM' : 'AM';
        const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
        return `${h12}:${m < 10 ? '0' : ''}${m} ${period}`;
      };

      sessionsList.push({
        sessionNumber: i,
        timeWindow: `${formatTime(sessionStart)} - ${formatTime(sessionEnd)}`,
        breakWindow: breakDuration > 0 ? `${breakDuration} min ${isLongBreak ? 'Long Break' : 'Rest'}` : 'Complete',
        breakMins: breakDuration,
      });

      currentMins += breakDuration;
    }

    const finishMins = currentMins;
    const finishH24 = Math.floor((finishMins % (24 * 60)) / 60);
    const finishM = finishMins % 60;
    const finishPeriod = finishH24 >= 12 ? 'PM' : 'AM';
    const finishH12 = finishH24 % 12 === 0 ? 12 : finishH24 % 12;
    const finishTimeFormatted = `${finishH12}:${finishM < 10 ? '0' : ''}${finishM} ${finishPeriod}`;

    return {
      numSessions,
      totalActualFocusMins,
      totalBreakMins,
      totalElapsedMins: totalActualFocusMins + totalBreakMins,
      finishTimeFormatted,
      sessionsList,
    };
  }, [targetWorkHours, startTime, selectedMethod]);

  const toggleCheck = (idx: number) => {
    setCheckedSessions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopy = () => {
    const text = [
      `⏱️ DEEP WORK FOCUS PLAN (${selectedMethod.name.toUpperCase()})`,
      `🎯 Target Focus: ${targetWorkHours} Hours | Start Time: ${startTime}`,
      `🏁 Estimated Finish Time: ${calculation.finishTimeFormatted}`,
      `📊 Pure Focus: ${Math.floor(calculation.totalActualFocusMins / 60)}h ${calculation.totalActualFocusMins % 60}m | Total Rest: ${calculation.totalBreakMins} mins`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...calculation.sessionsList.map(
        (s) => `[Session ${s.sessionNumber}] ${s.timeWindow} → Break: ${s.breakWindow}`
      ),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Calculated with PlanBot Focus Tool: https://planbotai.app/tools/pomodoro-focus-calculator`,
    ].join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <main className="pt-28 pb-20 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-text-dim mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <span>/</span>
        <span className="text-purple-400 font-medium">Pomodoro &amp; Focus Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300 mb-3 inline-block">
          ⚡ Deep Work Sprint Architect
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Pomodoro &amp; Deep Work <span className="text-gradient">Focus Calculator</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Structure high-intensity cognitive focus sprints, prevent mental fatigue, and project your exact workday finish time.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-6 h-fit">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span> Focus Settings
          </h2>

          {/* Focus Method */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              Focus Cadence
            </label>
            <div className="space-y-2">
              {Object.entries(METHODS).map(([key, method]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMethodKey(key)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    methodKey === key
                      ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                      : 'bg-surface/40 border-glass-border text-text-secondary hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white mb-0.5">{method.name}</div>
                  <div className="text-xs text-text-dim">{method.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Target Work Hours */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                Desired Pure Focus Hours
              </label>
              <span className="text-sm font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-500/20">
                {targetWorkHours} Hours
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={10}
              step={1}
              value={targetWorkHours}
              onChange={(e) => setTargetWorkHours(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-dim mt-1">
              <span>2 hrs (Quick Sprint)</span>
              <span>6 hrs (Standard Workday)</span>
              <span>10 hrs (Heavy Day)</span>
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">
              Workday Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-surface/60 border border-glass-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary w-full !py-3 text-sm flex items-center justify-center gap-2"
            >
              {copied ? '✅ Focus Plan Copied!' : '📋 Copy Focus Schedule'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-glass-border bg-surface/30 text-text-secondary hover:text-white hover:border-white/30 text-xs font-medium transition-colors text-center"
            >
              🖨️ Print / Save PDF
            </button>
          </div>
        </div>

        {/* Output Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-300">
                {calculation.numSessions}
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Focus Sprints
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {calculation.totalBreakMins}m
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Rest &amp; Recharges
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-emerald-400">
                {calculation.finishTimeFormatted}
              </div>
              <p className="text-[10px] md:text-xs text-text-dim uppercase tracking-wider mt-1">
                Projected Finish
              </p>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                📋 Interactive Session Roadmap
              </h3>
              <span className="text-xs text-text-dim">Check off as you complete</span>
            </div>

            <div className="space-y-3">
              {calculation.sessionsList.map((s) => {
                const isDone = !!checkedSessions[s.sessionNumber];
                return (
                  <div
                    key={s.sessionNumber}
                    onClick={() => toggleCheck(s.sessionNumber)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isDone
                        ? 'bg-purple-900/20 border-purple-500/50 opacity-60'
                        : 'bg-surface/50 border-glass-border hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                        isDone ? 'bg-purple-500 border-purple-500 text-white' : 'border-glass-border bg-surface/80'
                      }`}>
                        {isDone && '✓'}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isDone ? 'line-through text-text-dim' : 'text-white'}`}>
                          Sprint #{s.sessionNumber} ({selectedMethod.focusMins} mins)
                        </div>
                        <div className="text-xs text-text-dim">{s.timeWindow}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface/80 text-text-secondary border border-glass-border">
                        {s.breakWindow}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PlanBot Conversion */}
      <section className="glass-card p-8 md:p-12 border-primary/40 bg-gradient-to-r from-primary/10 via-surface/40 to-accent/10 mb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent mb-3 inline-block">
              🔥 Master Your Focus State
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Automate your daily sprints with AI on Android
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              PlanBot AI schedules focus blocks directly into your daily timeline, detects burnout signals, and gives you deep analytics on your peak productivity hours.
            </p>
          </div>
          <PlayStoreLink 
            location="pomodoro_calculator"
            className="btn-primary whitespace-nowrap text-sm !px-6 !py-3.5 flex items-center gap-2"
          >
            Track Focus Streaks on Android →
          </PlayStoreLink>
        </div>
      </section>

      {/* SEO Article & FAQ (600+ words) */}
      <article className="prose prose-invert max-w-4xl mx-auto space-y-6 text-text-secondary leading-relaxed pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Beyond the Basic Pomodoro: The Neuroscience of Ultradian Rhythms
        </h2>
        <p>
          While the traditional 25-minute Pomodoro technique popularized by Francesco Cirillo in the late 1980s is an excellent tool for overcoming initial procrastination and tackling administrative tasks, cognitive science has evolved. Modern neuroscience reveals that the human brain operates on biological cycles known as Ultradian Rhythms. These are roughly 90 to 120-minute cycles during which we move from states of high alertness to states of physiological fatigue.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Why 25 Minutes Isn&apos;t Always Enough</h3>
        <p>
          If your work involves complex problem-solving, writing code, studying advanced physics, or creative writing, a 25-minute block is often too short. It typically takes the human brain between 10 to 15 minutes just to load context into working memory and achieve a state of flow. By the time you are deeply immersed, the 25-minute timer rings, forcefully ejecting you from the optimal cognitive state. This is why many high performers feel frustrated by standard Pomodoro apps.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">The 90/20 Ultradian Sprint</h3>
        <p>
          The 90/20 framework aligns perfectly with your natural biology. You dedicate 90 minutes to uninterrupted, deep focus. At the end of this sprint, your brain has depleted a significant amount of its glucose and oxygen reserves. The subsequent 20-minute break is not a luxury; it is a biological necessity. During this break, your brain consolidates new neural pathways and clears metabolic waste.
        </p>
        <p>
          Crucially, what you do during this 20-minute break matters. Scrolling through social media or reading news articles consumes the same cognitive bandwidth that you are trying to replenish. A true Ultradian break involves stepping away from screens entirely.
        </p>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">Is 25 minutes (Pomodoro) the best focus time?</h4>
              <p className="mt-2 text-sm">
                The 25/5 Pomodoro method is great for beginners and for highly repetitive tasks. However, for deep cognitive work like coding, writing, or studying complex math, a 50/10 or 90/20 Ultradian sprint allows your brain to enter a state of deep flow.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">How long should a deep work sprint be?</h4>
              <p className="mt-2 text-sm">
                A deep work sprint should typically be 50 to 90 minutes. Neurobiology shows that the human brain operates on 90-minute Ultradian rhythms. After 90 minutes of intense focus, a 20-30 minute active rest period is required to consolidate learning.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white aeo-answer">What should I do during a Pomodoro break?</h4>
              <p className="mt-2 text-sm">
                True rest requires disconnecting from high-dopamine activities. Step away from your desk, stretch, drink water, or stare at something in the distance. Do not check social media, read emails, or watch short-form videos.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
