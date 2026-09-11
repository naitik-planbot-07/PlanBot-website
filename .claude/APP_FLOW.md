# App Flow

## Site Structure (Next.js App Router)

### Pages
1. **`/` (Homepage)** — Full marketing landing page
   - Hero section with SmokeBackground WebGL effect + gradient CTAs
   - App notice banner (clarifying this is a website, not the app)
   - Feature ticker (CSS marquee, 2 rows)
   - "How It Works" 3-step explainer
   - Features grid (6 cards, glassmorphism)
   - Pricing preview (4-tier cards: Free/Pro/Elite/God + link to interactive Roadmap)
   - Blog preview (latest 3 posts)
   - FAQ section with FAQPage schema
   - Final CTA section
   - E-E-A-T credibility footer

2. **`/features`** — Detailed feature breakdowns + interactive Tier Progression Flowchart + comparison table
3. **`/pricing`** — Full pricing page with interactive Tier Progression & Analytics Unlock Flowchart + 4-tier cards + boost packs + FAQ (JSON-LD)
4. **`/about`** — Mission, tech stack, founder bio (with E-E-A-T microdata)
5. **`/contact`** — Email (mailto link), in-app support info
6. **`/blog`** — Blog index listing all MDX posts (62 posts) <!-- Fix (Sept 2026): Updated blog post count to 62 with GPT-6 Astra, Gemini vs Claude poll, YouTube/Insta focus, and ChatGPT planning posts -->
7. **`/blog/[slug]`** — Individual blog post (MDX rendered, with author bio + CTA)

### SEO Routes
- `/sitemap.xml` — Auto-generated from 23 static pages + 62 blog slugs (85 URLs total) with live dynamic Date timestamps and priority boosting for trending keywords. *Fix (August-September 2026): Thin legal pages (privacy, terms, refund, account-deletion) are intentionally excluded from the sitemap to conserve crawl budget.*
- `/robots.txt` — Allows all crawlers + 14 explicit AI bot rules, links to sitemap. *Fix (August 2026): Disallows `/*.txt` to prevent crawling of RSC payloads, with explicit allow for app-ads.txt and ads.txt.*

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
- Google Analytics 4 tracking (`G-0Y5H7R0D6Z`) & Microsoft Clarity (`x7grrxn17q`) session recording/heatmaps
- Site-wide JSON-LD: WebSite, Organization, MobileApp schemas

## Canonical Domain
- **All metadata, structured data, sitemap, and robots use:** `https://planbotai.app`
- Previous references to `planbot-n07.web.app` have been fully replaced

## User Flow
1. User lands on `/` → sees SmokeBackground + hero + CTA → clicks "Download App" → goes to Play Store
2. User explores `/features` or `/pricing` → decides tier → clicks CTA → Play Store
3. User discovers site via SEO → reads `/blog/[slug]` → sees CTA → downloads app
4. All pages reinforce: "This is a website. Download the app."

## SEO Standard (July 2026 Fixes)
- All canonical links, hreflang alternates, sitemaps, schemas, and internal link href attributes resolve strictly to non-trailing-slash paths to prevent redirection loops or 404 page status returns.
- Subpages override layout-level language mappings to ensure GSC correctly maps search index records.

## GSC Indexing Fixes (July 2026)
- Fixed "Page with redirect" GSC issue: Removed all trailing slashes from internal TSX links (`/features/` → `/features`, `/privacy-policy/` → `/privacy-policy`) in `page.tsx` and `terms/page.tsx`. Also fixed trailing slash links in 3 MDX blog files: `ai-scheduling-workflow-automation.mdx`, `deep-work-focus-systems-ai.mdx`, `student-routine-generation-ai.mdx`.
- Fixed "Alternative page with proper canonical tag" GSC issue: Added `disallow: ['/*?s=*', '/*?*']` to `robots.ts` default rule to prevent crawlers from spending crawl budget on static site query-parameter URLs (e.g., `/?s={search_term_string}`) that will never return search results.

## Privacy Policy Updates (August 2026)
- Added anonymized usage data disclosure under Section 1.2 Automatically Collected Information on `/privacy-policy` to explicitly detail Firebase Analytics usage and zero personal content collection (study plans, chat messages, task names).

## Bing Webmaster Tools & IndexNow Setup (August - September 2026)
- Verified Bing site authorization via `msvalidate.01` HTML meta tag and `BingSiteAuth.xml`.
- Integrated automated IndexNow submissions (`scripts/submit-indexnow.js`) into `package.json` `postbuild` script for instant search index pings upon deployment (all 85 URLs submitted with HTTP 200).
- Fixed Bing Webmaster "Meta Description too long or too short" warnings by capping layout and home page meta descriptions at 140–155 characters.
- Fixed Bing Webmaster "Page URL with Title too long" warnings across 16 blog posts by updating `blog/[slug]/page.tsx` with absolute title overrides for long titles (>50 chars) and shortening frontmatter titles to under 50 chars.
- Fixed Bing Webmaster `robots.txt Tester` error by removing the deprecated `Host:` directive and simplifying query parameter disallows to `Disallow: /*?`.
- Added `ShareButtons.tsx` social sharing bar (WhatsApp, LinkedIn, X/Twitter, Copy Link) on all 62 blog posts to facilitate viral social sharing and organic backlink acquisition.

## Free Tools, Comparisons & Use Cases Flow (August 2026)
- **`/tools` Directory & Interactive Utilities**:
  - `/tools/daily-schedule-generator` → User inputs wake/bed times, study goals, energy peak → generates color-coded time-blocked timetable → 1-click copy or PDF print → CTA: "Download PlanBot Android app for real-time dynamic re-scheduling".
  - `/tools/exam-revision-calculator` → Exam students (JEE/NEET/UPSC) calculate daily subject split & spaced repetition cadence → CTA to PlanBot focus tracking.
  - `/tools/pomodoro-focus-calculator` → Deep work sprint & fatigue calculator with interactive session checklist.
  - `/tools/weather-forecast` → 10-day precision weather tracker (Past 2 days, Today, Next 7 days) with GPS auto-detect, Day/Night icon alignment via `is_day`, live local time display, and scrollable manual city search → AI routine & commute advisory → CTA to PlanBot Android app.
- **`/compare` Directory & Commercial Pages**:
  - `/compare/planbot-vs-motion`, `/compare/planbot-vs-notion`, `/compare/planbot-vs-todoist`, `/compare/planbot-vs-google-calendar`, `/compare/planbot-vs-ticktick` → High-intent organic traffic funnel directly to Google Play Store download CTAs.
- **`/use-cases` Directory**:

## GSC Indexing & Performance Milestone (September 2026)
- **Indexing Status:** 83 pages confirmed live indexed in Google Search Console with Review Snippets and Breadcrumbs enhancements; remaining 2 URLs submitted with "Indexing requested". 100% of all 85 sitemap endpoints fully covered.
- **Search Performance:** 3.8k+ total impressions, 45 clicks, average position 24.1 with daily impressions reaching ~100–110/day.
- **Top Impression Drivers:** `/blog/what-is-ai-planner-app-complete-guide` (518 imp), `/blog/ai-scheduling-workflow-automation` (500 imp), `/` (472 imp, 22 clicks), `/blog/bank-po-study-plan-ai-planner` (219 imp, 5 clicks).
- **Core Search Queries:** High impressions on non-branded keywords ("ai planning" 307 imp, "ai-driven scheduling" 134 imp, "ai planner" 62 imp) and branded traction ("planbot" 94 imp / 8 clicks).
- **Top Markets:** United States (1,166 impressions) and India (953 impressions, 31 clicks / 3.25% CTR).
- **GSC SERP & CTR Optimization Implementation:**
  - Injected dynamic `FAQPage` schema on blog articles to trigger expandable Google SERP accordions, dramatically boosting search snippet visual size.
  - Dynamic `FAQPage` schema deployment across core articles.
  - Upgraded titles and descriptions on top impression pages (`what-is-ai-planner-app-complete-guide`, `ai-scheduling-workflow-automation`, `bank-po-study-plan-ai-planner`, `how-entrepreneurs-use-ai-plan-day`) with 2026 hooks and curiosity copy within 140–155 character boundaries.
  - Integrated `seo-geo-aeo` workflow for automated crawler verification and audit reporting.
  - Integrated `claude-seo` suite for deep parallel site audits, single-page DOM analysis, hreflang verification, and keyword clustering.
  - Implemented Speculation Rules prerendering pipeline for instant user transitions to `/pricing`, `/features`, and `/tools/*`.
  - Added direct bidirectional link flow from all blog articles to interactive browser utilities (`/tools/daily-schedule-generator` and `/tools/exam-revision-calculator`).

## Live Polling Interactive System (September 2026)
- **Realtime Database Pipeline**: The <LivePoll /> client component now connects directly to a global Realtime Database (website_polls collection) via the dedicated planbot-website Firebase app configuration.
- **User Flow**: User lands on a blog post or page containing a poll -> sees the initial seeded values + real-time global votes -> clicks an option -> local state updates immediately for instantaneous feedback -> Firebase setDoc(..., { merge: true }) safely increments the counter in the cloud without blocking UI -> onValue listener updates percentages globally for all connected users in real time.
- **Post-Vote Redirection**: Upon voting, users are immediately presented with a high-visibility CTA conversion banner ('See how PlanBot current AI engine plans your day') driving traffic to the Google Play Store.
