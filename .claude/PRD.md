# Product Requirements Document (PRD)

## Project Overview
**PlanBot Marketing Website** is a production-ready, SEO-optimized Next.js 14 marketing website for PlanBot — an AI-powered daily planner app available on Android. The website serves as a content marketing platform (blog-focused) to drive organic traffic and app downloads.

## Critical Context
- The website is **MARKETING ONLY** — no auth, no login, no app features
- The app is **Android only**: https://play.google.com/store/apps/details?id=cpm.planbot
- Every page must make clear: "This is a website. Download the app to use PlanBot."
- The website itself is a **BLOG** — content marketing is the primary purpose
- **SEO + AEO + GEO optimization** is the #1 technical priority
- **Canonical domain:** https://planbotai.app (all metadata, structured data, sitemap use this)

## Objectives
- Drive organic traffic via SEO-optimized blog content
- Clearly communicate PlanBot's value proposition and pricing
- Convert visitors to app downloads via Play Store CTAs on every page
- Achieve Lighthouse 95+ performance score
- Premium dark aesthetic matching the PlanBot app brand
- Maximize AI engine citations (AEO/GEO) through structured content and llms.txt

## Target Audience
- Indian students preparing for JEE, NEET, and competitive exams
- Young professionals seeking AI-powered productivity tools
- Athletes and fitness enthusiasts wanting structured daily plans
- Entrepreneurs and business owners looking for planning assistance

## Design System
- **Background:** #0A0E23 (deep space blue)
- **Primary:** #1E90FF (electric blue)
- **Accent:** #00C6FF (neon cyan)
- **Pink Accent:** #FF1493 (used sparingly)
- **Glassmorphism:** Translucent cards with backdrop-blur, subtle borders
- **WebGL Effect:** SmokeBackground shader preserved in Hero section
- **Font:** Inter (via next/font)

## Key Pages
1. **Homepage** — Hero + ticker + features + pricing preview + blog preview + FAQ (with FAQPage schema) + CTA
2. **Features** — Detailed breakdowns + interactive Tier Progression Flowchart + comparison table
3. **Pricing** — Interactive Tier Progression & Analytics Unlock Flowchart + 4 tiers (Free/Pro/Elite/God) + boost packs + FAQ
4. **About** — Mission + tech + founder E-E-A-T bio (with microdata)
5. **Contact** — Email (mailto) + in-app support
6. **Blog** — MDX-based content marketing (62 posts) <!-- Fix (Sept 2026): Updated blog post count to 62 with GPT-6 Astra, Gemini vs Claude poll, YouTube/Insta focus, and ChatGPT planning posts -->
7. **404** — Custom not-found with download fallback

## Tier Progression & Analytics Roadmap Architecture (August 2026)
- **Free Tier (₹0)**:
  - 3 plans history
  - Today's focus time
  - Basic ring (Overall % + Level/XP tracking)
  - Locked analytics graphs
- **Pro Tier (₹99/mo)**:
  - 15 plans history
  - Week focus time
  - Week-over-week trend arrow ↑↓
  - 1 Active Goal tracking
  - Unlocked 7-Day Trend graph
- **Elite Tier (₹129/mo — Most Popular)**:
  - 30 plans history
  - Month focus time
  - 30-Day Rolling Stats
  - 3 Active Goals tracking
  - Subject Breakdown analysis
  - Productivity Score v2
  - Unlocked Heatmap Calendar
- **God Tier (₹249/mo — Most Powerful)**:
  - 100 plans history (All-Time)
  - Peak Study Time (Diurnal Distribution)
  - Peer Benchmark (Top X%)
  - Unlimited Active Goals
  - Study Pattern AI Engine
  - AI Weekly Performance Insights
  - CSV Data Export
  - 3-Day Free Trial (no credit card needed)
- **Vector Assets**: `/images/tier-flowchart-horizontal.svg`, `/images/tier-flowchart-vertical.svg`

## SEO, E-E-A-T, & GEO Requirements
- **E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)**:
  - **Real Entity Identity:** Use real author profiles (e.g., "Naitik Baldaniya", Founder) with roles and expertise instead of generic team names.
  - **knowsAbout Schema:** Founder Person schema includes 11 topical authority markers (AI Planning, JEE Prep, Time Management, etc.)
  - **Experience-Based Content:** Blogs must feature actual experience, original insights, product screenshots, implementation workflows, and comparisons.
  - **Topical Authority Clustering:** Focus clusters on AI planning, task management, productivity systems, study planning, etc.
- **GEO (Generative Engine Optimization) & AEO**:
  - **AI-Readable Structure:** Concise headings, FAQ sections, semantic HTML, short direct answers.
  - **Citation-Worthy Content:** Highly structured, factual, and authoritative content designed for Google AI Overviews, Perplexity, and ChatGPT citations.
  - **AI Crawler Access:** robots.ts explicitly allows 14 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
  - **llms.txt:** LLM-readable site summary at /llms.txt and /llm.txt
- **Structured Data (JSON-LD)**:
  - Critical schemas: `Organization` (with knowsAbout), `Person` (Authors/Founder), `Article`, `FAQ`, `SoftwareApplication`, `BreadcrumbList`.
- **Technical SEO:** Auto-generated `sitemap.xml`, `robots.txt`, Next.js Metadata API, Canonical URLs, Hreflang tags.
- **Analytics:** Google Analytics 4 (`G-0Y5H7R0D6Z`) & Microsoft Clarity (`x7grrxn17q` session replay & heatmaps).
- **Security:** HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy (firebase.json headers).

## Branding Constraints
- **NEVER reveal specific AI model names** (no Gemini, Grok, Llama, etc.)
- Use generic tier names: Basic AI, Standard AI, Advanced AI, Premium AI
- "Upload Photo" instead of "OCR" for the photo input feature
- "No Ads for Paid Users" instead of "No Ads on Pro"
- Social channels: WhatsApp Channel + Instagram only (no Twitter/LinkedIn)

## SEO Revision Notes (July 2026)
- Standardized all pages and layout metadata to use non-trailing-slash canonical URLs.
- Overrode language alternates in all page metadata to point to the local page's canonical URL, correcting the layout alternate inheritance bug that caused duplicate indexing issues on subpages.

## SEO Revision Notes — Round 2 (July 2026 GSC Fix)
- **Problem:** 40 pages reported as non-indexed in GSC — 27 "Page with redirect" + 6 "Alternative page with proper canonical tag" + 7 others.
- **Root cause A (27 redirect pages):** Internal links with trailing slashes (`/features/`, `/privacy-policy/`, etc.) in TSX and MDX files caused Googlebot to discover and crawl trailing-slash URLs, which Firebase redirects 301 to the non-slash canonical.
- **Fix A:** Removed all trailing slashes from internal links in: `src/app/page.tsx`, `src/app/terms/page.tsx`, `src/content/blog/ai-scheduling-workflow-automation.mdx`, `src/content/blog/deep-work-focus-systems-ai.mdx`, `src/content/blog/student-routine-generation-ai.mdx`.
- **Root cause B (6 canonical pages):** Googlebot crawled `/?s={search_term_string}` search-parameter URLs that don't exist on the static site. The canonical tag correctly points to `/`, so they logged as "Alternative page with proper canonical tag" and consumed crawl budget.
- **Fix B:** Added `disallow: ['/*?s=*', '/*?*']` to `src/app/robots.ts` default crawl rule.

## Privacy & Analytics Compliance Updates (August 2026)
- Updated Privacy Policy page (`/privacy-policy`) to explicitly state the collection of anonymized usage data (screen views, feature interactions, button taps) processed through Firebase Analytics without sharing with third parties, and confirming zero inclusion of personal content (study plans, chat messages, task names).

## Bing Webmaster Tools & IndexNow Integration (August - September 2026)
- Integrated automated IndexNow submissions (`scripts/submit-indexnow.js`) into build pipeline to push site changes directly to Bing (85 URLs submitted with HTTP 200).
- Fixed Bing Webmaster warnings for meta description length (140-155 chars) and title length (<60 chars) across 16 blog posts and main static pages.
- Resolved Bing Webmaster `robots.txt Tester` error by removing deprecated `Host:` directive and standardizing query parameter disallows.
- Added `ShareButtons.tsx` social sharing and 1-click URL copy component to all 62 blog posts to accelerate organic backlink acquisition.

## Agentic SEO, Free Tools & Programmatic Hub Architecture (August 2026)
- **Free Interactive Tools Engine (`/tools`)**:
  - `/tools/daily-schedule-generator` (Interactive time-blocking & circadian energy timetable generator with copy/print export)
  - `/tools/exam-revision-calculator` (Interactive daily subject split, spaced repetition roadmap, and mock test pacing for JEE/NEET/UPSC)
  - `/tools/pomodoro-focus-calculator` (Interactive Pomodoro, 50/10, and 90/20 deep work session checklist with fatigue projection)
  - `/tools/weather-forecast` (10-day precision atmospheric tracker with past 2 days, today, next 7 days, GPS auto-detect, Day/Night icon & time alignment, and time-aware AI routine advisories)
- **Live Community Poll & Google Trends Content Engine (September 2026)**:
  - Interactive `<LivePoll />` client component with localStorage persistence and vote animations.
  - `gpt-6-astra-launch-benchmarks-review.mdx`: OpenAI GPT-6 Astra launch analysis, official benchmarks (FrontierMath 98%, ARC-AGI-3 99.9%, OSWorld 72.6%), pricing, and top poll.
  - `google-gemini-vs-claude-vs-chatgpt-planbot-poll.mdx`: Capturing Google Gemini (+1550%) and Claude (+550%) search surges with dual live polls.
  - `stop-wasting-time-youtube-instagram-planbot-productivity.mdx`: Breaking YouTube & Instagram Reels doomscrolling with PlanBot time-blocking.
  - `how-planbot-uses-chatgpt-models-daily-planning.mdx`: How PlanBot harnesses OpenAI models for background dynamic scheduling.
- **Commercial Competitor Comparison Hub (`/compare`)**:
  - `/compare/planbot-vs-motion` (Mobile-first Android ₹99/mo vs $19–$34/mo desktop complexity)
  - `/compare/planbot-vs-notion` (Automated AI scheduling vs hours of manual template building)
  - `/compare/planbot-vs-todoist` (Time-aware scheduling vs static checklist rollover anxiety)
  - `/compare/planbot-vs-google-calendar` (Adaptive dynamic AI vs rigid static event blocks)
  - `/compare/planbot-vs-ticktick` (AI routine generation vs basic habit checkboxes)
- **Targeted Persona Use-Case Hub (`/use-cases`)**:
  - `/use-cases/ai-planner-for-students-exams` (JEE, NEET, UPSC exam prep workflows)
  - `/use-cases/ai-planner-for-working-professionals` (Deep work time-boxing and buffer protection)
  - `/use-cases/ai-planner-for-adhd-focus` (Anti-overwhelm, low-friction single-task clarity)

## GSC Performance & Indexing Progress (September 2026)
- **Current Indexing Scale:** 83 pages confirmed live indexed in Google Search Console with Review Snippets and Breadcrumbs; 2 remaining URLs submitted under "Indexing requested". 100% of all 85 sitemap endpoints covered.
- **Organic Traffic Scale:** 3.8k total impressions, 45 clicks, 24.1 average position, with peak impressions at ~110/day.
- **Top Converting Query:** "planbot" (8 clicks / 94 imp), "plan bot" (2 clicks / 17 imp).
- **High-Potential Target Queries (Position 20-30):** "ai planning" (307 imp), "ai-driven scheduling" (134 imp), "ai planner" (62 imp).
- **Primary Geographies:** US (1,166 imp) and India (953 imp, 31 clicks / 3.25% CTR).
- **Optimization Strategy Executed:**
  - Dynamic `FAQPage` schema deployment across core articles.
  - High-CTR title & meta description optimization (<50 chars titles, 140-155 chars descriptions).
  - Internal link equity clusters implemented across tools, compare, and homepage.
  - Installed `seo-geo-aeo` skill (`SNLabat/SEO-GEO-AEO-Skill`) for automated multi-page auditing across traditional SEO, generative AI engines (GEO), and answer/voice engines (AEO).
  - Installed `claude-seo` suite (`AgriciDaniel/claude-seo` v2.2.4) providing 31 sub-skills and 18 specialized subagents for technical audits, keyword clustering, backlink analysis, and rendered DOM inspection via Playwright.
  - Implemented Speculation Rules API for instant route prefetching and LCP high-priority logo preloading.
  - Integrated interactive tools contextual callouts across blog post pages to accelerate search discovery of `/tools/*`.








## SEO Revision Notes � Round 3 (Sept 2026 Phase 1 Fixes)
- **Unblocked llms.txt**: Added text extensions to robots.ts allow directives so AI crawlers can fetch the full corpus.
- **Fixed dateModified**: Exposed updated field in MDX pipeline and wired to schema and sitemap <lastmod>.
- **Entity Graph**: Linked WebPage, WebSite, and Organization via @id, added Person schema for author, and removed generic LocalBusiness schema.
- **Schema Gaps**: Added WebPage, Breadcrumb, and FAQPage schemas to /pricing, ContactPage to /contact, and removed duplicate SoftwareApplication from /features.
- **Content Cleanups**: Fixed duplicate H1s in blog posts, added missing tags, and generated llms-full.txt hub indexing files.
