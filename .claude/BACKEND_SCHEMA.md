# Backend Schema

This is a **static marketing website** — there is no backend.

## Architecture
- **Type:** Static Site Generation (SSG) via Next.js 14
- **Backend:** None — no database, no auth, no API routes
- **Content:** MDX files stored in `src/content/blog/` (28 posts)
- **Deploy:** Firebase Hosting (static HTML output to `out/`)
- **Canonical Domain:** https://planbotai.app

## External Services
- **Google Play Store:** All download CTAs link to `https://play.google.com/store/apps/details?id=cpm.planbot`
- **Legal Pages:** Redirected via firebase.json to GitHub Pages (privacy policy, terms, refund policy)
- **Contact:** Mailto link (`plannexttech@gmail.com`)
- **Social:** WhatsApp Channel + Instagram (@planbotai)
- **Analytics:** Google Analytics 4 (via @next/third-parties, GA ID placeholder needs real measurement ID)

## Data Flow
- Blog posts: MDX files → `gray-matter` frontmatter parsing → `next-mdx-remote` rendering → static HTML at build time
- SEO: Auto-generated `sitemap.xml` and `robots.txt` at build time (Next.js Metadata API)
- Structured data: JSON-LD injected via `<script>` tags (WebSite, MobileApp, Organization, FAQ, BlogPosting, BreadcrumbList schemas)
- AI Crawlers: Explicit allow rules in robots.ts for 14 AI bots + llms.txt / llm.txt for LLM ingestion

## Security Headers (served by Firebase Hosting)
- HSTS with preload (`max-age=31536000; includeSubDomains; preload`)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
