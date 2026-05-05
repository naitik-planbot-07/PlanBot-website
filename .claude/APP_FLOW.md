# App Flow

## Site Structure (Next.js App Router)

### Pages
1. **`/` (Homepage)** — Full marketing landing page
   - Hero section with SmokeBackground WebGL effect + gradient CTAs
   - App notice banner (clarifying this is a website, not the app)
   - Feature ticker (CSS marquee, 2 rows)
   - "How It Works" 3-step explainer
   - Features grid (6 cards, glassmorphism)
   - Pricing preview (4-tier cards: Free/Pro/Elite/God)
   - Blog preview (latest 3 posts)
   - Final CTA section

2. **`/features`** — Detailed feature breakdowns + comparison table
3. **`/pricing`** — Full pricing page with boost packs + FAQ (JSON-LD)
4. **`/about`** — Mission, tech stack, company info
5. **`/contact`** — Email (mailto link), in-app support info
6. **`/blog`** — Blog index listing all MDX posts
7. **`/blog/[slug]`** — Individual blog post (MDX rendered)

### SEO Routes
- `/sitemap.xml` — Auto-generated from static pages + blog slugs
- `/robots.txt` — Allows all crawlers, links to sitemap

### Legal Redirects (next.config.js)
- `/privacy-policy` → External GitHub Pages
- `/terms` → External GitHub Pages
- `/refund-policy` → External GitHub Pages

## Shared Layout (`layout.tsx`)
- Sticky glassmorphic `Nav` (desktop links + mobile hamburger)
- `DownloadBanner` (mobile-only persistent bottom bar)
- `Footer` (4-column: Product/Company/Legal/Social — WhatsApp Channel + Instagram)

## User Flow
1. User lands on `/` → sees SmokeBackground + hero + CTA → clicks "Download App" → goes to Play Store
2. User explores `/features` or `/pricing` → decides tier → clicks CTA → Play Store
3. User discovers site via SEO → reads `/blog/[slug]` → sees CTA → downloads app
4. All pages reinforce: "This is a website. Download the app."
