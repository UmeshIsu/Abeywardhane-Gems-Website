# Abeywardhane Gems — SEO Overhaul: Consolidated Report

**Site:** https://www.abeywardhanegems.com · **Stack:** Vite + React 18 (build-time prerendered via `vite-react-ssg`), Tailwind, deployed on Vercel · **Last updated:** 2026-06

This document consolidates the deliverables for the SEO/UX/CRO overhaul: audit, keyword mapping, metadata, internal linking, schema, Core Web Vitals, conversion optimisation, sitemap/robots, the file-by-file change log, and the owner action items.

---

## 1. Executive summary

The site began as a **client-rendered SPA that shipped one crawlable page** (an empty `<div id="root">`); non-JS crawlers and social bots saw no content and no per-page metadata. It is now a **build-time–prerendered site of 32 static, schema-rich pages**, each with unique metadata, canonical URLs (on the correct `www` host), JSON-LD structured data, and embedded conversion paths.

**Status by phase:** ✅ 1 Technical foundation · ✅ 4 Money pages · ✅ 5 Knowledge hub · ✅ 6 E-E-A-T/About · ✅ 7 Internal linking · ✅ 8 Image optimisation (WebP/AVIF) · ✅ 9 Core Web Vitals · ✅ 10 CRO · ✅ 11 Local SEO · ✅ 13 This report. Outstanding: 12 ongoing content expansion.

---

## 2. SEO audit — issues found & resolved

| # | Issue (before) | Resolution |
|---|----------------|------------|
| H1 | CSR SPA → empty HTML to non-JS crawlers/social bots | Build-time prerender of all public routes (`vite-react-ssg`); real HTML + per-page `<head>` |
| H2 | Canonicals, sitemap, robots all pointed to **non-www** (live host is www) | Standardised on `https://www.abeywardhanegems.com` everywhere |
| H3 | No `og:image`/Twitter image → blank social cards | Full OG/Twitter set + image on every page |
| H4 | Conflicting NAP (Pelmadulla vs Ratnapura) | Single source of truth in `data/site.js` |
| H5 | Only H1 was an animated typewriter (empty at first paint) | Stable, keyword-rich H1 rendered immediately; animation is progressive enhancement |
| H6 | No landing pages for priority keywords | 8 money pages + 3 local pages built |
| H7 | Weak E-E-A-T (no About, no named experts) | About page with story, process, team scaffold, trust signals |
| H8 | ~970 kB shared vendor chunk | Resolved — admin removal tree-shook heavy deps (now ~253 kB) |
| M1 | Thin, homepage-only schema | Org/WebSite/LocalBusiness/Product/Service/Article/FAQ/AboutPage/Breadcrumb across the site |
| M2 | Brand-first titles | Keyword-first titles (`{keyword} | Abeywardhane Gems`) |
| M5 | Dead `href="#"` social links | Config-driven; real Facebook + Instagram |
| M6 | Static, non-www sitemap | www host, all pages, realistic priorities |
| M7 | Footer-only internal links, no breadcrumbs | Breadcrumbs sitewide + footer gemstone column + contextual cross-links |

---

## 3. Keyword mapping

| URL | Primary target | Secondary |
|-----|----------------|-----------|
| `/` | Ceylon sapphire, certified gemstones Sri Lanka | brand |
| `/ceylon-blue-sapphire` | Ceylon Blue Sapphire | Natural/Certified Ceylon Sapphire, Buy Ceylon Blue Sapphire |
| `/padparadscha-sapphire` | Padparadscha Sapphire | Natural Padparadscha Sri Lanka |
| `/yellow-sapphire` | Yellow Sapphire Sri Lanka | Pukhraj |
| `/pink-sapphire` | Pink Sapphire Sri Lanka | — |
| `/white-sapphire` | White Sapphire Sri Lanka | diamond alternative |
| `/ceylon-ruby` | Ceylon Ruby | Natural Sri Lankan ruby |
| `/gem-export-services` | Gem Export Services | certified sapphire exporters |
| `/gem-exporters-sri-lanka` | Gem Exporters Sri Lanka | Sri Lanka Gemstone Export Company |
| `/wholesale-gemstones-sri-lanka` | Wholesale Gemstones Sri Lanka | gem suppliers Sri Lanka |
| `/gem-dealers-ratnapura` | Gem Dealers Ratnapura | Gem Dealers Sri Lanka |
| `/gem-dealers-colombo` | Gem Dealers Colombo | Gem Shop Sri Lanka |
| `/about` | (entity/brand authority) | gem experts Sri Lanka |
| `/blog/*` | informational & long-tail | "how to identify natural sapphires", "sapphire certification", "blue sapphire price", etc. |
| `/services/*` | gem purchasing, int'l market, gemology, gem tourism | — |

Title/description (metadata) for every page is defined in its page component via `<SEO>` and verified present (and unique) in the prerendered HTML.

---

## 4. Schema (JSON-LD) report

All schema is SSR-safe (built in `client/src/lib/seo.js`, no `window`) and validates.

| Page type | Schema |
|-----------|--------|
| Home | Organization + WebSite + LocalBusiness(Store/JewelryStore) |
| Gem money pages | Product + FAQPage + BreadcrumbList |
| Export / Wholesale | Service + FAQPage + BreadcrumbList |
| Local pages | LocalBusiness + FAQPage + BreadcrumbList |
| About | Organization + AboutPage + BreadcrumbList |
| Article pages | Article + FAQPage + BreadcrumbList |
| Blog index | Blog + BlogPosting |
| Contact | LocalBusiness + ContactPage |
| Service pages | Service + BreadcrumbList |
| Gallery | ItemList of Products |

**Validate at:** https://search.google.com/test/rich-results

---

## 5. Internal linking report

- **Breadcrumbs** on every inner page (visual + `BreadcrumbList` JSON-LD), auto-generated by `PageHeader`.
- **Footer (sitewide):** a "Gemstones" column linking all 6 gem pages; Quick Links include About, Wholesale, Export, Gem Exporters SL, Gallery, Blog, Contact.
- **Homepage Collection** cards link to their gem money pages.
- **Money pages** cross-link to related gems + wholesale + export.
- **Local pages** cross-link to money pages and each other.
- **Articles** (pillar + clusters) link to each other and down into money pages; money/commercial pages are the conversion targets of the topical cluster.

---

## 6. Core Web Vitals report

- **Rendering:** prerendered HTML → fast First Contentful Paint; hero headline present immediately (better LCP) rather than typed-in.
- **JS payload:** public pages load ~`app` (193 kB) + `motion` (107 kB) + `vendor` (253 kB) ≈ 165 kB gzip. The previous ~970 kB vendor chunk is resolved (admin-only deps tree-shaken out).
- **Images (Phase 8 — done):** all `/public` photos now have committed **WebP + AVIF** variants (≤2000px), served via a `<Picture>` component (AVIF → WebP → original). Oversized JPG originals were recompressed in place — **~17 MB saved** (e.g. `hero-tourism.jpg` 7.7 MB → 581 KB, `service-tourism.jpg` 8 MB → 615 KB). Re-runnable via `npm run optimize:images`; generated as static assets so the Vercel build needs no `sharp`.
- **Images:** content images use explicit `width`/`height` (CLS-safe), `loading="lazy"`/`eager`, and descriptive `alt`.
- **Fonts:** preconnected Google Fonts with `display=swap`.
- **Minor follow-up:** `logo-mark.png` (favicon) is still ~817 KB — could be downscaled.

---

## 7. Conversion optimisation report

- **Inquiry forms embedded** on every money page (6 gem pages, wholesale, export), pre-tagged by page so leads identify their source. Built on Web3Forms (no backend).
- **Trust badges** (ethically sourced · gemologist-verified · independent certification · secure export) beside each form.
- **Multi-channel CTAs:** WhatsApp (sticky FAB sitewide + per-page), phone, email on every conversion block.
- **Certification & "what drives price"** sections on gem pages reduce buyer uncertainty.
- **About page** trust signals (process, authenticity guarantee, team) support all conversions.

---

## 8. Sitemap & robots

- **`sitemap.xml` is auto-generated at build** by `vite.config.js` (`ssgOptions.onFinished`) from the actual prerendered output — it can never drift. `client/public/sitemap.xml` remains as a dev fallback. 32 URLs, `www` host, depth-based priorities.
- `client/public/robots.txt` — allows all, disallows `/admin`, points to the `www` sitemap.

---

## 9. File-by-file change log

**New infrastructure & data**
- `client/src/lib/seo.js` — SSR-safe JSON-LD builders + `absoluteUrl`.
- `client/src/data/site.js` — single source of truth (SITE_URL, NAP, business, socials, `sameAs`).
- `client/src/data/gemstones.js`, `data/localPages.js`, `data/articles.js`, `data/about.js` — content.

**Rendering / build**
- `client/src/main.jsx` — `ViteReactSSG` entry; `client/src/App.jsx` — routes array (money/local/article routes generated from data).
- `client/vite.config.js` — `ssgOptions` (nested URLs, async scripts, `/admin` excluded).
- `client/package.json` — `vite-react-ssg build`; `client/index.html` — duplicate head tags removed.

**Components & pages**
- `components/layout/SEO.jsx` (SSR-safe, keyword-first, `<Head>`), `PageHeader.jsx` (auto breadcrumb schema), `Footer.jsx` (gemstone column, real socials), `Navbar.jsx` (About link, SSR-safe language).
- `components/sections/Hero.jsx` + `data/heroSlides.js` (stable keyword H1), `Collection.jsx` (links to gem pages).
- `components/ui/InquiryForm.jsx` + `components/sections/InquirySection.jsx` (CRO).
- Pages: `pages/gemstones/GemstonePage.jsx`, `GemExportServices.jsx`, `WholesaleGemstones.jsx`, `pages/local/LocalPage.jsx`, `pages/blog/ArticlePage.jsx`, `About.jsx`; `Home/Services/Gallery/Blog/Contact/NotFound` + 4 service pages updated with per-page SEO/schema.

**Crawl files:** `public/sitemap.xml`, `public/robots.txt`.

---

## 10. Owner action items (to unlock full value)

Search `TODO-VERIFY` in the codebase.

1. **`data/site.js`** — confirm exact street address, postal code, GPS coordinates, registered legal name, founding year. (NAP must match your Google Business Profile exactly.)
2. **`data/about.js`** — add real gemologist/founder **names + credentials** (GIA/FGA, etc.) and genuine **industry memberships** (e.g. NGJA, ICA). Names/memberships stay hidden until filled, so nothing fabricated is published.
3. **OG image** — add a dedicated 1200×630 share image and point `DEFAULT_OG_IMAGE` to it.
4. **Web3Forms** — set `VITE_WEB3FORMS_KEY` in `client/.env` so inquiry forms deliver.
5. **Post-deploy** — submit the sitemap in Google Search Console; validate key pages in the Rich Results Test; convert `/public` images to WebP/AVIF (Phase 8).

---

## 11. Notes
- The `/admin` panel and its backend (Supabase/Express) were removed from the app during this work; routing reflects that.
- Nothing has been committed automatically — review the diff and commit when ready.
