# Abeywardhane Gems — Premium Redesign Notes

This is an **upgrade**, not a rebuild. The company identity, logo wordmark,
content, business messaging, routing, SEO and the Express API are all preserved.
The work elevates presentation, motion, layout, 3D and performance.

---

## 1. Brand & colour system

Implemented the requested system in `tailwind.config.js`:

| Role | Token | Value |
|------|-------|-------|
| Luxury Navy | `ink` | `#0F172A` |
| Deep Black | `noir` | `#0A0A0A` |
| Royal Sapphire | `sapphire` | `#2563EB` |
| Electric Blue | `electric` | `#3B82F6` |
| White / off-white | `white` / `cream` `#F8FAFD` | ~60% of surface |

- The original **gold** accent was retired (brief: *avoid gold-heavy themes*).
  The `gold` token is kept as an alias but now maps to a cool **frost**
  `#9FB6E6`, so any legacy class stays on-brand. A new `frost` / `platinum`
  accent replaces gold throughout.
- Colour distribution follows the brief: ~60% white, ~15% navy/black sections,
  ~25% blue highlights.

## 2. Typography

- Kept the distinctive **Cormorant Garamond** (display serif) + **Manrope**
  (body) pairing — already premium and non-generic.
- Added a **fluid type scale** with `clamp()` (`.display-xl`, `.section-title`,
  `.lead`) so headlines scale smoothly from mobile to ultrawide without manual
  breakpoints. Typography is now the strongest design element.

## 3. 3D experience (Three.js + React Three Fiber)

- `components/three/SapphireGem.jsx` — a faceted crystal built from a flat-shaded
  icosahedron with a **custom fresnel GLSL shader** (rim glow + facet shading +
  travelling sparkle), an inner luminous core, and orbiting frost shards. No
  environment maps or post-processing, so it stays light.
- `components/ui/GemStage.jsx` wraps it with:
  - **Lazy loading** (`React.lazy`) → three.js is a *separate chunk* that never
    touches first paint.
  - **`requestIdleCallback`** mount → only after the browser is idle.
  - **Capability gating** → skipped on screens < 640px and where WebGL is
    unavailable; an elegant gradient-glow fallback is shown instead.
  - An **error boundary** → a lost/blocked WebGL context shows the fallback
    rather than crashing the page.
- Honours `prefers-reduced-motion` (rotation slows to near-still).

## 4. Motion system (Framer Motion)

- Page-load: staggered hero reveal synced to the preserved typing headline.
- Scroll: `Reveal` fade-up wrapper (reduced-motion aware) on every section.
- Route changes: subtle cross-fade page transitions in `Layout`.
- Micro-interactions: button light-sweep + arrow nudge, card elevation, animated
  nav underline + dropdown, scroll-progress bar, count-up statistics, marquee
  trust bar, animated global-reach arcs.

## 5. New credibility sections (Home)

Added to build international trust, all content-driven from `data/company.js`:

- **TrustBar** — navy marquee of assurance marks.
- **WhyUs** — four differentiators for international buyers.
- **GlobalReach** — dark section with an animated hub-and-spoke export map and
  four count-up statistics (carats, dealers, destinations, authenticity).
- **Certifications** — quality-assurance / grading / traceability pillars.
- **Testimonials** — modern trust quotes.
- **CtaBand** — closing conversion block.

## 6. Section-by-section upgrades

- **Navbar** — glass sticky bar, mega-dropdown with service icons + descriptions,
  "Get in Touch" CTA, animated mobile drawer. Stays readable over dark headers.
- **Hero** — cinematic split layout: typed headline (preserved) + 3D gem stage
  with the slide photo framed as an inset and a floating certification badge.
- **Footer** — enterprise layout, frost accents, back-to-top.
- **PageHeader** — premium navy gradient + grid texture + electric eyebrow
  (replaces the flat grey header on every inner page).
- **Services / Gallery / Blog / Contact** — unified under `PageHeader`; Gallery
  gains category filtering; Services becomes linked cards.

## 7. Performance & quality

- three.js (~184 KB gzip) and framer-motion are **code-split**; first-paint
  critical path is ~180 KB gzip. `vite.config.js` defines manual vendor chunks
  for better caching.
- `prefers-reduced-motion` respected globally.
- SEO/social meta (canonical, Open Graph, theme-color) added to `index.html`;
  existing title/description retained.
- Verified with a production build + headless render (home, an inner service
  page, contact, and mobile) — **no runtime errors**.

## Running it

```bash
cd client && npm install && npm run dev     # client on :5173
cd server && npm install && npm run dev     # API on :5000 (unchanged)
```
