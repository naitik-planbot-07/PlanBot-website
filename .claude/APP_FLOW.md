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
6. **`/blog`** — Blog index listing all MDX posts (87 posts) <!-- Fix (Oct 2026): Scaled blog posts to 87 with JEE Main 2026, NEET UG 2026, Motion alternative, Gemini AI timetable, and International Baccalaureate (IB) guides -->
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

## Canonical Domain & Edge Routing
- **All metadata, structured data, sitemap, and robots use:** `https://planbotai.app`
- **DNS & CDN Layer:** Cloudflare proxy (`brenna.ns.cloudflare.com`, `tadeo.ns.cloudflare.com`) routing to Firebase Hosting origin (`199.36.158.100`), with `www` CNAME rule redirecting to apex domain `https://planbotai.app`.
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

<!-- Added (Sept 2026): Marketing Funnel & Ad Ingestion Flow -->
## Marketing & Acquisition Funnel (September 2026)
- **Acquisition Vectors**: Paid Ads (Google UAC, Exact Search, Meta Reels) + Organic Hubs (Reddit /JEENEETards, Telegram study channels, YouTube Shorts) -> Play Store listing -> Onboarding activation (plan_created).
- **Growth Loops**: Free tool lead magnets (/tools/daily-schedule-generator), gamified flame streaks, and in-app referral credit incentives.
## GSC Indexing Fixes (September 2026)
- Fixed "Blocked by robots.txt" issue in Google Search Console: Removed literal '/api/*' exclusions from the Speculation Rules API JSON in src/app/layout.tsx. Googlebot was aggressively extracting this string and crawling it, only to be blocked by the /api/ disallow rule in obots.ts. Since the Next.js site is fully static, the API prefetch exclusions were redundant.


- **Update [19-09-2026]**: /dashboard route removed; traffic flow strictly limited to public marketing pages (Blog, Features, Pricing, Tools).
- **Update [04-10-2026]**: Root `app-ads.txt` augmented with full 345-line InMobi authorized reseller partner inventory to support programmatic ad mediation without removing legacy partner records.
- **Update [05-10-2026]**: Confirmed GSC "Blocked by robots.txt" status on 3 parameter/API URLs represents intended crawl mitigation; no user-facing pages are blocked and no validation action is required.
- **Update [02-11-2026 (GSC Blocked by robots.txt Re-verification)]**: Audited GSC indexing report (`CAMYByAC`). Confirmed flat 3-URL count (`/?s={search_term_string}` and `/api/*`) with last crawl activity dating to mid-September 2026. Zero user-facing content blocked; strictly recommended against triggering GSC "Validate Fix".
- **Update [10-10-2026]**: Streamlined visitor conversion flow on #1 AI Overview traffic page (`/blog/chatgpt-study-timetable-prompt-test`): added 'Cooking from Scratch vs. Ready-to-Eat Meal' contrast box to immediately bridge ChatGPT prompt interest to 1-tap PlanBot app downloads.
<!-- Added (October 27, 2026): Free Interactive Tools Soft 404 Remediation & Enhanced Tool Flow -->
## Free Tools High-Authority User Flow (October 2026)
- **`/tools/sleep-cycle-calculator`**:
  - Full static pre-rendering with 4 calculation times (6, 5, 4, 3 cycles).
  - Sleep Cycle Reference Matrix table detailing duration, recovery tier, and persona recommendations (Exam Students, Working Professionals, Athletes).
  - Comprehensive guide covering N1–N3 and REM sleep architecture, sleep inertia mechanics, duration reference guide, and 4 golden rules of circadian hygiene.
  - Seamless bridge to PlanBot Android app for real-time circadian time-blocking and adaptive replanning.
- **`/tools/goal-breakdown-calculator`**:
  - Zero-error initial state with deterministic 30-day timeline and 10% safety buffer.
  - Instant pre-rendered calculation: 11.5–12.5 units/working day, weekly quota, and 25%, 50%, 75%, 100% milestone dates.
  - In-depth guide on the cognitive science of reverse planning, overcoming the Planning Fallacy, milestone calibration gates, and multi-scenario case studies.
  - Direct conversion CTA into PlanBot Android goal and routine tracking.

<!-- Added (October 17, 2026): Account Entitlement Flow Update -->
- **Update [17-10-2026]**: Provisioned permanent `God` tier subscription entitlement for administrative user account `plannexttech@gmail.com` in native Firestore `planbot` database. Unlocked complete analytics suite, unlimited active goals, and Study Pattern AI in mobile client stream.
<!-- Added (October 21, 2026): app-ads.txt InMobi Parity Audit & ads.txt Verification -->
- **Update [21-10-2026]**: Audited `app-ads.txt` across all 345 requested lines. Identified that 327 of 328 unique lines were already active, and patched the 1 missing entry (`indexexchange.com, 220189, RESELLER, 50b1c356f2c5c8fc`) in `public/app-ads.txt` and `out/app-ads.txt`, achieving 100% complete authorization coverage.
- **Update [21-10-2026 (ads.txt)]**: Audited web `ads.txt` against 16 requested lines (8 unique). Verified 7 present and added missing `bidease.com, bidease_seller_40, RESELLER` to both `public/ads.txt` and `out/ads.txt`. Successfully deployed live to Firebase Hosting with HTTP 200 verification on both endpoints.
<!-- Added (October 21, 2026): Global User Flow & Currency Selector Architecture (All Batches Completed) -->
- **Update [21-10-2026 (Worldwide Growth Flow - All Batches)]**:
  - Global Visitors from Tier-1 developed nations (US, UK, CA, AU, EU) are now recognized through comprehensive hreflang routing (`en-US`, `en-GB`, `en-CA`, `en-AU`, `en-DE`, `en-FR`, `en-NL`, `en-CH`, `en-NO`, `en`).
  - `/pricing` now empowers international visitors with an immediate currency toggle between `₹ INR` and `$ USD / € EUR` ($1.19 / $1.49 / $2.99 / mo) with local Google Play rates guidance, destroying purchasing friction.
  - Desktop users can click "Scan QR" in navigation to trigger `DesktopQRModal` and scan the Android install QR code with their mobile cameras.
  - New high-intent entrypoints live: `/blog/deepseek-study-timetable-prompt-test`, `/blog/best-ai-planner-for-adhd-adults-2026`, `/blog/jee-main-2026-study-timetable-ai-planner`, `/blog/motion-app-too-expensive-best-android-alternatives`, `/blog/gemini-ai-study-timetable-prompt-template`, `/blog/international-baccalaureate-ib-study-timetable-ai`, and `/blog/neet-ug-2026-daily-study-timetable-ai`.
  - Expanded comparison flows: `/compare/planbot-vs-sunsama`, `/compare/planbot-vs-akiflow`, `/compare/planbot-vs-reclaim`.
  - Seamless bridge from `/tools/daily-schedule-generator` directly into Google Play Store app install.
  - All 124 static pages verified clean and deployed live to Firebase Hosting (`planbot-n07` / `https://planbotai.app`) with verified HTTP 200 on all endpoints.
- **Update [30-10-2026 (InMobi app-ads.txt Crawl Flow)]**: Audited automated crawler discovery chain from Google Play Developer URL (`https://planbotai.app`) -> `robots.txt` (`Allow: /app-ads.txt`) -> `https://planbotai.app/app-ads.txt` (HTTP 200 text/plain with 345 InMobi exchange lines). All crawler requirements met. Patched 1-character typo in Account ID (`ecefb` instead of `eaefb`).
- **Update [02-11-2026 (GSC Indexing & URL Inspection Flow)]**: Audited GSC inspection report for accidental dual-paste URL (`planner-for/teacherhttps://planbotai.app/tools/eisenhower-matrix-tool`). Confirmed zero broken links on production site and verified both individual routes return HTTP 200 OK. Fully reconciled all 121 indexed rows in GSC: verified via live Google Search queries that `planner-for`, `templates`, and tools from the 26-10-2026 batch are already indexed live on Google, with GSC dashboard simply exhibiting the standard 3-7 day reporting lag. No manual checking required.
- **Update [04-11-2026 (GitGuardian Security Incident Resolution)]**: Investigated GitGuardian email alert regarding exposed Generic Encryption Key on repository push from November 3rd. Confirmed root cause to be Next.js 14 compiler-generated keys in `.next/` (`encryptionKey` and `previewModeEncryptionKey`). Completely untracked `.next/` and `.firebase/` from git index (`5d05bdd`) to keep build artifacts local and prevent alert recurrence. Confirmed zero application, database, or API credentials compromised.







