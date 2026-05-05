import Link from 'next/link';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

const footerLinks = {
  product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: PLAY_STORE_URL, label: 'Download', external: true },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund-policy', label: 'Refund Policy' },
  ],
  social: [
    { href: 'https://whatsapp.com/channel/0029Vb7U0vR8aKvH1quo1f3G', label: 'WhatsApp', external: true },
    { href: 'https://www.instagram.com/planbotai?igsh=MWwyMjJtNGo2NHEzZQ==', label: 'Instagram', external: true },
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-gradient">
              PlanBot
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              AI-powered daily planner for ambitious people. Your goal, your plan.
            </p>
          </div>

          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Company" links={footerLinks.company} />
          <FooterSection title="Legal" links={footerLinks.legal} />
          <FooterSection title="Social" links={footerLinks.social} />
        </div>

        {/* Bottom */}
        <div className="border-t border-glass-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © 2026 PlanBot — PlannextTech. Made with ❤️ in India
          </p>
          <p className="text-xs text-text-dim text-center md:text-right">
            PlanBot is an Android app. Download from{' '}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google Play
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
