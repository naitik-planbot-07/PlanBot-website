import Link from 'next/link';
import Image from 'next/image';
import PlayStoreLink from '@/components/PlayStoreLink';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

const footerLinks = {
  product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/tools', label: 'Free Tools' },
    { href: '/compare', label: 'Compare' },
    { href: '/use-cases', label: 'Use Cases' },
    { href: PLAY_STORE_URL, label: 'Download App', external: true },
  ],
  tools: [
    { href: '/tools/daily-schedule-generator', label: 'Daily Schedule Generator' },
    { href: '/tools/exam-revision-calculator', label: 'Exam Revision Calculator' },
    { href: '/tools/pomodoro-focus-calculator', label: 'Pomodoro Calculator' },
    { href: '/tools/weather-forecast', label: 'Weather Forecast & Planner' },
    { href: '/use-cases/ai-planner-for-students-exams', label: 'JEE / NEET Prep' },
    { href: '/use-cases/ai-planner-for-adhd-focus', label: 'ADHD Focus Planner' },
  ],
  compare: [
    { href: '/compare/planbot-vs-motion', label: 'PlanBot vs Motion' },
    { href: '/compare/planbot-vs-notion', label: 'PlanBot vs Notion' },
    { href: '/compare/planbot-vs-todoist', label: 'PlanBot vs Todoist' },
    { href: '/compare/planbot-vs-google-calendar', label: 'PlanBot vs G-Cal' },
    { href: '/compare/planbot-vs-ticktick', label: 'PlanBot vs TickTick' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/author/naitik-baldaniya', label: 'Founder Bio' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund-policy', label: 'Refund Policy' },
    { href: '/account-deletion', label: 'Account Deletion' },
  ],
  social: [
    { href: 'https://whatsapp.com/channel/0029Vb7U0vR8aKvH1quo1f3G', label: 'WhatsApp', external: true },
    { href: 'https://www.instagram.com/planbotai?igsh=bXplYm92dG13c3Jq', label: 'Instagram', external: true },
    { href: 'https://x.com/planbotai', label: 'X (Twitter)', external: true },
    { href: 'https://youtube.com/@planbotai', label: 'YouTube', external: true },
  ],
};

function FooterSection({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-deep-space/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                <Image 
                  src="/logo.jpeg" 
                  alt="PlanBot Logo" 
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">PlanBot</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              AI-powered daily planner for ambitious people. Your goal, your plan.
            </p>
            <div className="mt-4 text-xs text-text-dim space-y-1">
              <p>📍 Kutch, Gujarat, India</p>
              <p>✉️ <a href="mailto:plannexttech@gmail.com" className="hover:text-accent">plannexttech@gmail.com</a></p>
            </div>
          </div>

          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Free Tools" links={footerLinks.tools} />
          <FooterSection title="Compare" links={footerLinks.compare} />
          <FooterSection title="Company" links={footerLinks.company} />
          <FooterSection title="Legal" links={footerLinks.legal} />
        </div>

        {/* Bottom */}
        <div className="border-t border-glass-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © 2026 PlanBot — PlannextTech. Made with ❤️ in India
          </p>
          <p className="text-xs text-text-dim text-center md:text-right">
            PlanBot is an Android app. Download from{' '}
            <PlayStoreLink location="footer" className="text-accent hover:underline">

              Google Play
            
</PlayStoreLink>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
