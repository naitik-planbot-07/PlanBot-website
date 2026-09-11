'use client';

import { useState, useEffect, useMemo } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { rtdb } from '@/lib/firebase';

/**
 * PlanBot Live Poll Component
 * Interactive, client-side poll widget with localStorage persistence and RTDB live sync.
 * Used across blog articles and feature pages to gauge user sentiment on AI models,
 * features, and community decisions.
 * Designed with PlanBot's #0A0E23 space-blue and neon glassmorphism aesthetic.
 */

export interface PollOption {
  label: string;
  initialVotes?: number;
}

interface LivePollProps {
  pollId: string;
  question: string;
  subtitle?: string;
  options?: PollOption[] | string[];
  opt1?: string;
  opt2?: string;
  badge?: string;
}

export default function LivePoll({
  pollId,
  question,
  subtitle = 'Cast your vote to shape PlanBot development and see instant community results.',
  options,
  opt1,
  opt2,
  badge = 'Live Community Poll',
}: LivePollProps) {
  // Normalize options into structured objects with useMemo
  const parsedOptions: PollOption[] = useMemo(() => {
    let effectiveOptions = options;
    if (!effectiveOptions && opt1 && opt2) {
      effectiveOptions = [opt1, opt2];
    }
    if (!effectiveOptions) {
      effectiveOptions = [
        'Yes — Integrate this feature',
        'No — Keep current architecture',
      ];
    }
    
    return effectiveOptions.map((opt) => {
      if (typeof opt === 'string') {
        return { label: opt, initialVotes: 0 };
      }
      return {
        label: opt.label,
        initialVotes: opt.initialVotes ?? 0,
      };
    });
  }, [options, opt1, opt2]);

  const [hasVoted, setHasVoted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  // Base votes (initialized from props)
  const baseVotes = useMemo(() => parsedOptions.map((o) => o.initialVotes ?? 0), [parsedOptions]);
  
  // Real votes from Firebase (will be added to baseVotes)
  const [realVotes, setRealVotes] = useState<number[]>(() => new Array(parsedOptions.length).fill(0));
  const [copied, setCopied] = useState(false);

  // Load vote state from localStorage on client mount
  useEffect(() => {
    try {
      const savedVote = localStorage.getItem(`planbot_poll_${pollId}`);
      if (savedVote !== null) {
        const idx = parseInt(savedVote, 10);
        if (!isNaN(idx) && idx >= 0 && idx < parsedOptions.length) {
          setSelectedIdx(idx);
          setHasVoted(true);
        }
      }
    } catch {
      // Graceful fallback if localStorage is disabled or restricted
    }
  }, [pollId, parsedOptions.length]);

  // Subscribe to RTDB for live votes
  useEffect(() => {
    const pollRef = ref(rtdb, `website_polls/${pollId}`);
    
    const unsubscribe = onValue(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const updatedRealVotes = parsedOptions.map((_, idx) => data[`votes_${idx}`] || 0);
        setRealVotes(updatedRealVotes);
      }
    }, (error) => {
      console.error("RTDB subscription error:", error);
    });

    return () => unsubscribe();
  }, [pollId, parsedOptions.length]);

  const handleVote = async (idx: number) => {
    if (hasVoted) return;

    setSelectedIdx(idx);
    setHasVoted(true);

    try {
      localStorage.setItem(`planbot_poll_${pollId}`, idx.toString());
    } catch {
      // Ignore storage error
    }
    
    // Update RTDB
    try {
      const voteRef = ref(rtdb, `website_polls/${pollId}/votes_${idx}`);
      await runTransaction(voteRef, (currentVotes) => {
        return (currentVotes || 0) + 1;
      });
      
      // Optimistically update local realVotes state
      setRealVotes((prev) => {
        const next = [...prev];
        next[idx] += 1;
        return next;
      });
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  // Combine base + real votes
  const currentVotes = baseVotes.map((base, idx) => base + (realVotes[idx] || 0));
  const totalVotes = currentVotes.reduce((acc, curr) => acc + curr, 0);

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/15 via-surface/60 to-surface/40 border border-primary/40 shadow-xl shadow-primary/10 relative overflow-hidden not-prose">
      {/* Glow orb background accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-accent border border-primary/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {badge}
        </span>
        <span className="text-xs font-medium text-text-dim">
          {totalVotes.toLocaleString()} votes cast
        </span>
      </div>

      {/* Question & Subtitle */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug relative z-10">
        {question}
      </h3>
      {subtitle && (
        <p className="text-sm text-text-secondary mb-6 leading-relaxed relative z-10">
          {subtitle}
        </p>
      )}

      {/* Options List */}
      <div className="space-y-3 relative z-10 mb-6">
        {parsedOptions.map((option, idx) => {
          const voteCount = currentVotes[idx] || 0;
          const percentage = getPercentage(voteCount);
          const isSelected = selectedIdx === idx;

          if (!hasVoted) {
            return (
              <button
                key={idx}
                onClick={() => handleVote(idx)}
                type="button"
                className="w-full text-left p-4 rounded-xl bg-surface/80 border border-glass-border hover:border-accent hover:bg-surface/95 text-white transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-accent group-hover:bg-primary/30 group-hover:border-accent transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-semibold text-sm md:text-base group-hover:text-accent transition-colors">
                    {option.label}
                  </span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-primary/20 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Vote →
                </span>
              </button>
            );
          }

          // Result view after user has voted
          return (
            <div
              key={idx}
              className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-primary/20 border-accent shadow-md shadow-accent/20'
                  : 'bg-surface/60 border-glass-border'
              }`}
            >
              {/* Progress bar background fill */}
              <div
                className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ease-out rounded-xl ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary/40 to-accent/40'
                    : 'bg-white/10'
                }`}
                style={{ width: `${percentage}%` }}
              />

              {/* Content overlay */}
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {isSelected && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[#0A0E23] text-xs font-bold shrink-0">
                      ✓
                    </span>
                  )}
                  <span className={`text-sm md:text-base font-semibold ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 shrink-0">
                      Your Vote
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-text-dim hidden sm:inline">
                    {voteCount.toLocaleString()} votes
                  </span>
                  <span className={`text-sm md:text-base font-bold ${isSelected ? 'text-accent' : 'text-white'}`}>
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post-Vote Conversion Banner (CRO Optimization) */}
      {hasVoted && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/25 via-accent/15 to-surface/60 border border-accent/40 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 shadow-lg shadow-primary/10">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
              ⚡ Thank you for voting!
            </span>
            <p className="text-xs md:text-sm font-semibold text-white mt-0.5">
              See how PlanBot&apos;s current AI engine plans your day — Download Free on Android.
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=cpm.planbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs !py-2.5 !px-4 shrink-0 whitespace-nowrap shadow-md shadow-accent/20"
          >
            Get PlanBot Free →
          </a>
        </div>
      )}

      {/* Footer controls & Share */}
      <div className="pt-4 border-t border-glass-border flex flex-wrap items-center justify-between gap-3 text-xs text-text-dim relative z-10">
        <div className="flex items-center gap-2">
          <span>🌍 Live global results</span>
          <span>•</span>
          <span>Anonymous vote</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            type="button"
            className="hover:text-accent transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10"
          >
            {copied ? '✓ Copied Link' : '🔗 Share Poll'}
          </button>
        </div>
      </div>
    </div>
  );
}
