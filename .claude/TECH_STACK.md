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
- **Blog System:** MDX files in `src/content/blog/` (62 posts as of September 2026) <!-- Fix (Sept 2026): Updated blog post count to 62 with GPT-6 Astra, Gemini vs Claude poll, YouTube/Insta focus, and ChatGPT planning posts -->
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

