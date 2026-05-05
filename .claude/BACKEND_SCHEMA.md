# Backend Schema

This is a **static marketing website** — there is no backend.

## Architecture
- **Type:** Static Site Generation (SSG) via Next.js 14
- **Backend:** None — no database, no auth, no API routes
- **Content:** MDX files stored in `src/content/blog/`
- **Deploy:** Vercel (free tier), static HTML output

## External Services
- **Google Play Store:** All download CTAs link to `https://play.google.com/store/apps/details?id=cpm.planbot`
- **Legal Pages:** Redirected to GitHub Pages (privacy policy, terms, refund policy)
- **Contact:** Mailto link (`plannexttech@gmail.com`)
- **Social:** WhatsApp Channel + Instagram (@planbotai)

## Data Flow
- Blog posts: MDX files → `gray-matter` frontmatter parsing → `next-mdx-remote` rendering → static HTML at build time
- SEO: Auto-generated `sitemap.xml` and `robots.txt` at build time
- Structured data: JSON-LD injected via `<script>` tags (WebSite, MobileApp, Organization, FAQ, BlogPosting schemas)
