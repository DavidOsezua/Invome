# Invome Design System

**Invome** is a focused invoicing tool for Nigerian freelancers, small service businesses, and product traders. It replaces Word docs, free PDF tools, and bloated products like QuickBooks with a focused workflow that respects how small operators actually run their businesses.

- **Primary users:** Nigerian freelancers billing a mix of NGN and USD (devs, designers, writers, consultants).
- **Secondary users:** Small service businesses with 1–10 staff (consultancies, agencies, repair shops).
- **Tertiary users:** Small product traders needing itemised invoicing.
- **MVP scope:** authentication · invoice lifecycle (create → send → mark paid → download PDF) · client management.
- **Stack (target):** React + Spring Boot + PostgreSQL.

This system is the visual source of truth for a real product being built. Prototypes exist to show what the app should *feel* like — not to ship.

## Sources

This system was built from a single source: a written product + visual brief. No existing codebase, Figma, or live product was available. Every token, component, and screen was derived from the brief's explicit spec. No visual decisions were invented outside what the brief prescribed; where the brief left a gap (modal chrome, focus rings, empty-state layout, toast), decisions were made consistent with the brand's "quiet professional" posture and flagged in the footer of this file.

---

## Brand personality

**Quiet professional.** Confident, restrained, serious. Closer to **Linear, Stripe, Notion, Vercel** than to Canva or QuickBooks. The aesthetic signals "this was built carefully" without shouting.

Restraint is the design principle. When in doubt, remove, do not add.

---

## Content fundamentals

Product copy is **clear, short, active**. The UI talks to the user like a competent colleague, not a hype person.

- **Tone:** matter-of-fact. Skip the pep. A status message states the state and, if useful, the next fact.
- **Person:** second-person for instructions ("Add a client to continue"), third-person for system statements ("Invoice sent"). Avoid "we".
- **Casing:** sentence case everywhere — buttons, labels, titles, menu items. Title Case is only used in data the user typed (names, company names).
- **Punctuation:** no exclamation marks in status text. Periods optional on single-line UI strings; required in multi-sentence copy.
- **Numbers:** always formatted with grouping separators. Currency symbol precedes the number, with a thin space when rendered (`₦ 450,000.00`, `$ 2,400.00`).
- **Dates:** `Apr 24, 2026` in UI; `24 April 2026` on printed invoices.
- **Emoji:** never in the product UI. Never in status messages. Unicode characters like `·` and `→` are fine as separators, used sparingly.
- **Empty states:** lead with a one-line fact, follow with a one-line next step as a button. No illustrations of people shrugging.

### Examples

| ✓ Do                                            | ✗ Don't                                              |
| ----------------------------------------------- | ---------------------------------------------------- |
| Invoice sent. Waiting for payment.              | Woohoo! 🎉 Your invoice is on its way!               |
| 3 overdue. Oldest is 14 days past due.          | Uh oh — some invoices need your attention!           |
| No invoices yet. Create your first.             | Looks a little empty in here… 👀                     |
| Saved.                                          | All done! Your changes have been saved successfully. |
| Mark paid                                       | Mark as Paid ✓                                       |
| Due Apr 24                                      | Due in 6 days!                                       |

---

## Visual foundations

### Colors

Two brand colors, a small surface/text/border palette, and a five-value semantic scale. All defined as CSS custom properties in `colors_and_type.css`.

- **Ink Blue `#1E2A44`** — navigation, primary buttons, headings. The identity color. Used flat, never gradient.
- **Signal Green `#16A34A`** — paid status and positive confirmations **only**. Used sparingly so it actually signals something.
- **Canvas `#F8FAFC`** — app background.
- **Surface `#FFFFFF`** — cards, modals, sheets. Separated by a `#E5E7EB` border, not a shadow.
- **Text** — primary `#111827`, secondary `#4B5563`, muted `#9CA3AF`. These three cover 95% of cases.
- **Semantic** — success `#16A34A` (paid), warning `#F59E0B` (overdue), danger `#DC2626` (cancelled), info `#2563EB` (sent), neutral `#9CA3AF` (draft).

**Never:** gradients on primary surfaces, bluish-purple gradients anywhere, dark-mode toggle, alternative accent colors.

### Typography

**Inter** for everything. 400 / 500 / 600 / 700. Loaded from Google Fonts in `colors_and_type.css`.

- **Scale (fixed, no others):** 10 · 12 · 14 · 16 · 18 · 24 · 32 px. 32 is the top; 10 is reserved for uppercase micro labels.
- **Default body:** 14px / 400 / `#111827`.
- **Tabular numerals are non-negotiable** for currency and financial figures. Use `font-variant-numeric: tabular-nums` — utility class `.t-num` is provided. Columns must line up column to column.
- **Letter spacing:** slight tightening (`-0.02em`) at 32px+, otherwise 0.
- **Line height:** 1.2 for display, 1.35 for headings, 1.5 for body.

See `preview/type-scale.html` and `preview/type-tabular.html`.

### Spacing

**8px base unit.** Everything snaps to a multiple of 8. Named tokens `--space-1`…`--space-10` (4px half-step exists but used sparingly).

Financial data gets extra breathing room. Prefer `space-4` / `space-5` between blocks, `space-3` within.

### Radii

`4 · 6 · 8 · 12 · pill`. Inputs and buttons 6px. Cards 8px. Modals and drawers 12px. Never larger than 12px on a surface — rounded-pill cards look consumer-y.

### Shadows

Restrained. Borders do most of the work; shadows only for floating elements.

- Cards: 1-pixel border + whisper shadow. Not a card-stack look.
- Dropdowns / menus: soft medium shadow.
- Modals / drawers / toasts: larger soft shadow.

No colored shadows. No inner shadows anywhere.

### Borders

Single 1px border, solid. `#E5E7EB` default, `#D1D5DB` for emphasis or hover-raised state. Focus ring is a 3px `rgba(30,42,68,0.12)` outer glow plus a solid `#1E2A44` 1px border — not an accent color.

### Backgrounds

Flat fills only. No patterns, no textures, no illustrations, no photography on chrome. The only imagery permitted is (future) user-uploaded business logos on rendered invoices. Subtle tinted stat cards (`#FEF2F2` outstanding, `#F0FDF4` paid) are the only exception — and even those are near-white.

### Motion

Minimal. 150–200ms transitions for hover, focus, and state changes.

- **Hover:** background shift (e.g. `#F3F4F6`) or slight bg darkening on filled buttons. No scale. No translate.
- **Press:** filled buttons darken by ~5% luminance. No squish/shrink.
- **Page transitions:** instant. No fades, no slides.
- **No bouncing, no celebration animations, no elaborate entrances.** Toasts fade/slide 8px with 200ms ease-out, that's it.

### Layout

- Persistent **left sidebar, 232px**, fixed. Never collapses (desktop/tablet only — mobile out of scope).
- Main content area has max-width ~1200px, centered with generous side padding (32–48px).
- Tables and forms are the hero layouts. No hero units, no marketing sections inside the app.
- Sticky elements: sidebar, invoice form's live-total panel, bulk-action bar when rows are selected.

### Cards

Border + 8px radius + whisper shadow + white fill. That is the card. No colored left-border accent. No gradient outlines. No "glass" / blur / transparency. Padding defaults to 16–24px.

### Transparency & blur

None. The system does not use semi-transparent fills, backdrop blur, or frosted glass.

### Hover / press / focus

- **Hover (rows / buttons):** background `#F8FAFC` or `#F3F4F6`. Secondary buttons darken border to `#D1D5DB`.
- **Press (filled buttons):** background `#141d31` (Ink Blue, 5% darker).
- **Focus:** 3px `rgba(30,42,68,0.12)` outer ring + `#1E2A44` border. Never remove the focus ring.
- **Disabled:** 45% opacity, not-allowed cursor. Do not tint grey — the reduced opacity is enough.

### Imagery

No stock photography. No illustration. If the product ever needs a visual (e.g. empty-state), it is a single Lucide icon inside a neutral grey rounded square — never a full illustration.

---

## Iconography

**Lucide only** (`https://unpkg.com/lucide`). Stroke width **1.5**. Sizes **20px** default, **24px** for emphasis, **16px** for inline / tight spaces.

- **Colors:** icons inherit `currentColor`. Default `#4B5563` (secondary), active `#1E2A44`, muted `#9CA3AF`, semantic icons (check, alert) use their semantic color.
- **No icon fonts.** No sprite sheets. No hand-rolled SVGs when a Lucide icon exists.
- **No emoji anywhere in product UI.** Emoji may appear in user-generated content (invoice notes someone typed) but never in our own chrome or copy.
- **Unicode separators** (`·`, `→`, `•`) are fine used sparingly as dividers.
- **Key icons used:** `layout-dashboard`, `file-text`, `users`, `bar-chart-2`, `settings`, `plus`, `search`, `filter`, `download`, `send`, `check-circle-2`, `clock`, `alert-triangle`, `pencil`, `copy`, `trash-2`, `more-horizontal`, `x`.

See `preview/brand-iconography.html`.

### Logo

- `assets/logo-mark.svg` — 32×32 square, Ink Blue fill, white stylised "I→" glyph.
- `assets/logo-lockup.svg` — mark + wordmark (Inter SemiBold, `#111827`).
- **Clear space:** ½ mark height on all sides.
- On dark backgrounds the mark inverts: white tile, Ink Blue glyph, white wordmark.

---

## File index

```
README.md                        — this file
SKILL.md                         — skill manifest for Claude Code / skill invocation
colors_and_type.css              — all design tokens (CSS custom props) + semantic type classes
assets/
  logo-mark.svg                  — standalone mark
  logo-lockup.svg                — mark + wordmark
preview/                         — design-system cards (one concept per file)
  brand-logo.html
  brand-iconography.html
  colors-brand.html
  colors-neutrals.html
  colors-semantic.html
  type-scale.html
  type-tabular.html
  spacing-scale.html
  spacing-radius-shadow.html
  comp-buttons.html
  comp-inputs.html
  comp-badges.html
  comp-stat-cards.html
  comp-table.html
  comp-sidebar.html
  comp-toast-empty.html
ui_kits/
  app/                           — the Invome web app (6 screens, click-through)
    index.html
    README.md
    *.jsx                        — factored React components
```

---

## Caveats & flags

- **Inter substitution flag:** Inter is loaded from Google Fonts. If the real product self-hosts Inter (`.woff2` files), replace the `@import` in `colors_and_type.css` with a local `@font-face` block and put the files in `fonts/`. Inter is already the mandated face — this is a hosting detail, not a substitution.
- **No logo provided.** The mark in `assets/` is a simple wordmark-adjacent glyph built from the name "Invome" (twin serifs → arrow). If a real logo exists or is designed, replace both SVGs; the rest of the system is logo-agnostic.
- **Only the app UI kit exists.** A marketing website / docs / mobile app were not in the brief's scope (MVP is the app only) and have not been built. Add later if needed.
