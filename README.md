# Bipity Bopity Cakes — website

Static, single-page marketing site. Plain HTML5 + one CSS file + one small vanilla JS file. No framework, no build step, no backend, no third-party scripts/fonts/analytics/forms.

## File tree

```
index.html
css/styles.css
js/main.js
images/                     <- put the 6 product photos + logo files here (see below)
icons/                      <- put the app-icon set here (see below)
fonts/                      <- self-hosted display font (Dancing Script) + its OFL license
favicon.ico                 <- root-level favicon
site.webmanifest
robots.txt
sitemap.xml
llms.txt
_headers
README.md
```

## Where the real image files go

Drop these into `images/` with these exact filenames (already referenced in `index.html`):

- `bipity-bopity-logo-header.png` and `bipity-bopity-logo-header.webp` (1000×512 header lockup)
- `bipity-bopity-logo-original-master.png` (full-res original — kept for reference, not referenced on the page)
- `elegant-floral-wedding-cake-lodi-ca.jpg`
- `rose-gold-leaf-cupcakes-lodi-ca.jpg`
- `blue-monster-cookie-cake-lodi-ca.jpg`
- `easter-themed-cupcakes-lodi-ca.jpg`
- `denim-overalls-novelty-cake-lodi-ca.jpg`
- `pink-black-cupcake-number-display-lodi-ca.jpg`
- `whimsical-hobbit-house-cake-lodi-ca.jpg`
- `tropical-18th-birthday-cake-lodi-ca.jpg`
- `ninja-turtle-inspired-birthday-cake-lodi-ca.jpg`
- `ladybug-floral-cake-cupcakes-lodi-ca.jpg`
- `blue-beach-shell-themed-cake-lodi-ca.jpg`
- `wedding-love-cupcake-display-lodi-ca.jpg`

Drop these into `icons/` (already wired into `<link>` tags and `site.webmanifest`):

- `icon-master-1024.png`, `icon-512.png`, `icon-192.png`
- `apple-touch-icon-180.png`
- `favicon-32.png`, `favicon-16.png`

Put `favicon.ico` at the **project root** (next to `index.html`), not inside `icons/`.

If the real photos have different pixel dimensions than the `width`/`height` attributes on the `<img>` tags in `index.html` (currently set to 600×600 as a placeholder aspect ratio), update those attributes to match so the browser can reserve the correct space and avoid layout shift.

## Placeholders that still need a real answer before this goes live

These are intentionally left as clearly-marked placeholders rather than invented — search for them before publishing:

1. **Hours** — `index.html` has `[HOURS TBD]` in the Contact section. Replace with real hours (or an explicit "by appointment / contact to confirm" statement) once Amanda decides.
2. **Home-based / no-address approach** — confirm with Amanda that she's comfortable with the site publicly stating there's no storefront/street address (currently stated in About, FAQ, and Contact, and deliberately omitted from the JSON-LD). If she later gets a public storefront address, add a `PostalAddress` to the JSON-LD and update the FAQ answer.
3. **About section specifics** — see the HTML comment `[ABOUT DETAILS TBD — confirm with Amanda]` inside the About section of `index.html`. Nothing beyond what Amanda provided (name, tagline, service area, product categories) has been invented — no founding year, no credentials, no awards. Add real specifics there once confirmed, and note that hyperlocal specifics (neighborhood names, local landmarks, event types Amanda is known for, etc.) are exactly the kind of detail worth adding once available — that's what makes local SEO/GEO content genuinely competitive.
4. **Final domain name** — the site currently assumes `https://www.bipitybopitycakes.com/` in the canonical tag, Open Graph/Twitter tags, JSON-LD `url`/`image`/`logo` fields, `robots.txt`'s `Sitemap:` line, `sitemap.xml`, and `llms.txt`. Once the real domain is chosen, find-and-replace that URL across all of those files.
5. **"Last updated" date in the footer** — currently hardcoded to September 2026. Update it by hand whenever the page content changes; there's no build step to automate this.
6. **Reviews/testimonials** — none exist yet and none have been fabricated anywhere on the site. Add a real testimonials section only once Amanda has actual customer reviews to quote.
7. **Menu/pricing** — no prices are published anywhere, by design, since none were provided. Add a pricing/menu section only when real numbers exist.

## SEO / GEO notes

- One `<h1>` (business name), with a logical `h2` → `h3` hierarchy; the FAQ's `h3`s are the literal questions people type into Google or ask an AI assistant.
- Full `<head>`: natural-language title (not keyword-stuffed), meta description, canonical link, Open Graph + Twitter Card tags, `theme-color`, and a web app manifest.
- `Bakery` JSON-LD (schema.org) with name, phone, email, `sameAs` (Instagram + Facebook), and `areaServed` (Lodi, Stockton, Galt, Lockeford, San Joaquin County) — deliberately no street address or geo-coordinates.
- `FAQPage` JSON-LD mirrors the visible FAQ answers **word for word**. If you edit the visible FAQ copy, edit the matching JSON-LD block too, or they'll drift out of sync.
- `robots.txt` explicitly allows all crawlers, including AI crawlers (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `PerplexityBot`, `CCBot`), and points to the sitemap.
- `llms.txt` gives AI assistants a short, direct summary plus links to the on-page sections — useful for tools that read it, harmless for those that don't.
- Images use descriptive, keyword-and-location-aware filenames and `alt` text (never `img1.jpg`-style names), and lazy-load via `loading="lazy"` since they're below the fold.
- CSS is written mobile-first: the base rules in `styles.css` are the single-column phone layout, and everything inside `@media (min-width: 700px)` / `@media (min-width: 1000px)` is a progressive enhancement on top of that, never a rewrite of it.

## Security posture

- **Zero third-party requests.** No CDN scripts, no Google Fonts, no analytics, no embeds, no iframes (including no Google Maps, since no address is published). Body copy uses the system font stack; the display headings use Dancing Script, self-hosted from `fonts/DancingScript-Regular.woff2` under the SIL Open Font License (see `fonts/OFL-DancingScript.txt`) rather than loaded from Google Fonts. This is what makes a strict CSP possible.
- **No inline scripts or inline event handlers anywhere.** All JS lives in `js/main.js` and is wired up with `addEventListener`.
- **No forms of any kind.** This is a deliberate choice, not an oversight — phone/email links only, so there is nothing on the site that collects, stores, or transmits visitor data.
- **No cookie/consent banner.** This is intentional, not a bug or an oversight to "fix" — the site sets no cookies, runs no analytics, and has no forms, so there is genuinely nothing for a visitor to consent to. Adding a consent modal here would be dishonest UX (implying data collection that doesn't exist), so please don't add one unless the site's actual behavior changes (e.g., analytics gets added later — at which point the consent banner should come first).
- `_headers` (Netlify/Cloudflare Pages header syntax) sets:
  - `Content-Security-Policy: default-src 'self'; ...` (scripts, styles, and images restricted to same-origin; forms and framing disabled)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` disabling camera, microphone, geolocation, payment, USB, fullscreen, and FLoC (`interest-cohort`)
  - `Strict-Transport-Security` with a long `max-age`, `includeSubDomains`, and `preload`

## Deployment

Deploy to **Cloudflare Pages** or **Netlify** — both read the `_headers` file at the project root and apply those HTTP headers automatically. Static hosts that ignore `_headers` (notably **GitHub Pages**, which has no way to set custom response headers) should be avoided, since the security posture described above depends on those headers actually being sent.

No build command or build output directory is needed — this is a plain static site. Point the host at the repository root.
