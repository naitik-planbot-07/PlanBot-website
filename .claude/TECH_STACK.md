# Tech Stack

## Frontend Core
- **Framework:** Next.js 14 (App Router, SSG)
- **Language:** TypeScript
- **React:** 18.3.x

## Styling & UI
- **CSS Framework:** Tailwind CSS 3.4
- **Design Aesthetic:** Deep Space Blue (#0A0E23), Glassmorphism, Neon Accents, Dark Theme
- **Fonts:** Inter (via next/font/google)
- **Custom Utilities:** Glass cards, gradient text, primary/secondary buttons (globals.css @layer components)

## Graphics & Effects
- **Background Effect:** Custom WebGL2 fragment shader (`SmokeBackground.tsx`) — `'use client'` component
- **Animations:** Pure CSS marquee ticker, Tailwind keyframe animations

## Content & Blog
- **Blog System:** MDX files in `src/content/blog/` (87 posts as of October 2026) <!-- Fix (Oct 2026): Scaled blog posts to 87 with JEE Main 2026, NEET UG 2026, Motion alternative, Gemini AI timetable, and International Baccalaureate (IB) guides -->
- **MDX Processing:** `next-mdx-remote` + `gray-matter` + `remark-gfm` + interactive `LivePoll` component
- **Content Rendering:** Server-side MDX compilation with RSC

## SEO & Performance
- **SEO:** Next.js Metadata API, auto-generated sitemap.ts, robots.ts
- **Structured Data:** JSON-LD schemas (WebSite, MobileApp, Organization, LocalBusiness, FAQ, BlogPosting, BreadcrumbList, Speakable, HowTo)
- **Redirects:** Legal pages redirect to external GitHub Pages URLs (firebase.json)
- **Analytics:** Google Analytics 4 (`G-0Y5H7R0D6Z`), Microsoft Clarity (`x7grrxn17q` session recordings & heatmaps), and Facebook Pixel tracking code.

## AI Crawler & GEO Infrastructure
- **robots.ts:** Explicit allow rules for 14 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- **llms.txt:** LLM-readable site summary at `/llms.txt` and `/llm.txt` (Kimi variant)
- **llms-full.txt:** Full blog content (top 15 posts) for AI ingestion, auto-generated via `scripts/generate-llms-full.js`
- **E-E-A-T:** Founder schema includes `knowsAbout` array with 11 topical authority markers
- **AEO Blocks:** Every blog post has a `<div class="aeo-answer tl-dr">` Quick Answer block targeted by Speakable schema
- **Speakable Schema:** Injected on homepage and all blog posts for voice search optimization
- **Build Scripts:** `scripts/inject-aeo-blocks.js` (MDX injection), `scripts/generate-llms-full.js` (LLM content)

## Deployment & Tooling
- **Deploy Target:** Firebase Hosting (static export to `out/`)
- **Deploy Command:** `firebase deploy --only hosting:planbotai`
- **Canonical Domain:** https://planbotai.app
- **DNS & CDN:** Cloudflare (NS: `brenna.ns.cloudflare.com`, `tadeo.ns.cloudflare.com`) proxying to Firebase Hosting origin (`199.36.158.100`), SSL mode: Full/Full (strict)
- **Registrar:** Name.com
- **Linter:** ESLint (next/core-web-vitals) pinned to `14.2.22` to avoid circular dependency crashes
- **PostCSS:** autoprefixer
- **Package Manager:** npm
- **Audit & Optimization Tooling:** `seo-geo-aeo` skill (automated SEO/GEO/AEO multi-page auditing, scoring, and report generator)

## Security Headers (firebase.json)
- Strict-Transport-Security (HSTS with preload)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- X-DNS-Prefetch-Control: on

## Repository Security & Build Hygiene (November 2026)
- **Git Tracking Isolation**: Untracked 544 internal Next.js compiler files (`.next/`) and Firebase cache (`.firebase/`) from repository tracking (`5d05bdd`).
- **Secret Detection Compliance**: Cleared GitGuardian Generic Encryption Key alert triggered by Next.js preview/server action keys. Enforced `.gitignore` boundary preventing build artifacts and temporary cryptographic hashes from leaking to remote repositories.


## SEO Fixes (July 2026)
- **Trailing Slashes:** Standardized all canonical, schema, breadcrumbs, and internal URLs to be non-trailing-slash to align with Firebase Hosting cleanUrls redirects and prevent redirect/404 errors.
- **Hreflang Inheritance:** Modified `createMetadata` to explicitly define `languages` alternates (`en-IN` and `x-default`) pointing to the local page's URL, stopping pages from inheriting root-level homepage alternates and triggering "Duplicate, Google chose different canonical than user" GSC errors.

## SEO Fixes — Round 2 (July 2026 GSC Indexing)
- **Internal Link Trailing Slashes (27 GSC redirect pages):** Removed trailing slashes from `<a>` and `<Link>` hrefs in `src/app/page.tsx` and `src/app/terms/page.tsx`. Also fixed MDX internal links in `ai-scheduling-workflow-automation.mdx`, `deep-work-focus-systems-ai.mdx`, and `student-routine-generation-ai.mdx` — these were causing Googlebot to crawl slash-variant URLs which Firebase 301-redirects, producing "Page with redirect" in GSC.
- **robots.ts Query Param Disallow (6 GSC canonical pages):** Added `'/*?s=*'` and `'/*?*'` to the default `disallow` array in `src/app/robots.ts`. Prevents crawlers from hitting `/?s={search_term_string}` query URLs that don't return content on this static site. Eliminates "Alternative page with proper canonical tag" GSC noise and protects crawl budget.

## Visual Roadmap & Flowchart System (August 2026)
- **Interactive Component:** `src/components/TierFlowchart.tsx` — responsive client component providing horizontal pipeline flow on desktop and vertical upgrade progression on mobile/tablet.
- **Vector Assets:** `public/images/tier-flowchart-horizontal.svg` and `public/images/tier-flowchart-vertical.svg` (high-DPI, dark-mode SVG vector diagrams).
- **Synchronized Pricing & Feature Matrices:** `src/app/pricing/page.tsx` and `src/app/features/page.tsx` updated with 4-tier analytics unlock specs (3/15/30/100 plans history, focus scopes, graphs, goals).

## Privacy Policy Compliance (August 2026)
- **Firebase Analytics Disclosure:** Added precise disclosure clause to `src/app/privacy-policy/page.tsx` under Automatically Collected Information detailing screen views, feature interactions, and button taps tracking, confirming non-sharing with third parties, and explicitly guaranteeing exclusion of personal content (study plans, chat messages, task names).

## Bing Webmaster Tools & Technical SEO Audit (August 2026)
- **100% Perfect Bing Site Scan:** Verified all 81 sitemap URLs with 0 Errors and 0 Warnings in Bing Webmaster Tools Site Scan.
- **Automated Title (< 60 chars) & Description (120–155 chars) Constraints:** Enforced via `src/lib/seo.ts` and `src/app/blog/[slug]/page.tsx`.
- **Automated Validation Script:** `scripts/audit-all-urls.js` inspects static HTML outputs for title, meta description, JSON-LD, and canonical conformity.
- **External Citations & Inbound Discovery:** Listed on AlternativeTo.net (`https://alternativeto.net/software/planbot/`) to capture Motion/Notion alternative searches.
- **Bing Verification:** Verified via `msvalidate.01` HTML meta tag and `BingSiteAuth.xml`.
- **IndexNow Script:** `scripts/submit-indexnow.js` pinging `https://api.indexnow.org/indexnow` for all 85 sitemap URLs using key `d3b07384d113edec49eaa6238ad5ff00.txt`. Integrated into `package.json` `postbuild` script.
- **Sitemap Refresh (September 2026):** `src/app/sitemap.ts` updated with dynamic live Date timestamps, 23 static/utility endpoints, and 62 MDX blog posts with priority weighting. Thin legal pages excluded to protect crawl budget.
- **robots.ts Clean Directive:** Stripped deprecated `Host:` directive and simplified query parameter disallow pattern to `Disallow: /*?` for clean validation in Bing Webmaster Tools.
- **Organic Link Building Component:** Added `ShareButtons.tsx` (WhatsApp, LinkedIn, X/Twitter, Clipboard API) to blog pages for viral sharing and backlinks.

## Free Tools & Interactive Systems (August 2026)
- **Client-Side Free Tools (`/tools`)**:
  - `src/app/tools/daily-schedule-generator/page.tsx`: Time-blocking generator with custom circadian energy windows, 1-click clipboard export, and print stylesheet.
  - `src/app/tools/exam-revision-calculator/page.tsx`: Exam revision model (JEE, NEET, UPSC, CAT, GATE, Boards) with subject time distribution and 1-3-7-21 spaced repetition roadmap.
  - `src/app/tools/pomodoro-focus-calculator/page.tsx`: Pomodoro & deep work calculator (Classic, 50/10, 90/20 Ultradian) with interactive session checklist and finish time projector.
  - `src/app/tools/weather-forecast/page.tsx`: 10-day precision weather planner (Past 2 days, Today, Next 7 days) via Open-Meteo with GPS geolocation, Day/Night icon & time alignment via `is_day`, time-aware AI routine advisories, and scrollable search autocomplete.
- **Interactive Live Community Polling System**:
  - `src/components/LivePoll.tsx`: Client-side persistent polling with localStorage tracking, smooth CSS progress bar animations, anonymous submission, and social sharing.
- **Security Headers (firebase.json)**:
  - Permissions-Policy updated to `camera=(), microphone=(), geolocation=(self)` to enable browser GPS geolocation for weather calculations.
- **Comparison & Use-Case Directory (`/compare`, `/use-cases`)**:
  - Structured side-by-side matrices and detailed teardowns for Motion, Notion, Todoist, Google Calendar, and TickTick.
  - Persona pages for Students & Exams, Working Professionals, and ADHD Focus.

## GSC Indexing & Production Metrics (September 2026)
- **Indexed URL Count:** 83 pages confirmed live indexed in Google Search Console with active Review Snippets and Breadcrumbs enhancements.
- **Indexing Queue:** 2 remaining URLs (`google-gemini-vs-claude-vs-chatgpt-planbot-poll` and `stop-wasting-time-youtube-instagram-planbot-productivity`) actively submitted with "Indexing requested". 100% of all 85 sitemap URLs fully accounted for.
- **Redirect Validation:** GSC validation initiated 31/08/2026 running to clear legacy trailing-slash crawl history.
- **Canonical Purity:** 0 trailing slashes on all active indexed pages in Google's index.
- **Performance Overview:** 3,800+ total impressions, 45 clicks, 24.1 average search position.
- **Key Search Queries:** "ai planning" (307 imp), "ai-driven scheduling" (134 imp), "planbot" (94 imp, 8 clicks).
- **Core Audiences:** US (1,166 imp) and India (953 imp, 31 clicks / 3.25% CTR).
- **Structured Data Additions:** Dynamic `FAQPage` JSON-LD schema parsing in MDX pipeline and automatic rendering in `BlogPost` component.
- **Internal Link Matrix:** Strategic anchor linking from high-traffic homepage, free interactive tools (`/tools/*`), and comparison hub (`/compare`) to primary impression drivers.

## SEO Audit & Optimization Tooling (August 2026)
<!-- Added (August 2026): Claude SEO suite installation for deep technical, GEO, and schema audits -->
- **Claude SEO Tooling Suite (`AgriciDaniel/claude-seo` v2.2.4)**:
  - 31 sub-skills covering technical SEO, schema, content quality, GEO/AEO, backlinks, sitemaps, drift analysis, competitor pages, and local SEO.
  - 18 specialized subagents configured in `.claude/agents/`.
  - Isolated Python runtime with Playwright Chromium for full DOM and JavaScript-rendered webpage audits.
  - **Speculation Rules API Integration:** Configured in `src/app/layout.tsx` for zero-latency sub-50ms prerendering on high-converting routes (`/pricing`, `/features`, `/tools/*`, `/compare/*`).
  - **LCP Optimization:** `priority` / `fetchPriority="high"` on critical header logo asset (`/logo.jpeg`).
  - **Contextual Tools Hub Linking:** Embedded cross-links to `/tools/daily-schedule-generator` and `/tools/exam-revision-calculator` across all 55 MDX blog post templates.







## Global Live Polling & Firestore Database (September 2026)
- **Firebase Web App Registration**: A dedicated Firebase Web App (\planbot-website\) within the \planbot-n07\ project to securely isolate web traffic from the mobile app's database.
- **LivePoll Data Sync (\src/components/LivePoll.tsx\)**: Migrated from purely local state to global real-time synchronization using Firebase Firestore \onSnapshot\ listener.
- **Atomic Voting Architecture**: Uses \setDoc\ with \merge: true\ and \increment(1)\ on the \website_polls\ collection to prevent race conditions during simultaneous global voting.
- **Next.js Client Components**: Uses \'use client'\ directive allowing isomorphic Firebase v9 initialization without breaking Next.js SSG build pipeline (\irebase deploy --only hosting\).


<!-- Added (Sept 2026): Marketing & Ad Analytics Tracking Stack -->
## Marketing Telemetry & Tracking Stack (September 2026)
- **Document**: PLANBOT_MARKETING_STRATEGY.md
- **Ad Monetization app-ads.txt & ads.txt**: Updated and verified `public/app-ads.txt` and `out/app-ads.txt` with full 345-line InMobi partner reseller bundle (completed missing `indexexchange.com, 220189, RESELLER, 50b1c356f2c5c8fc` on 21-10-2026). Web `ads.txt` files (`public/ads.txt`, `out/ads.txt`) also audited and augmented with `bidease.com, bidease_seller_40, RESELLER` to ensure 100% mediation parity. Deployed to production via Firebase Hosting with live HTTP 200 validation. Zero lines removed, ensuring strict compatibility with external SSPs and programmatic mediation.

## Search Console Indexing & robots.txt Governance (October - November 2026)
- **Status Audit**: Confirmed 3 URLs blocked under GSC "Blocked by robots.txt" (`/?s={search_term_string}` and `/api/*`) are intentionally disallowed via `src/app/robots.ts` (`/*?` and `/api/`).
- **Crawl Budget Optimization**: Disallowing query parameter patterns and dead API endpoints successfully conserves crawl bandwidth, preventing useless variant pages from being indexed.
- **Audit Reconfirmation (02-11-2026)**: Re-evaluated live GSC drilldown report. Trend line has remained completely flat at 3 URLs for over 6 weeks with zero legitimate content pages affected. No action or "Validate Fix" required.

## Generative AI CRO & Conversion Architecture (October 2026)
- **Top Landing Page Optimization**: `src/content/blog/chatgpt-study-timetable-prompt-test.mdx` updated with high-CTR 59-char title `ChatGPT Study Timetable: Why Cook from Scratch? (Free Prompt)` and 147-char meta description conforming to Bing & GSC boundaries.
- **Conversion Hook**: Introduced 'Cooking from scratch vs. Ready-to-Eat Meal' comparison block directly targeting the 551+ Google Generative AI (AI Overviews) impressions to channel searchers directly to Play Store download CTAs.

<!-- Added (October 27, 2026): Free Interactive Tools Soft 404 & Static SSG Architecture -->
## Free Interactive Tools Soft 404 & SSG Architecture (October 2026)
- **Deterministic SSG Pre-Rendering**: All client tool widgets (`GoalWidget`, `BusinessDaysWidget`, `DaysUntilWidget`, `HabitWidget`, `ReadingWidget`) initialize state via deterministic factory functions (`todayISO()`) instead of empty string `useEffect` reliance. This guarantees that initial static HTML generated into `out/` contains complete calculation results, tables, and milestone dates with zero `<p role="alert">` error states.
- **HTML5 Semantic Hygiene**: Standardized `src/components/ToolFrame.tsx` to render inside a `<div>` container, eliminating invalid nested `<main>` tags within `RootLayout`'s `<main className="min-h-screen">`.
- **Windows Build Stabilization**: Added `outputFileTracing: false` to `next.config.js`. Because static SSG export (`output: 'export'`) serves pure HTML/CSS/JS without Node.js server runtimes, disabling `.nft.json` file tracing prevents Windows `EBUSY / open` file-lock conflicts during parallel static optimization.
- **Content Thickness Standard**: Scaled tool meta articles and FAQs in `src/lib/tools-meta.ts` to >1,200 words each with structured markdown sections, reference tables, and deep-dive links to PlanBot's high-authority blog corpus to satisfy Google's Helpful Content System and eliminate Soft 404 flags.

<!-- Added (October 17, 2026): Administrative Tier & Subscription Provisioning Stack - documented Firebase Admin SDK & Firestore Native Mode user entitlement architecture -->
## User Tier & Subscription Provisioning Engine (October 2026)
- **Database Architecture**: Multi-database Firebase project (`planbot-n07`) utilizing dedicated native-mode instance `(databases/planbot)` for app state and user documents (`users` collection).
- **Entitlement Sync Stack**: Google Play Billing API, Cloud Functions v2 (`subscription_verification.ts`, `asia-southeast1`), and Firebase Admin SDK runtime for server-side subscription state manipulation.
- **Security Rules Tier Isolation**: `firestore.rules` enforces immutable client security on `subscriptionType`, `subscriptionTier`, `subscriptionStatus`, and `isPremium`, requiring authenticated Admin SDK or verified Cloud Functions to grant paid tiers (`Pro`, `Elite`, `God`).
- **Admin Entitlement Event (October 17, 2026)**: Successfully executed administrative override granting user `plannexttech@gmail.com` (`UID: Wtar2TQp5OVRQzEjM4D1JIHsmf73`) the lifetime `God` subscription plan with all features unlocked.

<!-- Added (October 21, 2026): Worldwide SEO, Review Stars Schema & Generative AI Scaling (All Batches Completed) -->
## Worldwide SEO, Review Stars Schema & GEO Scaling Engine (October 2026)
- **Global Hreflang Targeting**: `src/lib/seo.ts` expanded with Tier-1 developed market language alternates (`en-US`, `en-GB`, `en-CA`, `en-AU`, `en-IE`, `en-NZ`, `en-DE`, `en-FR`, `en-NL`, `en-CH`, `en-NO`, `en`, `en-IN`, and `x-default`) to capture international queries without canonical conflicts.
- **SERP Review Stars Markup**: Injected official Google Play Store rating (`aggregateRating`: 4.9 ★, 1,280+ ratings) in `mobileAppSchema` to drive golden review stars in Google search results.
- **Dual Currency UI Engine**: Implemented interactive INR/USD/EUR currency selector on `src/app/pricing/page.tsx` displaying $1.19/mo (Pro), $1.49/mo (Elite), and $2.99/mo (God) alongside Rupee pricing.
- **Desktop QR Code Scanner Component**: Created `src/components/DesktopQRModal.tsx` and desktop navbar action in `src/components/Nav.tsx` allowing desktop visitors to scan and install on Android in 2 seconds.
- **Generative AI Content Ingestion**: Authored 7 high-impact strategic articles across Batches 1, 2 & 3 (`deepseek-study-timetable-prompt-test.mdx`, `best-ai-planner-for-adhd-adults-2026.mdx`, `jee-main-2026-study-timetable-ai-planner.mdx`, `motion-app-too-expensive-best-android-alternatives.mdx`, `gemini-ai-study-timetable-prompt-template.mdx`, `international-baccalaureate-ib-study-timetable-ai.mdx`, `neet-ug-2026-daily-study-timetable-ai.mdx`). Total MDX corpus: 87 posts.
- **Commercial Competitor Hubs**: Added `/compare/planbot-vs-sunsama`, `/compare/planbot-vs-akiflow`, `/compare/planbot-vs-reclaim`.
- **Free Interactive Tool Conversion Bridge**: Added direct 1-click PlanBot app export action to `/tools/daily-schedule-generator`.
- **SSG Verification & Live Release**: Clean compilation across 124 static endpoints verified via `npm run build` (115 IndexNow URLs submitted with HTTP 200); deployed live to Firebase Hosting (`planbot-n07` / `https://planbotai.app`) with verified HTTP 200 on all endpoints.
- **InMobi Crawler Verification (October 30, 2026)**: Verified live `app-ads.txt` crawlability against InMobi crawler specs (sub-1.5s latency, `text/plain` header, single redirect tolerance, and non-blocking `robots.txt`). Patched 1-character typo in Account ID (`ecefb` instead of `eaefb`) across all `ads.txt` and `app-ads.txt` files.

<!-- Added (November 02, 2026): Google Search Console URL Inspection & Indexing Coverage Reconciliation -->
## Search Console Indexing Reconciliation & URL Inspection (November 2026)
- **URL Inspection Audit**: Verified clean HTTP 200 responses on `/planner-for/teacher` and `/tools/eisenhower-matrix-tool` following GSC 404 inspection report caused by double-pasting in the GSC search bar.
- **Index Reconciliation & Live Search Verification**: Verified live Google search indexing for `/planner-for/*`, `/templates/*`, and `/tools/sleep-cycle-calculator`. Confirmed that GSC dashboard's 121 URLs represent a reporting lag (cutoff date: 24 Oct 2026), while Google's live engine has already crawled and indexed the 26 Oct batch. Zero manual re-inspection needed.






- **Measurement Architecture**: In-app Firebase Analytics custom event telemetry (pp_open, goal_selected, plan_created, 	imer_started, streak_day_3, 	rial_started, subscription_purchased, eferral_installed) linked to Google Ads UAC and Meta Pixel.