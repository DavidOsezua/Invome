---
name: invome-design
description: Use this skill to generate well-branded interfaces and assets for Invome, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Invome is an invoicing SaaS for Nigerian freelancers and small businesses. The brand is quiet-professional — closer to Linear, Stripe, and Notion than to Canva or QuickBooks. Restraint is the design principle. When in doubt, remove, do not add.

Essentials:
- **Primary:** Ink Blue `#1E2A44`. **Accent:** Signal Green `#16A34A` (paid/positive only, sparingly).
- **Typography:** Inter (400/500/600/700). Scale 10 · 12 · 14 · 16 · 18 · 24 · 32.
- **Tabular numerals** non-negotiable for all currency and financial figures — use `.t-num` or `font-variant-numeric: tabular-nums`.
- **Spacing:** 8px base. Everything snaps to a multiple of 8.
- **Icons:** Lucide only, stroke 1.5, 20px default. Load from `https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`.
- **Radii:** 6px inputs/buttons, 8px cards, 12px modals.
- **Motion:** 150–200ms hover/focus. No bounces, no celebration animations.
- **No emoji in product UI. No gradients on primary surfaces. No dark mode.**

Files:
- `README.md` — full brand guidelines (tone, content, visuals, iconography).
- `colors_and_type.css` — CSS custom props + semantic type classes (drop-in).
- `assets/` — logo mark and lockup SVGs.
- `preview/*.html` — component specimens.
- `ui_kits/app/` — React UI kit for the web app (6 screens, click-through).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
