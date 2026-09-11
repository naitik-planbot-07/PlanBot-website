# Backend Schema

This is a **static marketing website** — there is no backend.

## Architecture
- **Type:** Static Site Generation (SSG) via Next.js 14
- **Backend:** None — no database, no auth, no API routes
- **Content:** MDX files stored in `src/content/blog/` (62 posts as of September 2026) <!-- Fix (Sept 2026): Updated blog post count to 62 with GPT-6 Astra, Gemini vs Claude poll, YouTube/Insta focus, and ChatGPT planning posts -->
- **Deploy:** Firebase Hosting (static HTML output to `out/`)
- **Canonical Domain:** https://planbotai.app

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







