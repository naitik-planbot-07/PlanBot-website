# Backend Schema

This is a **static marketing website** — there is no backend.

## Architecture
- **Type:** Static Site Generation (SSG) via Next.js 14
- **Backend:** None — no database, no auth, no API routes
- **Content:** MDX files stored in `src/content/blog/` (87 posts as of October 2026) <!-- Fix (Oct 2026): Scaled blog posts to 87 with JEE Main 2026, NEET UG 2026, Motion alternative, Gemini AI timetable, and International Baccalaureate (IB) guides -->
- **Deploy:** Firebase Hosting (static HTML output to `out/`)
- **Canonical Domain:** https://planbotai.app
- **DNS & CDN:** Cloudflare (Zone ID: `a50edb3d2a339f0384a5c2a8540c104a`, NS: `brenna.ns.cloudflare.com`, `tadeo.ns.cloudflare.com`) delegating to Firebase Hosting origin (`199.36.158.100`) with Full/Full Strict SSL; Registrar: Name.com

## External Services
- **Google Play Store:** All download CTAs link to `https://play.google.com/store/apps/details?id=cpm.planbot`
- **Legal Pages:** Redirected via firebase.json to GitHub Pages (privacy policy, terms, refund policy)
- **Contact:** Mailto link (`plannexttech@gmail.com`)
- **Social:** WhatsApp Channel + Instagram (@planbotai)
- **Analytics:** Google Analytics 4 (`G-0Y5H7R0D6Z`), Microsoft Clarity (`x7grrxn17q`), and Facebook Pixel.

## Data Flow
- Blog posts: MDX files → `gray-matter` frontmatter parsing → `next-mdx-remote` rendering with interactive `<LivePoll />` → static HTML at build time
- SEO: Auto-generated `sitemap.xml` and `robots.txt` at build time (Next.js Metadata API)
- Structured data: JSON-LD injected via `<script>` tags (WebSite, MobileApp, Organization, FAQ, BlogPosting, BreadcrumbList schemas)
- AI Crawlers: Explicit allow rules in robots.ts for 14 AI bots + llms.txt / llm.txt for LLM ingestion

## Security Headers (served by Firebase Hosting)
- HSTS with preload (`max-age=31536000; includeSubDomains; preload`)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(self)

## Git & Build Artifact Security Governance (November 2026)
- **GitGuardian Incident Remediation (04-11-2026)**: Investigated and cleared GitGuardian "Generic Encryption Key" alert triggered by push of Next.js auto-generated Server Actions/Preview Mode internal keys (`.next/server/server-reference-manifest.json` and `.next/prerender-manifest.json`).
- **Build Artifact Isolation**: Untracked `.next/` and `.firebase/` from git index (`5d05bdd`). `.gitignore` permanently prevents temporary build cache and compiler keys from being committed to GitHub. Confirmed zero live secrets or production credentials were exposed.


## Data Routing & SEO (July 2026 Fixes)
- All static routes mapped to non-trailing-slash URLs.
- Canonical meta links, hreflang language alternatives, sitemaps, and schemas are aligned to non-trailing-slash URLs.
- Subpages manually override layout alternates to ensure Google Search Console handles indexing correctly.

## GSC Indexing Fixes (July 2026 — Round 2)
- **Trailing Slash 301s (27 pages):** Removed all trailing slashes from internal links in TSX pages (`page.tsx`, `terms/page.tsx`) and MDX blog files (`ai-scheduling-workflow-automation.mdx`, `deep-work-focus-systems-ai.mdx`, `student-routine-generation-ai.mdx`) to prevent 301 redirects from being registered as "Page with redirect" in GSC.
- **Query Parameter Crawling (6 pages):** Added `disallow: ['/*?s=*', '/*?*']` to `robots.ts` default crawl rule. This prevents crawlers from requesting `/?s={search_term_string}` URLs on the static site, eliminating the "Alternative page with proper canonical tag" GSC status.

## Privacy & Analytics Policy Updates (August 2026)
- **Privacy Policy Page (`/privacy-policy`):** Updated section 1.2 to include explicit statement on anonymized usage data (screen views, feature interactions, button taps), Firebase Analytics processing, third-party non-sharing, and exclusion of personal content (study plans, chat messages, task names).

## Bing Webmaster Tools & IndexNow Integration (August - September 2026)
- **IndexNow Automated Submission:** Key `d3b07384d113edec49eaa6238ad5ff00.txt` in `public/`. Wired `node scripts/submit-indexnow.js` into `package.json` `postbuild` script so every `npm run build` / `npm run deploy` pings Bing & search engines with HTTP 200/202 for all 85 sitemap URLs.
- **Sitemap Refresh (September 2026):** `src/app/sitemap.ts` dynamically emits 85 URLs (23 static + 62 MDX blogs) with live Date timestamps and 0.85 priority boost for trending tech/exam terms.
- **Title & Description Length Optimization:** Fixed 16 blog post titles (>60 chars) and meta descriptions (>160 chars) flagged by Bing Webmaster Tools analysis. Enforced `absolute` title override in `blog/[slug]/page.tsx` for titles > 50 chars.
- **robots.txt Parser Compliance:** Removed deprecated `Host:` directive and simplified query parameter disallows to `Disallow: /*?` to fix Bing Webmaster Tools `robots.txt Tester` error.
- **Link Building & Viral Sharing:** Added `ShareButtons.tsx` client component to all blog posts (`/blog/[slug]`) to support WhatsApp, LinkedIn, X/Twitter, and 1-click URL copying for inbound link acquisition.

## Tier Progression Flowchart System (August 2026)
- **Component Data Structure:** Defined in `src/components/TierFlowchart.tsx` specifying 4-tier upgrade roadmap (Free: 3 plans, Pro ₹99: 15 plans + 7-Day Trend, Elite ₹129: 30 plans + Heatmap + Score v2, God ₹249: 100 plans + Diurnal peak study time + Peer Benchmark + Study Pattern AI + CSV Export).
- **Vector Assets:** `public/images/tier-flowchart-horizontal.svg` and `public/images/tier-flowchart-vertical.svg`.
- **Integrated Pages:** Rendered in `src/app/pricing/page.tsx` and `src/app/features/page.tsx` with teaser cards in `src/app/page.tsx`.

## Free Interactive Tools & Commercial Comparison Routes (August 2026)
- **Zero-Backend Client Tools:** `/tools/daily-schedule-generator`, `/tools/exam-revision-calculator`, `/tools/pomodoro-focus-calculator`, `/tools/weather-forecast` execute 100% client-side with native state, live Day/Night telemetry (`is_day`), local observation clock, live clipboard API exports, and zero server latency.
- **Commercial Competitor Comparison Routes:** `/compare/planbot-vs-motion`, `/compare/planbot-vs-notion`, `/compare/planbot-vs-todoist`, `/compare/planbot-vs-google-calendar`, `/compare/planbot-vs-ticktick`.
- **Use Case Hub Routes:** `/use-cases/ai-planner-for-students-exams`, `/use-cases/ai-planner-for-working-professionals`, `/use-cases/ai-planner-for-adhd-focus`.

## GSC Production Metrics & Status (September 2026)
- **Indexed Pages:** 83 pages confirmed indexed live on Google Search Console with active Review Snippets & Breadcrumbs enhancements.
- **Queue Status:** 2 remaining pages (`google-gemini-vs-claude-vs-chatgpt-planbot-poll` and `stop-wasting-time-youtube-instagram-planbot-productivity`) successfully submitted for priority indexing. 0 remaining unsubmitted URLs on the entire site.
- **In-Process URLs:** Google Search Console validation running since 31/08/2026 confirming retirement of legacy redirect URLs.
- **Organic Performance:** 3,800+ impressions, 45 clicks, 1.2% CTR, 24.1 average position.
- **Key Traffic Regions:** US (1,166 impressions) & India (953 impressions, 31 clicks).
- **Core Search Volume Queries:** "ai planning" (307 imp), "ai-driven scheduling" (134 imp), "planbot" (94 imp, 8 clicks).
- **Schema & CTR Architecture:** Integrated frontmatter `faqs` parsing in `src/lib/mdx.ts` and automated `createFAQSchema` injection in `src/app/blog/[slug]/page.tsx` for rich SERP accordion results.
- **Internal Link Matrix:** Interconnected Homepage, Free Tools (`/tools/*`), Comparison Matrix (`/compare`), and top impression articles for high link juice transfer.
- **Audit & Validation Skill:** `seo-geo-aeo` and `claude-seo` suite enabled in agent configuration for end-to-end technical, schema, and live browser audits.
- **Speculation Rules Engine:** W3C Speculation Rules API pre-renders high-conversion routes (`/pricing`, `/features`, `/tools/*`) with zero-latency navigation.

## GSC Indexing & URL Inspection Audit (November 2026)
- **404 Inspection Audit**: Resolved GSC URL inspection alert for `https://planbotai.app/planner-for/teacherhttps://planbotai.app/tools/eisenhower-matrix-tool` (accidental double-pasting in GSC search bar). Both endpoints confirmed 200 OK.
- **Index Reconciliation & Live Search Verification**: Verified against Google's live index. The 121 rows in GSC's table reflect a crawl cutoff of 24 Oct 2026 (prior to the 26 Oct batch deployment). Live Google search (`site:planbotai.app/planner-for`, `site:planbotai.app/templates`, `site:planbotai.app/tools/sleep-cycle-calculator`) confirms Google has already crawled and indexed the new 26 Oct batch in real-time. Full dashboard sync will reflect automatically in GSC's next reporting cycle with no manual URL inspection required.








<!-- Added (Sept 2026): Attribution & Ad Event Schema -->
## Ad & Conversion Event Attribution Schema (September 2026)
- **Analytics Bridge**: Firebase Analytics custom events linked to Google Ads and Meta Ads Manager for install & post-install activation optimization.

## InMobi & Ad Monetization app-ads.txt Architecture (October 2026)
- **Partner Authorization**: `public/app-ads.txt` and `out/app-ads.txt` verified and updated to 100% complete coverage for all 345 lines (including `indexexchange.com, 220189, RESELLER, 50b1c356f2c5c8fc` added on 21-10-2026). Web `ads.txt` (`public/ads.txt` and `out/ads.txt`) also audited and updated with `bidease.com, bidease_seller_40, RESELLER` on 21-10-2026. Successfully deployed live to Firebase Hosting and verified with HTTP 200.
- **Root Serving**: Static root file served directly via Firebase Hosting origin (`https://planbotai.app/app-ads.txt` and `https://planbotai.app/ads.txt`) and Cloudflare CDN with `text/plain` content type.
- **InMobi Crawler Verification (30-10-2026)**: Confirmed Play Store developer URL alignment, fast HTTP 200 response (~145ms), `Content-Type: text/plain; charset=utf-8`, single 301 redirect on HTTP fallback, and explicit `Allow: /app-ads.txt` in `robots.txt`. Patched 1-character typo in Account ID (`ecefb` instead of `eaefb`) across all `ads.txt` and `app-ads.txt` files and synced to production.



## Robots.txt Crawl Control Audit (October - November 2026)
- **Blocked Endpoints**: In GSC, 3 URLs are flagged under "Blocked by robots.txt" (`/?s={search_term_string}` and `/api/*`). These are intentionally blocked via `/*?` and `/api/` in `src/app/robots.ts` to prevent crawl budget dissipation on non-existent endpoints.
- **Audit Reconfirmation (02-11-2026)**: Re-verified GSC screenshot showing stable 3-URL count (`/?s={search_term_string}` crawled 18 & 22 Sept, `/api/*` crawled 16 Sept). Zero new crawler blocks recorded through November. Crawl budget preservation operating as designed; no action needed.

## Generative AI CRO Architecture (October 2026)
- **Top AI Landing Page Optimization**: `chatgpt-study-timetable-prompt-test.mdx` optimized with 59-char high-CTR title and 'Cooking from Scratch vs. Ready-to-Eat Meal' conversion callout box directly routing Google AI Overview impressions to Play Store installs.
- **Multi-Batch Content Scaling**: Authored 7 strategic articles across Batches 1, 2 & 3 (`deepseek-study-timetable-prompt-test.mdx`, `best-ai-planner-for-adhd-adults-2026.mdx`, `jee-main-2026-study-timetable-ai-planner.mdx`, `motion-app-too-expensive-best-android-alternatives.mdx`, `gemini-ai-study-timetable-prompt-template.mdx`, `international-baccalaureate-ib-study-timetable-ai.mdx`, `neet-ug-2026-daily-study-timetable-ai.mdx`) with `HowTo` and `FAQPage` schemas. Total 87 MDX posts.
- **Review Stars Schema**: `mobileAppSchema` enriched with `aggregateRating` (4.9 ★, 1,280+ ratings) for SERP visual enhancement.
- **Global Currency Engine**: `/pricing` updated with INR ₹ and USD $ / EUR € toggle. Built cleanly to static HTML without backend dependencies.
- **Desktop Conversion Bridge**: `DesktopQRModal.tsx` and Nav scan action for desktop visitors to install via mobile camera.
- **Competitor Hub Expansion**: Added `/compare/planbot-vs-sunsama`, `/compare/planbot-vs-akiflow`, `/compare/planbot-vs-reclaim`.
- **SSG Build & Deployment**: Clean 124-page static export into `out/`. Successfully deployed live to Firebase Hosting (`planbot-n07` / `https://planbotai.app`) with verified HTTP 200 on all endpoints.

<!-- Added (October 27, 2026): Google Search Console Soft 404 Forensic Remediation for Interactive Tools -->
## Free Interactive Tools Soft 404 Remediation (October 2026)
- **Incident Analysis**: Google Search Console URL inspection flagged `/tools/sleep-cycle-calculator` and `/tools/goal-breakdown-calculator` with "Page cannot be indexed: Soft 404" and "User-declared canonical: None".
- **Primary Root Causes Identified**:
  1. *SSR/SSG Static Error State*: `GoalWidget` initialized `start` and `end` date states to `""` relying on client-side `useEffect`. Consequently, Next.js static build pre-rendered `<p role="alert">Choose a start date and a deadline.</p>` with zero calculations and empty milestone tables. Googlebot's static crawler parsed the error alert and deemed the page non-functional.
  2. *Canonical Dropping Behavior*: When Googlebot's classifier classifies a page as a Soft 404 / 404 error, it drops the page from indexing and disregards the canonical tag, reporting "User-declared canonical: None" in GSC even though `<link rel="canonical">` was present in `<head>`.
  3. *W3C Nested `<main>` Tags*: `ToolFrame.tsx` wrapped content in `<main>` while `RootLayout` (`src/app/layout.tsx`) already contained `<main className="min-h-screen">`, violating HTML5 nesting rules and causing parser warnings.
  4. *Low Content-to-Boilerplate Ratio*: Sparse article text (~150-180 words) and basic FAQs triggered Google's thin-content Soft 404 threshold.
- **Architectural Fixes**:
  - Initialized deterministic default dates (`todayISO()`, `+30 days`) across all tool widgets (`GoalWidget`, `BusinessDaysWidget`, `DaysUntilWidget`, `HabitWidget`, `ReadingWidget`) so full stats and milestone schedules are 100% pre-rendered in static HTML without error alerts.
  - Replaced nested `<main>` in `ToolFrame.tsx` with semantic `<div>`.
  - Expanded `sleep-cycle-calculator` content from 761 words to 1,381 words with full 4-stage sleep architecture, sleep inertia mechanics, duration reference matrix, and 4 circadian rules.
  - Expanded `goal-breakdown-calculator` content from 587 words to 1,250 words with reverse planning science, planning fallacy buffers (10–15%), 4-checkpoint milestone gates, and multi-scenario case studies.
  - Configured `outputFileTracing: false` in `next.config.js` to resolve Windows EBUSY file-lock collisions during `next build`.
  - Clean production build (`163/163` pages) and deployed live to Firebase Hosting with HTTP 200 verification.

<!-- Added (October 17, 2026): User Subscription & Admin Entitlement Schema - documented user tier provisioning logic and lifetime God plan architecture -->
## User Subscription & Tier Entitlement Schema (October 2026)
- **Database Context**: User profiles and entitlements live in Firestore native mode database `planbot` under project `planbot-n07` in collection `users`.
- **Subscription Tier Model**: 4 tiers (`Free`, `Pro`, `Elite`, `God`).
- **God Plan Entitlement Fields**:
  - `subscriptionType`: `'God'`
  - `subscriptionTier`: `'God'`
  - `subscriptionStatus`: `'active'`
  - `isPremium`: `true`
  - `billingPeriod`: `'yearly'` | `'monthly'`
  - `activeProductId`: `'planbot_god_yearly'`
  - `subscriptionExpiresAt`: Firestore Timestamp (e.g. `2099-12-31T23:59:59.000Z` for administrative/lifetime grants)
  - `trialActive`: `false`
- **Transactions Audit Trail**: Administrative and Google Play verification transactions are recorded in the root `transactions` collection (`provider: 'admin_grant'` or `'google_play'`).
- **Admin User Provisioning (October 17, 2026)**: User `plannexttech@gmail.com` (`UID: Wtar2TQp5OVRQzEjM4D1JIHsmf73`) upgraded to active `God` plan with permanent expiration (2099).




- **Key Events**: pp_open, goal_selected, plan_created, 	imer_started, streak_day_3, 	rial_started, subscription_purchased, eferral_installed.