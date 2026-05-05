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
- **Blog System:** MDX files in `src/content/blog/`
- **MDX Processing:** `next-mdx-remote` + `gray-matter` + `remark-gfm`
- **Content Rendering:** Server-side MDX compilation with RSC

## SEO & Performance
- **SEO:** Next.js Metadata API, auto-generated sitemap.ts, robots.ts
- **Structured Data:** JSON-LD schemas (WebSite, MobileApp, Organization, FAQ, BlogPosting)
- **Redirects:** Legal pages redirect to external GitHub Pages URLs (next.config.js)

## Deployment & Tooling
- **Deploy Target:** Vercel (free tier)
- **Linter:** ESLint (next/core-web-vitals)
- **PostCSS:** autoprefixer
- **Package Manager:** npm
