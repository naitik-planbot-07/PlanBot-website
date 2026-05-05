const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  yearlyPrice?: string;
}

export default function PricingCard({
  tier,
  price,
  period = '/mo',
  features,
  highlighted = false,
  badge,
  yearlyPrice,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-glass-lg p-6 md:p-8 flex flex-col transition-all duration-300 ${
        highlighted
          ? 'bg-glass-bg border-2 border-accent/40 shadow-[0_0_40px_rgba(0,198,255,0.15)]'
          : 'glass-card'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-accent">
          {badge}
        </span>
      )}

      <h3 className="text-xl font-bold text-white mb-1">{tier}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl md:text-4xl font-bold text-gradient">{price}</span>
        {price !== 'Free' && <span className="text-sm text-text-secondary">{period}</span>}
      </div>
      {yearlyPrice && (
        <p className="text-xs text-accent mb-4">or {yearlyPrice}/yr — Save ~30%</p>
      )}
      {!yearlyPrice && <div className="mb-4" />}

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="text-accent mt-0.5 shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          highlighted
            ? 'btn-primary'
            : 'btn-secondary'
        }`}
      >
        {price === 'Free' ? 'Download Free' : 'Get ' + tier} →
      </a>
    </div>
  );
}
