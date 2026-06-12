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
- **Blog System:** MDX files in `src/content/blog/` (28 posts as of June 2026)
- **MDX Processing:** `next-mdx-remote` + `gray-matter` + `remark-gfm`
- **Content Rendering:** Server-side MDX compilation with RSC

## SEO & Performance
- **SEO:** Next.js Metadata API, auto-generated sitemap.ts, robots.ts
- **Structured Data:** JSON-LD schemas (WebSite, MobileApp, Organization, FAQ, BlogPosting, BreadcrumbList, Speakable, HowTo)
- **Redirects:** Legal pages redirect to external GitHub Pages URLs (firebase.json)
- **Analytics:** Google Analytics 4 via `@next/third-parties/google` (GA4 Measurement ID placeholder — needs real ID)

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
- **Canonical Domain:** https://planbotai.app
- **Linter:** ESLint (next/core-web-vitals)
- **PostCSS:** autoprefixer
- **Package Manager:** npm

## Security Headers (firebase.json)
- Strict-Transport-Security (HSTS with preload)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- X-DNS-Prefetch-Control: on
