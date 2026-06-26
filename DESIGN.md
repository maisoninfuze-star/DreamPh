# DESIGN.md — Dream PH Spa (inspired by botabota.ca)

## Source
- Reference URL: https://botabota.ca/ (Bota Bota, spa-sur-l'eau — Montréal)
- Capture date: 2026-06-26
- Evidence: live Chrome review (computed styles + full-page screenshots)
- NOTE: Reference only. We reproduce the *design language* (layout, type system,
  spacing, palette logic) — NOT Bota Bota's logo, photography, or copy. All Dream PH
  imagery is generated fresh; all copy is original.

## Design Summary
Calm, editorial, photography-led luxury spa aesthetic. Full-bleed image bands carry
oversized elegant serif titles with tiny uppercase eyebrows and understated uppercase
CTAs. These alternate with airy white text sections. Neutral palette; the photography
and generous whitespace do the work. Quiet, premium, unhurried.

## Design Tokens

### Colors (adapted for Dream PH — warm editorial neutral)
- `--bg`        #FAF6F0  warm ivory page background
- `--bg-pure`   #FFFFFF  pure white (alternating sections)
- `--ink`       #1F1A16  warm near-black (primary text/headings)
- `--ink-soft`  #6B625A  muted warm gray (eyebrows, captions, body-secondary)
- `--line`      #E4DACE  hairline borders / dividers
- `--dark`      #241F1B  warm charcoal (dark sections, footer)
- `--on-dark`   #F3ECE2  text on dark
- `--gold`      #A9854A  muted brand gold (accent, used sparingly: rules, hovers)
- `--gold-soft` #C7A973

### Typography
- Display / headings: **Cormorant Garamond** (high-contrast elegant serif; the
  botabota hero "didone" feel). Fallback: Lora, Georgia, serif.
- Body / nav / UI: **Jost** (geometric sans, Azo-Sans substitute). Fallback: "Helvetica Neue", Arial, sans-serif.
- Scale (desktop):
  - Hero display: clamp(3.5rem, 9vw, 8rem), weight 500, line-height 1.0, letter-spacing -0.01em
  - Section title: clamp(2.25rem, 5vw, 4rem), weight 500, line-height 1.05
  - Eyebrow: 0.78rem, weight 500, uppercase, letter-spacing 0.22em, color ink-soft
  - Body: 1.0625rem, weight 400, line-height 1.7
  - CTA / nav: 0.8rem, uppercase, letter-spacing 0.18em, weight 500

### Spacing & Layout
- Container: max-width 1280px, side padding clamp(1.25rem, 5vw, 5rem)
- Section vertical rhythm: clamp(5rem, 12vh, 9rem) top/bottom
- Hairline dividers (1px, --line) under eyebrows/CTAs
- Radius: mostly 0 (sharp editorial); images radius 2px max
- Shadow: avoid; rely on whitespace and photography

## Components
- **Nav:** transparent over hero → solid ivory on scroll. Left wordmark logo,
  centered/spaced uppercase Jost links, right "RÉSERVER" pill + lang toggle.
- **Hero:** full-viewport photo, dark gradient scrim, centered eyebrow + giant serif
  title + underlined uppercase CTA.
- **Image band:** full-bleed photo (60–90vh) with overlaid title block (eyebrow,
  serif title, CTA). Used for feature/teaser sections.
- **Text section:** white/ivory, eyebrow → big serif headline → sans body → outlined
  uppercase button (1px border, generous padding, hover fills gold/ink).
- **Service/menu cards:** simple — image top, serif name, price in gold, thin divider.
- **Footer:** warm charcoal --dark, --on-dark text, small uppercase columns, gold hovers.

## Page Patterns (one elegant scrolling page)
1. Hero (full-bleed) — brand promise + RÉSERVER
2. Intro / "Bienvenue" — short editorial paragraph, centered, ivory
3. Image band — "Nos Soins" teaser
4. Services grid — Massages / Hammam / Forfaits (3 cards)
5. Image band — Jacuzzi & VIP / sensual ambiance teaser
6. Experience / why us — 3–4 value points
7. Tarifs / menu highlight — a few signature prices
8. Contact / Réservation — address, hours, phone/WhatsApp, map link, CTA
9. Footer

Responsive: bands stack title under image on mobile; grids 3→1; nav → burger.

## Content Style
Calm, sensorial, minimal. Tiny uppercase eyebrows ("NOUVEAUTÉ", "NOS SOINS"),
elegant serif titles ("Prenez le temps de vous"), short evocative body lines,
understated CTAs ("Découvrir", "Réserver"). FR primary, EN toggle optional.

## Agent Build Instructions
Static site (HTML/CSS/JS, no framework) for easy Vercel static hosting.
- Google Fonts: Cormorant Garamond (500,600) + Jost (400,500).
- Mobile-first; use `clamp()` for fluid type; respect iOS scroll (no overflow-x:hidden on html).
- Light scroll-reveal (IntersectionObserver fade-up) — must always end visible (safety net).
- Generate Dream PH imagery with fal.ai (warm, moody, sensual-but-tasteful spa).
- Original FR copy for Dream PH (Casablanca): massages signature/traditional/Thai,
  hammam rituals, jacuzzi & VIP, forfaits; phone/WhatsApp +212 6 82 75 11 91,
  centredreamph7@gmail.com, 11 Rue Badr Assayab, Casablanca, open daily 10h–23h.

## Rerun Inputs
workflow: firecrawl-website-design-clone
source_url: https://botabota.ca/
target_stack: static HTML/CSS/JS
output: DESIGN.md
