'use client';

const ROW1 = [
  'AI Plan Generation 🤖',
  'Streak Freeze ❄️',
  'Weekly Progress Report 📊',
  'God Trial Free 🎁',
  'Upload Photo (God Only) 📸',
  'Advanced AI Engine 🤖',
  'Gamification XP 🎮',
  'Goal Personas 🎯',
  'No Ads for Paid Users 🚫',
  'Referral Rewards 🎉',
  'Study Timer ⏱️',
  'Flashcards 🃏',
];

const ROW2 = [
  'Smart Task Breakdown',
  'AI Chat Interface',
  'Calendar Sync',
  'Focus Timer',
  'Progress Analytics',
  'Habit Tracking',
  'Priority Engine',
  'Natural Language Input',
  'Smart Reminders',
  'Goal Templates',
  'Time Blocking',
  'Energy Mapping',
];

function MarqueeRow({ items, reverse = false, accent = false }: { items: string[]; reverse?: boolean; accent?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden mb-4 group">
      <div
        className={`flex gap-4 shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationPlayState: 'running' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`shrink-0 px-5 py-2.5 rounded-full border text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
              accent
                ? 'border-pink-accent/30 bg-pink-accent/5 text-pink-accent/80'
                : 'border-accent/30 bg-accent/5 text-accent/80'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeatureTicker() {
  return (
    <section className="relative py-12 bg-deep-space/60 overflow-hidden" aria-label="Feature highlights">
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse accent />
    </section>
  );
}
