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
   - FAQ section with FAQPage schema
   - Final CTA section
   - E-E-A-T credibility footer

2. **`/features`** — Detailed feature breakdowns + comparison table
3. **`/pricing`** — Full pricing page with boost packs + FAQ (JSON-LD)
4. **`/about`** — Mission, tech stack, founder bio (with E-E-A-T microdata)
5. **`/contact`** — Email (mailto link), in-app support info
6. **`/blog`** — Blog index listing all MDX posts (28 posts)
7. **`/blog/[slug]`** — Individual blog post (MDX rendered, with author bio + CTA)

### SEO Routes
- `/sitemap.xml` — Auto-generated from static pages + blog slugs (Next.js Metadata API)
- `/robots.txt` — Allows all crawlers + 14 explicit AI bot rules, links to sitemap

### AI/LLM Routes
- `/llms.txt` — LLM-readable site summary (features, org, pricing, URLs)
- `/llm.txt` — Kimi-variant copy of llms.txt
- `/llms-full.txt` — Full blog content (top 15 posts, ~54 KB) for deep AI ingestion

### Legal Redirects (firebase.json)
- `/privacy-policy` → External GitHub Pages
- `/terms` → External GitHub Pages
- `/refund-policy` → External GitHub Pages

## Shared Layout (`layout.tsx`)
- Sticky glassmorphic `Nav` (desktop links + mobile hamburger)
- `DownloadBanner` (mobile-only persistent bottom bar)
- `Footer` (4-column: Product/Company/Legal/Social — WhatsApp Channel + Instagram)
- Google Analytics 4 tracking (needs real GA4 Measurement ID)
- Site-wide JSON-LD: WebSite, Organization, MobileApp schemas

## Canonical Domain
- **All metadata, structured data, sitemap, and robots use:** `https://planbotai.app`
- Previous references to `planbot-n07.web.app` have been fully replaced

## User Flow
1. User lands on `/` → sees SmokeBackground + hero + CTA → clicks "Download App" → goes to Play Store
2. User explores `/features` or `/pricing` → decides tier → clicks CTA → Play Store
3. User discovers site via SEO → reads `/blog/[slug]` → sees CTA → downloads app
4. All pages reinforce: "This is a website. Download the app."
