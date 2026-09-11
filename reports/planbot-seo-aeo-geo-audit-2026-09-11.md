# PlanBot (planbotai.app) — SEO / AEO / GEO Deep Audit

- **Type:** Read-only static audit (no files modified in the repository)
- **Date:** 2026-09-11
- **Scope:** 92 built HTML pages in `out/` · 34 route files in `src/app` · 62 blog MDX files · all configs + `public/`
- **Method:** Programmatic sweep of every built page (titles, descriptions, canonicals, OG/Twitter, JSON-LD, H1s, word counts, inbound links) + full reads of key sources. Top findings independently re-verified from repository artifacts.

---

## Scores

| Pillar | Score | Verdict |
|---|---|---|
| **SEO** — Technical & On-page | **78/100** | Excellent metadata hygiene & serving config; dragged down by OG image mismatches, thin posts, cannibalization |
| **AEO** — Answer Engines | **72/100** | Strong question-driven architecture & aeo-answer blocks; weakened by stale llms.txt and FAQ/schema mismatches |
| **GEO** — Generative Engines | **62/100** | Entity foundations exist; trust/citability signals thin: weak author identity, unverifiable stats, hidden-text patterns |

---

## 1. Executive Summary

This is an unusually well-engineered static site for its size: **90/92 pages ship unique titles, unique meta descriptions, self-referencing canonicals, OG/Twitter tags and JSON-LD**, with 100% image-alt coverage (245/245), a complete sitemap (85 URLs, 0 missing, 0 stale, 0 duplicates), and explicit AI-crawler allowances in robots.txt.

The highest-impact problems are *supply-chain* ones:

- robots.txt `/*.txt` blocks `llms.txt`/`llms-full.txt` for the entire `User-Agent: *` group (including Googlebot and Bingbot)
- All OG images are 1024×1024 JPEGs mislabeled as 1200×630 PNGs
- 5 of 62 blog topics directly cannibalize the /compare/ hub pages

Authority signals are the weakest pillar — a thin author page using the brand logo as a headshot, a LinkedIn button pointing to linkedin.com's homepage, and a `dateModified` pipeline bug that makes every article claim it was never updated.

### Top 10 Issues (ranked by impact)

| # | Issue | Severity | Pillar |
|---|---|---|---|
| 1 | `Disallow: /*.txt` in the `*` robots group blocks `/llms.txt`, `/llms-full.txt`, `/llm.txt` for Googlebot, Bingbot, and any bot not in the explicit AI list | Critical | AEO |
| 2 | All OG/Twitter images (`logo.png`, `og/*.png`, `blog/hero_*.png`) are 1024×1024 JPEG data in .png files, while metadata declares width 1200 × height 630 PNG | High | SEO |
| 3 | Topic cannibalization: `/blog/planbot-vs-{motion,notion,todoist,ticktick,google-calendar}` vs `/compare/planbot-vs-X` with near-identical titles + 4 more near-dup clusters | High | SEO |
| 4 | `dateModified` never populated: `getPostBySlug` drops the `updated` frontmatter field; 0 of 63 built posts have a differing dateModified; no visible "Updated" date | High | GEO |
| 5 | 19/62 blog posts are under 600 words (9 are ~210–235 words) | High | SEO |
| 6 | Author E-E-A-T: brand logo used as founder headshot everywhere; LinkedIn buttons link to `https://www.linkedin.com/` homepage; no `Person` schema; 2-paragraph generic bio | High | GEO |
| 7 | Sitemap `lastmod` = build timestamp for all 85 URLs (all identical `2026-09-09T18:27:32.532Z`) | Medium | SEO |
| 8 | Schema gaps/misuse: pricing page has visible FAQ but no FAQPage; contact page has zero page-level schema; features page duplicates SoftwareApplication; LocalBusiness used for a non-local software company; no `@id` graph | Medium | SEO/GEO |
| 9 | `/tools/weather-forecast` under-linked (2 inbound internal links) and missing from all llms*.txt files | Medium | AEO |
| 10 | Hidden `sr-only` keyword-rich blocks on homepage (`page.tsx:84-91, 458-461`) — hidden-text risk | Medium | GEO |

---

## 2. Pillar Findings

### Pillar 1 — SEO (78/100)

| Severity | Area | Finding | Evidence | Recommended fix |
|---|---|---|---|---|
| Critical | OG images | Every OG image is JPEG data in a `.png` file at 1024×1024; metadata declares 1200×630 PNG. *Independently verified: logo.png starts with bytes `FF D8 FF E0` (JPEG) and measures 1024×1024.* | `file public/logo.png` → "JPEG image data … 1024x1024"; same for `out/og/about.png`, `out/og/features.png`, `out/og/pricing.png`, `out/blog/hero_deep_work.png`, `out/blog/hero_jee.png`; built `out/index.html` og:image:width=1200/height=630 | Re-export real 1200×630 PNG/WebP OG images; align declared dimensions |
| High | Titles | 11 pages exceed 60 chars decoded, worst 70–74; `createMetadata` cap measures pre-template title, so the "\| PlanBot" suffix pushes past 60 | `out/blog.html` = 70 chars; `src/app/blog/page.tsx:8`; cap logic `src/lib/seo.ts:46-50` | Include template suffix in the length guard; shorten hub-page titles |
| High | Headings | 3 blog posts have duplicate H1 (template H1 + `# H1` inside MDX body); same 2 posts also missing `tags` | `out/blog/deep-work-focus-systems-ai.html`, `out/blog/student-routine-generation-ai.html`, `out/blog/ai-scheduling-workflow-automation.html` (2× H1 each); stray comment `# Bing/GSC CTR Fix…` inside frontmatter of ai-scheduling | Strip leading `#` from MDX bodies; remove in-frontmatter comment |
| High | Content depth | 19/62 posts under 600 body words; 9 posts ~207–235 words | `ai-planning-busy-professionals-guide` (209w), `ai-routine-planner-for-freelancers` (220w), `automatic-daily-planner-vs-calendar` (219w), `best-ai-productivity-apps-2026` (234w), etc. | Expand or merge into pillar posts; add real examples/data |
| High | Indexing policy | Legal pages noindexed (privacy, terms, refund, account-deletion) and excluded from sitemap | `out/privacy-policy.html` robots meta `noindex, follow`; `src/app/sitemap.ts:10,36` | Deliberate per code comments — keep, but note Play Store / AdMob reviewers may expect crawlable refund/privacy pages (inference on reviewer behavior) |
| Medium | Sitemap | All 85 `lastmod` values are the identical build timestamp; changefreq "daily" on static pages | `out/sitemap.xml` (85× `2026-09-09T18:27:32.532Z`); `src/app/sitemap.ts:11` | Use real per-post `updated` dates; drop lastmod on unchanged pages |
| Medium | Canonicals | hreflang alternates render as `hrefLang` (React camelCase leak) — valid HTML (case-insensitive) but unusual; all 3 point to same URL on a single-language site | `out/pricing.html`: `<link rel="alternate" hrefLang="en-US" …/>` ×3; `src/lib/seo.ts:71-78` | Harmless; optionally drop en-IN/x-default self-hreflang or fix casing |
| Medium | Schema | `LocalBusiness` for a software company (no address/geo/hours); duplicate `SoftwareApplication` on features page; no `@id` linking between the 4 layout schemas | `src/lib/seo.ts:182-191` (`priceRange: '₹₹'`, no address); `src/app/features/page.tsx:104` (2nd bare SoftwareApplication) | Replace LocalBusiness with `Organization` only; add `@id`s and dedupe |
| Medium | Serving | Firebase: immutable cache for js/css/images ✓, security headers ✓, 3 redirects ✓; cleanUrls + trailingSlash:false consistent with `formatUrl` | `firebase.json:11-114`; `next.config.js:3-8` | No action — considered a strength |
| Low | 404 | `out/404.html` ships two robots meta tags (`noindex` + `noindex, nofollow`); 153 words; H1 "404" | `out/404.html` head | Remove duplicate meta; add helpful links to 404 body |
| Low | Refer page | `/refer` (rewritten landing) has title only ("PlanBot Refer", 13 chars), no description/canonical/OG/viewport/JSON-LD, 0 internal inbound links | `out/refer/index.html` sweep row; rewrite rule `firebase.json:30-35` | Treat as a real page: add metadata or noindex it |

**Metadata quality matrix (92 built pages):** titles 90/92 · descriptions 89/92 · canonical 87/92 · OG 89/92 · JSON-LD 89/92 · hreflang alternates 90/92 · noindex 5/92. Missing elements are confined to `google5a863c2b0b03eaa7.html` (GSC verification artifact — expected) and `refer/index.html`. Zero duplicate titles and zero duplicate descriptions across all 92 pages (verified by exact-match hash). Notable: `out/blog.html` title is 70 chars. 31/62 frontmatter descriptions exceed 160 chars raw, but built meta descriptions all ≤160 after entity decoding — the cap works.

### Pillar 2 — AEO (72/100)

| Severity | Area | Finding | Evidence | Recommended fix |
|---|---|---|---|---|
| Critical | llms.txt access | `Disallow: /*.txt` blocks `/llms.txt`, `/llms-full.txt`, `/llm.txt` for the `*` group (Googlebot, Bingbot/Copilot grounding, any unlisted bot). Explicit AI bot groups (GPTBot, ClaudeBot, PerplexityBot…) only disallow `/api/`, so they can still fetch it — but Bing and others cannot. *Independently verified in built robots.txt.* | `out/robots.txt` (line: `Disallow: /*.txt`); `src/app/robots.ts:20` | Add `Allow: /llms.txt`, `/llms-full.txt`, `/llm.txt` to the `*` group |
| High | llms.txt freshness | All three files lack any mention of `/tools/weather-forecast` (0 grep matches) and omit `/tools` hub, `/blog`, `/compare`, `/use-cases`, `/contact` index pages; `llm.txt` is a byte-identical duplicate of `llms.txt` (7,227 bytes each) | `grep -ci weather public/llms.txt public/llm.txt public/llms-full.txt` → 0/0/0; `public/llm.txt` head | Regenerate via `scripts/generate-llms-full.js` including weather tool; drop or differentiate `llm.txt` |
| High | FAQ/schema mismatch | Pricing page shows "Frequently Asked Questions" section but has no FAQPage JSON-LD (page-level schema absent entirely) | `out/pricing.html` H2 "Frequently Asked Questions"; sweep: pricing.jsonldTypes = layout-only; `src/app/pricing/page.tsx` is `'use client'` with schema-less layout (`src/app/pricing/layout.tsx:14-16`) | Add FAQPage + WebPage + BreadcrumbList via a server layout |
| Medium | Tool pages | Only `WebApplication` schema (offers price 0 **USD**, inconsistent with INR pricing elsewhere); no FAQPage/HowTo/BreadcrumbList/WebPage; pomodoro page 392 words static | Sweep `tool` class ld = WebApplication only; `src/lib/seo.ts:307-322` (USD); `out/tools/pomodoro-focus-calculator.html` 392 words | Add HowTo + FAQ schema & content; align currency; breadcrumbs |
| Medium | Tool snippet-worthiness | daily-schedule-generator is strong (799 words, worked example timetable, 3 golden rules, 1 question H2); weather-forecast has no example input/output narrative in static HTML; only 2 internal inbound links to weather tool | Heading dump of `out/tools/daily-schedule-generator.html`; inbound links: only `tools(1)`, `blog/gpt-6-astra-launch-benchmarks-review(1)` | Add "example" sections + HowTo schema; link weather tool from footer/nav |
| Medium | Blog answer-first | 12/63 posts ship FAQPage, 2/63 HowTo; most posts open with an `aeo-answer tl-dr` Quick Answer block (matches speakable cssSelectors); but thin posts (e.g., `best-ai-productivity-apps-2026`, 234w) have no aeo-answer block | `src/content/blog/*.mdx` heads; `src/lib/seo.ts:272-283`; sweep firstLine samples | Ensure every post has TL;DR + at least 3 FAQ Q&As in frontmatter |
| Low | Speakable | `SpeakableSpecification` cssSelector includes `h1, h2, h3, strong` sitewide — far too broad for voice extraction | `src/lib/seo.ts:280` | Narrow to `.aeo-answer, .tl-dr` |
| Low | Tables | Compare pages use card lists, no `<table>` markup (table snippets favored for "X vs Y" queries) | `out/compare/planbot-vs-motion.html` structure | Add HTML comparison tables with prices/features |

### Pillar 3 — GEO (62/100)

| Severity | Area | Finding | Evidence | Recommended fix |
|---|---|---|---|---|
| High | E-E-A-T / author | Author page: brand logo rendered as founder headshot; "Connect on LinkedIn" → `https://www.linkedin.com/` (homepage, not a profile); same dead link on every blog post bio; no `Person` schema on author page (only WebPage+Breadcrumb); 2-paragraph generic bio, no credentials/years | `src/app/author/naitik-baldaniya/page.tsx:35,49`; `src/app/blog/[slug]/page.tsx:155,167`; sweep `author` class ld | Real photo, real LinkedIn URL, `Person` schema with `sameAs`, substantive bio |
| High | Entity graph | Organization `sameAs` lists WhatsApp, Instagram, Play Store only — omits X (`x.com/planbotai`) and YouTube (`youtube.com/@planbotai`) that the footer links; founder.sameAs = Instagram only; no `@id` anywhere except unused LocalBusiness `#organization` | `src/lib/seo.ts:146-148,169-173` vs `src/components/Footer.tsx:43-46` | Add X/YouTube to sameAs; build `@id` graph across WebSite/Organization/App |
| High | Citability | Weak proof metrics: "5.0★ by 10 people" (n=10); unsourced claims like "Save ~10 hours/month" (pricing); testimonials unverifiable; no external citations anywhere in sampled content | `src/app/page.tsx:262, 89` (`valueBadge` in `src/app/pricing/page.tsx:89`); no `<blockquote cite>`/external links found in samples | Publish real usage stats with dates/method; cite studies; document methodology |
| Medium | Claims consistency | Pricing metadata says "Unlock unlimited AI plans" while the page body caps God tier at "100 plans (All-Time)" and Pro at 4 generations/day; home FAQ "2 AI plans per day" matches pricing's "2 Plan Generations per day" ✓; llms.txt pricing ₹99/₹129/₹249 matches pricing page ✓; llms.txt "unlimited plans" for paid tiers conflicts with 100-plan cap | `src/app/pricing/layout.tsx:12` vs `src/app/pricing/page.tsx` features; `src/app/page.tsx:34`; `public/llms.txt` (key facts) | Reconcile "unlimited" wording across metadata, body, llms.txt |
| Medium | Hidden text | `sr-only` blocks with keyword-dense copy ("routine planner AI", "AI organization tool", "adaptive multi-tier neural scheduling") on homepage; brand variant "PlanBot AI" appears 90× in built text | `src/app/page.tsx:84-91, 458-461` (10 sr-only occurrences on 2 pages) | Surface this copy visibly or remove; keep naming consistent ("PlanBot") |
| Medium | Freshness mechanics | All 62 posts dated 2026-03-22→2026-09-07; `updated` frontmatter exists on only 2 posts and is dropped by `getPostBySlug`, so built dateModified == datePublished for all 63 posts; visible byline shows "Published" only, never "Updated". *Independently verified: the return object in `getPostBySlug` has no `updated` field.* | `src/lib/mdx.ts:61-82` (no `updated` in return); `src/app/blog/[slug]/page.tsx:89,120`; built check: `gpt-6-astra…` dateModified=2026-09-07 despite frontmatter 2026-09-09 | Return `updated` in getPostBySlug; show "Updated" visibly |
| Medium | Publisher/author separation | Article `publisher: PlannextTech` (no logo property — Google recommends publisher.logo); author URL falls back to `/about` for posts when author.url missing; brand naming consistent: "PlanBot" 7,360×, "PlannextTech" 1,790× in built text | `src/lib/seo.ts:233-246`; brand counts from sweep | Add publisher.logo ImageObject; set author.url to `/author/naitik-baldaniya` |
| Medium | Cross-surface | `site.webmanifest` valid but minimal (no start_url/id); ads.txt (web) + app-ads.txt (AdMob pub-3116029324582082 DIRECT) present and explicitly allowed in robots; Play package `cpm.planbot` consistent across schema/footer/PlayStoreLink — but "cpm" is an atypical package prefix (com.planbot expected) (inference: verify against live Play listing) | `public/site.webmanifest`; `public/ads.txt`, `public/app-ads.txt`; `src/components/PlayStoreLink.tsx:6`; `src/lib/seo.ts:109` | Verify package id; add `id`/`start_url` to manifest |
| Low | Contact transparency | Contact page: email + "Kutch, Gujarat, India" + in-app support path; no phone/form/physical address; 200 words; zero page-level JSON-LD | `out/contact.html` text dump; sweep contact ld = layout-only | Add ContactPage schema, contact form or phone, expand support info |
| Low | IndexNow | Build pipeline pings IndexNow with key file `d3b07384d113edec49eaa6238ad5ff00.txt` (explains the mystery .txt in public/) | `scripts/submit-indexnow.js:4-8`; `package.json:13` | No action — strength |

---

## 3. Route Reconciliation

| Item | Result |
|---|---|
| Built HTML pages | 92 (90 indexable candidates + `404.html` + `google5a863c2b0b03eaa7.html`) |
| Sitemap entries | 85 = 22 static/core + 1 `/blog/ai-planner-guide` (hard-coded route) + 62 MDX posts |
| In sitemap but not built | **0** |
| Duplicate sitemap entries | **0** |
| Broken/stale entries | **0** — the sitemap is fully consistent with the build |
| Built & indexable, not in sitemap | 5: `/privacy-policy`, `/terms`, `/refund-policy`, `/account-deletion` (intentional per `src/app/sitemap.ts:10,36` — all noindexed, consistent) and `/refer` (indexable, sitemap-less, metadata-less — inferred oversight) |
| MDX ↔ sitemap | all 62 MDX slugs present; the 63rd blog entry is the hard-coded `src/app/blog/ai-planner-guide/page.tsx` route |
| Internal linking gaps | `/tools/weather-forecast` → 2 inbound; `/use-cases/ai-planner-for-working-professionals` → 3 inbound; `/refer` → 0 inbound (rewrite-only) |

---

## 4. Structured Data Inventory

Layout schemas present on all 92 pages: `WebSite` · `Organization` · `SoftwareApplication` + `MobileApplication` · `LocalBusiness`

| Page type (n) | Present | Missing-but-expected |
|---|---|---|
| Home (1) | FAQPage, WebPage, BreadcrumbList, WebPage+Speakable | — (could add AggregateRating only with review-policy compliance) |
| Blog posts (63) | Article, WebPage, BreadcrumbList, +FAQPage (12), +HowTo (2), Speakable | `Person` author node; `publisher.logo`; real `dateModified` |
| Blog index (1) | ItemList (URLs only) | `Blog`/`CollectionPage` type, BreadcrumbList |
| Compare detail (5) | WebPage, BreadcrumbList, FAQPage | Product/Offer price data (prices shown only as text) |
| Use-case detail (3) | WebPage, BreadcrumbList, FAQPage | — |
| Tools (4) | WebApplication (price 0 USD) | WebPage, BreadcrumbList, FAQPage, HowTo |
| Tools index (1) | WebPage, BreadcrumbList, FAQPage | — |
| Pricing (1) | none (layout-only) | WebPage, BreadcrumbList, FAQPage (FAQ visible on page), Offer/price |
| Features (1) | WebPage, BreadcrumbList + duplicate bare SoftwareApplication | dedupe SoftwareApplication |
| Author (1) | WebPage, BreadcrumbList | **Person**, ProfilePage |
| Contact (1) | none | WebPage/ContactPage, BreadcrumbList |
| About (1) | WebPage, BreadcrumbList | — |
| Legal ×4 + 404 | WebPage/Breadcrumb (legal) / layout-only (404) | n/a (noindexed) |

---

## 5. Not Verifiable Statically

- Live indexing / GSC data · actual SERP rankings & snippet wins · PageSpeed/CWV in the field
- Live Firebase redirect/header behavior (config inspected only)
- Whether the Play Store listing matches `cpm.planbot`, the 5.0 rating, and "10 people" review count
- Existence of the X/YouTube/WhatsApp/Instagram profiles linked in the footer
- Accuracy of competitor claims (Motion "$19–$34/mo", "requires credit card")
- Real user consent/GDPR exposure of GA4 + Microsoft Clarity (no consent mechanism found — observed absence, impact inference)
- Whether AI engines fetch llms.txt in practice · IndexNow ingestion results · email reachability of plannexttech@gmail.com

---

## 6. Prioritized Remediation Roadmap (summary)

**Quick wins (hours)**
1. robots.ts: add `Allow: /llms.txt`, `/llms-full.txt`, `/llm.txt` (fixes #1 critical)
2. Fix `src/lib/mdx.ts:61-82` to return `updated`; show "Updated:" in the byline; set 2 missing `tags` fields; strip duplicate H1s from 3 MDX bodies
3. Add WhatsApp/X/YouTube to Organization.sameAs; add `Person` schema + real LinkedIn URL + author photo on the author page and blog bios
4. Add FAQPage/Breadcrumb/WebPage schema to the pricing layout; ContactPage schema to contact; dedupe features SoftwareApplication; remove LocalBusiness
5. Drop or differentiate `llm.txt`; regenerate llms files including the weather tool + hub pages

**Medium (days)**
6. Re-export all OG images as true 1200×630 PNGs; correct declared dimensions
7. Expand the 19 thin posts (or noindex/merge into pillars); add aeo-answer TL;DR + ≥3 FAQs to every post; add comparison tables to /compare pages
8. Resolve cannibalization: differentiate /blog vs /compare intents; cross-link with distinct titles
9. Real sitemap lastmod from post `updated` dates; honest per-page changefreq; decide /refer (index+meta or noindex)

**Larger efforts (weeks)**
10. E-E-A-T program: substantive founder bio with credentials/history, author entity building, methodology page, real usage statistics with dates, claims-consistency pass across home/pricing/features/blog/llms.txt

---

## Verification Status

Top findings #1 (robots.txt rule present in `out/robots.txt`), #2 (logo.png = JPEG bytes `FF D8 FF E0`, 1024×1024), and #4 (`getPostBySlug` in `src/lib/mdx.ts` omits `updated` from its return object) were **independently re-verified** from repository artifacts. All other findings are sweep observations with cited file/line evidence and were not individually re-checked.

*Workspace: `C:\Users\khushboo\AndroidStudioProjects\PlanBot website` · Companion document: `planbot-seo-aeo-geo-implementation-plan.md`*
