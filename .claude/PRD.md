# Product Requirements Document (PRD)

## Project Overview
**PlanBot Marketing Website** is a production-ready, SEO-optimized Next.js 14 marketing website for PlanBot — an AI-powered daily planner app available on Android. The website serves as a content marketing platform (blog-focused) to drive organic traffic and app downloads.

## Critical Context
- The website is **MARKETING ONLY** — no auth, no login, no app features
- The app is **Android only**: https://play.google.com/store/apps/details?id=cpm.planbot
- Every page must make clear: "This is a website. Download the app to use PlanBot."
- The website itself is a **BLOG** — content marketing is the primary purpose
- **SEO + AEO + GEO optimization** is the #1 technical priority

## Objectives
- Drive organic traffic via SEO-optimized blog content
- Clearly communicate PlanBot's value proposition and pricing
- Convert visitors to app downloads via Play Store CTAs on every page
- Achieve Lighthouse 95+ performance score
- Premium dark aesthetic matching the PlanBot app brand

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
1. **Homepage** — Hero + ticker + features + pricing preview + blog preview + CTA
2. **Features** — Detailed breakdowns + comparison table
3. **Pricing** — 4 tiers (Free/Pro/Elite/God) + boost packs + FAQ
4. **About** — Mission + tech + company
5. **Contact** — Email (mailto) + in-app support
6. **Blog** — MDX-based content marketing
7. **404** — Custom not-found with download fallback

## SEO Requirements
- Auto-generated sitemap.xml and robots.txt
- JSON-LD structured data on every page
- Metadata API for per-page titles, descriptions, OG images
- Canonical URLs on all pages
- FAQ schema on pricing and homepage

## Branding Constraints
- **NEVER reveal specific AI model names** (no Gemini, Grok, Llama, etc.)
- Use generic tier names: Basic AI, Standard AI, Advanced AI, Premium AI
- "Upload Photo" instead of "OCR" for the photo input feature
- "No Ads for Paid Users" instead of "No Ads on Pro"
- Social channels: WhatsApp Channel + Instagram only (no Twitter/LinkedIn)
