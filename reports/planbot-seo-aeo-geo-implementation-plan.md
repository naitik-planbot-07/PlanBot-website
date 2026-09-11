# PlanBot (planbotai.app) — SEO / AEO / GEO Implementation Plan

- **Companion to:** `planbot-seo-aeo-geo-audit-2026-09-11.md`
- **Date:** 2026-09-11
- **Repository:** `C:\Users\khushboo\AndroidStudioProjects\PlanBot website` (Next.js static export → Firebase Hosting)
- **Goal:** Fix all Critical/High findings, then Medium ones, in a sequenced, verifiable way. Each task lists exact files, the change, acceptance criteria, and estimated effort.

---

## Guiding principles

1. **Ship in phases** — Phase 1 (hours) unblocks crawling and fixes data integrity; Phase 2 (days) fixes assets and content quality; Phase 3 (weeks) builds authority. Each phase is independently deployable.
2. **Verify every change** — after each phase: `npm run build`, inspect `out/` artifacts, then deploy to Firebase and spot-check live URLs.
3. **No regressions** — the site currently has zero duplicate titles/descriptions and a perfect sitemap↔build match. Keep it that way.

---

## Phase 1 — Quick wins (hours)

### 1.1 Unblock llms.txt files in robots.txt 🔴 Critical

| | |
|---|---|
| **File** | `src/app/robots.ts` (line ~20) |
| **Problem** | `Disallow: /*.txt` in the `User-Agent: *` group blocks `/llms.txt`, `/llms-full.txt`, `/llm.txt` for Googlebot, Bingbot, and every bot not in the explicit AI list. |
| **Change** | Add before the Disallow rules in the `*` group: `Allow: /llms.txt`, `Allow: /llms-full.txt`, `Allow: /llm.txt`. |
| **Accept** | Built `out/robots.txt` shows the three Allow rules; test with Google's robots.txt tester (or manual longest-match reasoning: `/llms.txt` Allow is more specific than `/*.txt` Disallow). |
| **Effort** | 15 min |

### 1.2 Fix the `dateModified` pipeline bug 🔴 High (data integrity)

| | |
|---|---|
| **File** | `src/lib/mdx.ts` (`getPostBySlug`, lines 61–82) and the `BlogPost` type in the same file |
| **Problem** | `updated` frontmatter is read nowhere in the return object → every built article has `dateModified == datePublished`; 0/63 posts show an update history. |
| **Change** | 1) Add `updated?: string` to the `BlogPost` interface. 2) Return `updated: data.updated \|\| undefined` in `getPostBySlug`. 3) In `src/app/blog/[slug]/page.tsx` (~lines 89, 120): use `post.updated ?? post.date` for JSON-LD `dateModified`, and render an "Updated: \<date\>" byline when `updated` exists. 4) In `src/app/sitemap.ts`, use the same value for post `<lastmod>`. |
| **Accept** | Build a post that has `updated` frontmatter (2 exist) → its HTML contains a distinct `dateModified`; sitemap lastmod differs from others. |
| **Effort** | 1–2 h |

### 1.3 Add `Person` schema + fix author identity signals 🔴 High

| | |
|---|---|
| **Files** | `src/app/author/naitik-baldaniya/page.tsx` (lines 35, 49); `src/app/blog/[slug]/page.tsx` (lines 155, 167); `src/lib/seo.ts` |
| **Problem** | Founder headshot is the brand logo; LinkedIn button links to `https://www.linkedin.com/` (homepage); no `Person` schema anywhere; generic 2-paragraph bio. |
| **Change** | 1) Replace the logo `src` with a real headshot photo (add to `public/images/`). 2) Replace the LinkedIn href with the real profile URL. 3) Add a `Person` JSON-LD node on the author page (`name`, `jobTitle: "Founder"`, `image`, `url`, `sameAs: [LinkedIn, Instagram, X]`, `worksFor` → Organization `@id`). 4) In blog Article schema, reference the author as an object with `url: "/author/naitik-baldaniya"` instead of falling back to `/about`. |
| **Accept** | Author page HTML contains `Person` schema with sameAs; blog bios link to the real profile; no page renders the logo as a person photo. |
| **Effort** | 2–3 h (plus getting a real photo/URL from the founder) |

### 1.4 Complete the entity graph (`sameAs` + `@id`s) 🟠 High

| | |
|---|---|
| **Files** | `src/lib/seo.ts` (lines 146–191); `src/components/Footer.tsx` (lines 43–46) |
| **Problem** | Organization `sameAs` omits X and YouTube (footer links them); no `@id` graph links WebSite/Organization/App schemas. |
| **Change** | 1) Add `https://x.com/planbotai` and the YouTube URL to Organization `sameAs`. 2) Give each layout schema a stable `@id` (`#website`, `#organization`, `#app`, `#mobileapp`) and reference them (e.g., WebSite `publisher: { "@id": "…/#organization" }`). 3) Delete the `LocalBusiness` schema (non-local software company; no address/hours). |
| **Accept** | All JSON-LD on a built page shares `@id` cross-references; LocalBusiness no longer appears anywhere. |
| **Effort** | 1–2 h |

### 1.5 Fix schema gaps: pricing, contact, features 🟠 Medium

| | |
|---|---|
| **Files** | `src/app/pricing/layout.tsx` (new server schema), `src/app/contact/page.tsx`, `src/app/features/page.tsx` (line 104) |
| **Problem** | Pricing page shows a visible FAQ but ships zero FAQPage schema; contact page has zero page-level schema; features page declares `SoftwareApplication` twice. |
| **Change** | 1) Pricing layout: add `WebPage` + `BreadcrumbList` + `FAQPage` (mirror the visible Q&As, including INR prices in answers). 2) Contact: add `ContactPage` + `BreadcrumbList`. 3) Features: remove the duplicate bare `SoftwareApplication`. |
| **Accept** | Rich Results Test reports valid FAQPage on `/pricing`, ContactPage on `/contact`; features page contains exactly one SoftwareApplication node. |
| **Effort** | 2–3 h |

### 1.6 Fix blog content bugs (H1 dupes, tags, frontmatter comment) 🟠 High

| | |
|---|---|
| **Files** | `src/content/blog/deep-work-focus-systems-ai.mdx`, `student-routine-generation-ai.mdx`, `ai-scheduling-workflow-automation.mdx` |
| **Problem** | These 3 posts carry a second H1 inside the MDX body (template already renders the title as H1); 2 posts miss `tags`; ai-scheduling has a stray `# Bing/GSC CTR Fix…` comment inside frontmatter. |
| **Change** | Delete the leading `# …` heading line in each body; demote to `##` if the content is needed; add `tags` arrays; remove the in-frontmatter comment. |
| **Accept** | Built HTML for these 3 posts contains exactly one `<h1>`. |
| **Effort** | 30 min |

### 1.7 Refresh llms.txt family 🟠 High

| | |
|---|---|
| **Files** | `public/llms.txt`, `public/llms-full.txt`, `public/llm.txt`; generator: `scripts/generate-llms-full.js` |
| **Problem** | No mention of `/tools/weather-forecast` or the `/tools`, `/blog`, `/compare`, `/use-cases`, `/contact` hub pages; `llm.txt` is a byte-identical duplicate of `llms.txt`. |
| **Change** | Regenerate via the script after adding the weather tool + hub pages to its source list. Delete `llm.txt` (or make it a short pointer to `llms-full.txt`). Remove the "unlimited plans" claim (see 2.4). |
| **Accept** | `grep -ci weather public/llms*.txt` > 0; all listed URLs resolve against the sitemap. |
| **Effort** | 1 h |

**Phase 1 deploy checklist:** build → verify `out/robots.txt`, one post HTML (dateModified, single H1), `/pricing` FAQPage → deploy → live-check `https://planbotai.app/robots.txt` and resubmit the sitemap in GSC.

---

## Phase 2 — Assets & content quality (days)

### 2.1 Re-export all OG images correctly 🟠 High

| | |
|---|---|
| **Files** | `public/logo.png`, `public/og/*.png` (about, features, pricing), `public/blog/hero_*.png`; metadata declarations in `src/lib/seo.ts` |
| **Problem** | Every "PNG" is actually JPEG data (verified: `FF D8 FF E0` header) at 1024×1024, while metadata declares 1200×630 PNG. |
| **Change** | Re-export each as a true 1200×630 PNG (or WebP where supported) with correct width/height in metadata. Generate per-page OG variants where practical (home, blog hero, compare hub). |
| **Accept** | `file` on each output says PNG, dimensions 1200×630, matching the declared metadata; Facebook Sharing Debugger / Twitter Card Validator show clean previews. |
| **Effort** | 0.5–1 day (design work) |

### 2.2 Expand or merge the 19 thin posts 🟠 High

| | |
|---|---|
| **Files** | `src/content/blog/*.mdx` — 19 posts under 600 words (9 at ~207–235 words, e.g., `ai-planning-busy-professionals-guide` 209w, `ai-routine-planner-for-freelancers` 220w, `automatic-daily-planner-vs-calendar` 219w, `best-ai-productivity-apps-2026` 234w) |
| **Change** | Triage each: (a) expand to 800–1,200+ words with real examples, screenshots, step-by-step use; (b) merge into a pillar post with a 301 redirect in `firebase.json`; or (c) noindex if it serves no search intent. Every post: keep the `aeo-answer` TL;DR block + ≥3 FAQ Q&As in frontmatter (12/63 currently ship FAQPage). |
| **Accept** | No indexed blog post under 600 words; every built post JSON-LD includes FAQPage with ≥3 questions. |
| **Effort** | 3–5 days |

### 2.3 Resolve /blog vs /compare cannibalization 🟠 High

| | |
|---|---|
| **Files** | `src/app/compare/*/page.tsx` (5 pages), the 5 matching `src/content/blog/planbot-vs-*.mdx` posts, plus 4 more near-dup clusters |
| **Change** | Differentiate intent: `/compare/planbot-vs-X` = transactional hub (feature/price **HTML tables**, FAQ, verdict, CTA); blog posts = narrative/experience angle with distinct titles (e.g., "I switched from Todoist to PlanBot for 30 days"). Cross-link both directions. Rename titles so no two URLs share near-identical title strings. |
| **Accept** | No two indexed pages share near-duplicate titles; compare pages contain `<table>` markup. |
| **Effort** | 2–3 days |

### 2.4 Claims-consistency pass 🟡 Medium

| | |
|---|---|
| **Files** | `src/app/pricing/layout.tsx:12`, `src/app/pricing/page.tsx`, `src/app/page.tsx:34`, `public/llms.txt` |
| **Problem** | Metadata promises "unlimited AI plans" while the body caps God tier at "100 plans (All-Time)" and Pro at 4 generations/day; llms.txt repeats "unlimited". |
| **Change** | Pick one truthful framing (e.g., "up to 100 AI plans") and apply it everywhere: metadata, body, llms.txt, Play Store listing text. |
| **Accept** | grep for "unlimited" returns no plan-cap contradictions across those files. |
| **Effort** | 2–4 h |

### 2.5 Sitemap honesty + /refer decision 🟡 Medium

| | |
|---|---|
| **Files** | `src/app/sitemap.ts:11`, `firebase.json:30-35`, new `src/app/refer/page.tsx` metadata or noindex |
| **Change** | Per-post `lastmod` from `updated` (after 1.2); realistic `changefreq` (drop "daily" on static pages). For `/refer`: either add full metadata + sitemap entry or `noindex` it. |
| **Accept** | Built sitemap has distinct lastmods reflecting real edits; `/refer` is either fully indexed or intentionally excluded. |
| **Effort** | 2 h |

### 2.6 Tool pages: schema + snippet content 🟡 Medium

| | |
|---|---|
| **Files** | `src/lib/seo.ts:307-322` (WebApplication price 0 **USD**), the 4 `src/app/tools/*/` pages |
| **Change** | Fix currency (INR context); add `BreadcrumbList` + `WebPage`; add `HowTo` + `FAQPage` with worked examples (daily-schedule-generator is the model — 799 words, example timetable). Add an example input/output section to weather-forecast; link it from the tools grid/footer (currently 2 inbound links). Narrow `SpeakableSpecification` cssSelector from `h1,h2,h3,strong` to `.aeo-answer, .tl-dr` (`src/lib/seo.ts:280`). |
| **Accept** | Each tool page: ≥600 words static content, HowTo+FAQ schema valid, currency consistent. |
| **Effort** | 1–2 days |

---

## Phase 3 — Authority & E-E-A-T (weeks)

### 3.1 Author/entity building 🟠 High
Real founder photo + bio with credentials, years, and product history; real LinkedIn/X profiles referenced in `sameAs`; consider external bylines/profiles that corroborate the author entity.

### 3.2 Citability & proof 🟠 High
- Replace weak proof metrics ("5.0★ by 10 people", unsourced "Save ~10 hours/month") with real, dated usage statistics and a short methodology note.
- Cite external studies in blog posts (no `<blockquote cite>` or external citations exist today).
- Keep testimonials verifiable (first name + role, or link).

### 3.3 Transparency depth 🟡 Medium
- Contact page: add a form or phone, expand support info, ContactPage schema (if not done in 1.5).
- About: company story, founding date, location detail.

### 3.4 Publisher completeness 🟡 Medium
- Add `publisher.logo` ImageObject to Article schema (`src/lib/seo.ts:233-246`).
- Standardize brand naming ("PlanBot") and reduce "PlanBot AI" variant usage.

### 3.5 Cross-surface hygiene 🟢 Low
- Verify the Play package id `cpm.planbot` against the live listing (atypical prefix).
- Add `id`/`start_url` to `site.webmanifest`.
- Remove the duplicate robots meta on `404.html`; add helpful links to the 404 body.
- Confirm legal-page noindexing is acceptable for Play/AdMob review before keeping it.

---

## Suggested execution order & tracking

| Order | Task | Phase | Severity | Est. |
|---|---|---|---|---|
| 1 | 1.1 robots.txt llms.txt Allow | 1 | Critical | 15 m |
| 2 | 1.2 dateModified pipeline | 1 | High | 1–2 h |
| 3 | 1.6 blog H1/tags fixes | 1 | High | 30 m |
| 4 | 1.3 Person schema + author identity | 1 | High | 2–3 h |
| 5 | 1.4 sameAs + @id graph, drop LocalBusiness | 1 | High | 1–2 h |
| 6 | 1.5 pricing/contact/features schema | 1 | Medium | 2–3 h |
| 7 | 1.7 regenerate llms.txt family | 1 | High | 1 h |
| 8 | **Deploy Phase 1 + GSC resubmit** | — | — | — |
| 9 | 2.1 OG image re-export | 2 | High | 0.5–1 d |
| 10 | 2.3 cannibalization resolution | 2 | High | 2–3 d |
| 11 | 2.2 thin-post expansion | 2 | High | 3–5 d |
| 12 | 2.4 claims consistency | 2 | Medium | 2–4 h |
| 13 | 2.5 sitemap honesty + /refer | 2 | Medium | 2 h |
| 14 | 2.6 tool pages schema/content | 2 | Medium | 1–2 d |
| 15 | 3.1–3.5 authority program | 3 | High→Low | 2–4 wks |

## Verification loop (after each deploy)

1. `npm run build` → inspect `out/robots.txt`, `out/sitemap.xml`, 2–3 sampled page heads.
2. Google Rich Results Test on `/`, `/pricing`, one blog post, one tool page.
3. Facebook Sharing Debugger + Twitter Card Validator on `/` (OG images).
4. GSC: resubmit sitemap; URL-inspect `/llms.txt` after Phase 1.
5. Re-run this audit's sweep after Phase 2 to confirm score movement (SEO 78→85+, AEO 72→85+, GEO 62→75+ targets).

*All findings referenced here are evidence-backed in the companion audit document.*
