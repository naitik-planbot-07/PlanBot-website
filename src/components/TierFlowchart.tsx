'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * TierFlowchart Component
 * Renders the interactive 4-tier upgrade roadmap and analytics progression flow (Free -> Pro -> Elite -> God)
 * based on the PlanBot tier specification flowchart.
 *
 * Rationale:
 * - Visually communicates the feature & analytics unlocks at each upgrade step (₹99 -> ₹129 -> ₹249).
 * - Implements responsive layout: horizontal pipeline on desktop (lg+), vertical progression on mobile/tablet.
 * - Adheres to PlanBot brand styling (space blue #0A0E23, neon cyan #00C6FF, electric blue #1E90FF, gold #F59E0B).
 */

interface TierItem {
  id: string;
  name: string;
  price: string;
  upgradePrice?: string;
  badge?: string;
  popular?: boolean;
  accentColor: string;
  borderColor: string;
  glowClass: string;
  bulletColor: string;
  features: {
    text: string;
    isHighlight?: boolean;
    isLocked?: boolean;
    isUnlocked?: boolean;
    subtext?: string;
  }[];
}

const TIER_FLOW_DATA: TierItem[] = [
  {
    id: 'free',
    name: 'Free Tier',
    price: '₹0',
    accentColor: '#94A3B8',
    borderColor: 'border-slate-700/60',
    glowClass: 'hover:shadow-[0_0_25px_rgba(148,163,184,0.15)]',
    bulletColor: 'bg-slate-500',
    features: [
      { text: '3 plans history' },
      { text: "Today's focus time" },
      { text: 'Basic ring (Overall %)', subtext: '+ Level/XP tracking' },
      { text: 'Locked graphs', isLocked: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro Tier',
    price: '₹99',
    upgradePrice: 'Upgrade ₹99',
    accentColor: '#1E90FF',
    borderColor: 'border-[#1E90FF]/50',
    glowClass: 'hover:shadow-[0_0_30px_rgba(30,144,255,0.25)]',
    bulletColor: 'bg-[#1E90FF]',
    features: [
      { text: '15 plans history', isHighlight: true },
      { text: 'Week focus time' },
      { text: 'Week-over-week trend ↑↓' },
      { text: '1 Active Goal' },
      { text: 'Unlocked 7-Day Trend', isUnlocked: true },
    ],
  },
  {
    id: 'elite',
    name: 'Elite Tier',
    price: '₹129',
    upgradePrice: 'Upgrade ₹129',
    badge: 'MOST POPULAR',
    popular: true,
    accentColor: '#00C6FF',
    borderColor: 'border-[#00C6FF]/60',
    glowClass: 'shadow-[0_0_30px_rgba(0,198,255,0.2)] hover:shadow-[0_0_40px_rgba(0,198,255,0.35)]',
    bulletColor: 'bg-[#00C6FF]',
    features: [
      { text: '30 plans history', isHighlight: true },
      { text: 'Month focus time' },
      { text: '30-Day Rolling Stats' },
      { text: '3 Active Goals' },
      { text: 'Subject Breakdown' },
      { text: 'Productivity Score v2', isHighlight: true },
      { text: 'Unlocked Heatmap Calendar', isUnlocked: true },
    ],
  },
  {
    id: 'god',
    name: 'God Tier',
    price: '₹249',
    upgradePrice: 'Upgrade ₹249',
    badge: 'MOST POWERFUL',
    accentColor: '#F59E0B',
    borderColor: 'border-[#F59E0B]/70',
    glowClass: 'shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_rgba(245,158,11,0.35)]',
    bulletColor: 'bg-[#F59E0B]',
    features: [
      { text: '100 plans (All-Time)', isHighlight: true },
      { text: 'Peak Study Time (Diurnal)' },
      { text: 'Peer Benchmark (Top X%)' },
      { text: 'Unlimited Active Goals', isHighlight: true },
      { text: 'Study Pattern AI', isHighlight: true },
      { text: 'AI Weekly Insights' },
      { text: 'CSV Data Export' },
    ],
  },
];

export default function TierFlowchart() {
  const [selectedTier, setSelectedTier] = useState<string>('elite');

  return (
    <section className="py-12 md:py-16" aria-label="PlanBot Tier Progression and Analytics Roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <span>⚡ Feature & Analytics Unlock Roadmap</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Tier Progression &amp; <span className="text-gradient">Upgrade Flow</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            See exactly how each tier level unlocks greater planning history, deep study analytics, goal limits, and autonomous AI intelligence.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW: Horizontal Connected Flowchart (lg and above) */}
        {/* ============================================================ */}
        <div className="hidden lg:flex items-stretch justify-center gap-3 relative pb-6">
          {TIER_FLOW_DATA.map((tier, idx) => {
            const isSelected = selectedTier === tier.id;

            return (
              <div key={tier.id} className="flex items-center flex-1 max-w-[310px]">
                
                {/* Tier Card */}
                <div
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full h-full flex flex-col justify-between relative rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer border ${tier.borderColor} ${tier.glowClass} ${
                    isSelected
                      ? 'bg-surface/90 scale-[1.02] ring-2 ring-accent/50'
                      : 'bg-surface/50 hover:bg-surface/70'
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase text-white shadow-md bg-gradient-to-r from-primary to-accent whitespace-nowrap z-10">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-glass-border mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                          {tier.id === 'free' && '🆓'}
                          {tier.id === 'pro' && '💎'}
                          {tier.id === 'elite' && '⚡'}
                          {tier.id === 'god' && '👑'}
                          <span>{tier.name}</span>
                        </h3>
                        <p className="text-xs text-text-dim mt-0.5">
                          {tier.id === 'free' ? 'Forever Free' : `${tier.price}/month`}
                        </p>
                      </div>
                      <span
                        className="text-lg font-bold text-gradient"
                      >
                        {tier.price}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6 text-left">
                      {tier.features.map((f, fIdx) => (
                        <li key={fIdx} className="text-xs leading-snug flex items-start gap-2">
                          {f.isLocked ? (
                            <span className="text-red-400 font-bold shrink-0">🔒</span>
                          ) : f.isUnlocked ? (
                            <span className="text-accent font-bold shrink-0">🔓</span>
                          ) : (
                            <span className={`w-1.5 h-1.5 rounded-full ${tier.bulletColor} mt-1.5 shrink-0`} />
                          )}
                          <span
                            className={`${
                              f.isLocked
                                ? 'text-text-dim line-through'
                                : f.isUnlocked
                                ? 'text-accent font-semibold'
                                : f.isHighlight
                                ? 'text-white font-semibold'
                                : 'text-text-secondary'
                            }`}
                          >
                            {f.text}
                            {f.subtext && (
                              <span className="block text-[11px] text-text-dim font-normal mt-0.5">
                                {f.subtext}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom / Action */}
                  <div className="pt-3 border-t border-glass-border/40 text-center">
                    <span className="text-[11px] font-medium text-text-dim hover:text-accent transition-colors">
                      {tier.id === 'free' ? 'Default Starter Tier' : `Included in ${tier.name}`}
                    </span>
                  </div>
                </div>

                {/* Arrow Connector Between Cards */}
                {idx < TIER_FLOW_DATA.length - 1 && (
                  <div className="flex flex-col items-center justify-center px-1 shrink-0 z-10">
                    {/* Upgrade Price Pill */}
                    <div className="px-2 py-1 rounded-md bg-[#121C4A] border border-primary/40 text-[10px] font-bold text-accent shadow-sm whitespace-nowrap mb-1">
                      {TIER_FLOW_DATA[idx + 1].upgradePrice}
                    </div>
                    {/* Directional Glow Arrow */}
                    <div className="flex items-center text-accent">
                      <div className="w-4 h-0.5 bg-gradient-to-r from-primary to-accent" />
                      <svg className="w-3.5 h-3.5 -ml-1 text-accent animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET VIEW: Vertical Upgrade Pipeline Flow */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col items-center max-w-md mx-auto space-y-4">
          {TIER_FLOW_DATA.map((tier, idx) => {
            return (
              <div key={tier.id} className="w-full flex flex-col items-center">
                
                {/* Upgrade connector pill above card (except first) */}
                {idx > 0 && (
                  <div className="flex flex-col items-center my-3">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-primary to-accent" />
                    <div className="px-3 py-1 rounded-full bg-[#121C4A] border border-accent/40 text-xs font-bold text-accent shadow-[0_0_15px_rgba(0,198,255,0.2)]">
                      {tier.upgradePrice}
                    </div>
                    <div className="w-0.5 h-4 bg-gradient-to-b from-accent to-primary" />
                    <svg className="w-4 h-4 text-accent animate-bounce -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}

                {/* Vertical Card */}
                <div
                  className={`w-full relative rounded-2xl p-5 md:p-6 border ${tier.borderColor} bg-surface/60 backdrop-blur-md ${tier.glowClass}`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase text-white shadow-md bg-gradient-to-r from-primary to-accent z-10">
                      {tier.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-glass-border mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {tier.id === 'free' && '🆓'}
                        {tier.id === 'pro' && '💎'}
                        {tier.id === 'elite' && '⚡'}
                        {tier.id === 'god' && '👑'}
                        <span>{tier.name}</span>
                      </h3>
                      <p className="text-xs text-text-dim">
                        {tier.id === 'free' ? 'Forever Free' : `${tier.price}/mo`}
                      </p>
                    </div>
                    <span className="text-xl font-bold text-gradient">{tier.price}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 text-left">
                    {tier.features.map((f, fIdx) => (
                      <li key={fIdx} className="text-xs flex items-start gap-2">
                        {f.isLocked ? (
                          <span className="text-red-400 font-bold shrink-0">🔒</span>
                        ) : f.isUnlocked ? (
                          <span className="text-accent font-bold shrink-0">🔓</span>
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full ${tier.bulletColor} mt-1.5 shrink-0`} />
                        )}
                        <span
                          className={`${
                            f.isLocked
                              ? 'text-text-dim line-through'
                              : f.isUnlocked
                              ? 'text-accent font-semibold'
                              : f.isHighlight
                              ? 'text-white font-semibold'
                              : 'text-text-secondary'
                          }`}
                        >
                          {f.text}
                          {f.subtext && (
                            <span className="block text-[11px] text-text-dim mt-0.5">
                              {f.subtext}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vector Asset Quick Links */}
        <div className="mt-10 pt-6 border-t border-glass-border/40 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
          <span className="text-text-dim">💾 View full diagram:</span>
          <a
            href="/images/tier-flowchart-horizontal.svg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/80 border border-glass-border hover:border-accent text-accent transition-colors font-medium"
          >
            <span>🖥️ Horizontal Flow (SVG)</span>
          </a>
          <a
            href="/images/tier-flowchart-vertical.svg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/80 border border-glass-border hover:border-accent text-accent transition-colors font-medium"
          >
            <span>📱 Vertical Flow (SVG)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
