# Interface Review & Complete Revamp

## Current State Summary

- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, Recharts
- **Pages:** Home (landing), Intake (4-step form), Results (scorecard + recommendations)
- **Components:** Header, Footer, ScoreCard (pie), RecommendationCard

## Issues Identified

| Area | Issue |
|------|--------|
| **Branding** | `package.json` name is "magic-patterns-vite-template"; `index.html` title is "Vite + React + TS". No product-specific identity. |
| **Naming** | Header uses "NSCR Platform" while copy elsewhere says "Capital Readiness" / "Startup Capital Readiness". |
| **Design system** | Single blue/gray palette; no design tokens, custom typography, or theme extension in Tailwind. |
| **Visual identity** | Generic SaaS look; no distinctive typography, color personality, or motion. |
| **Accessibility** | Limited focus-visible styles; no reduced-motion preference support. |
| **UX** | Intake stepper could show progress line; form validation feedback is minimal; loading state is basic. |
| **Results** | Possible runtime bug: `scoreData.find(...)` may be undefined; layout and chart styling could be refined. |
| **Consistency** | Button/link styles vary; no shared component patterns for cards and CTAs. |

## Revamp Scope

1. **Design system** – CSS variables + Tailwind theme (colors, font families, radii, shadows).
2. **Branding** – Product name, meta title/description, favicon placeholder.
3. **Shell** – App layout, Header (consistent name + nav), Footer (aligned copy).
4. **Home** – New color/typography, clearer hierarchy, subtle motion, preserved content.
5. **Intake** – Progress line, improved form controls and step UX, better loading screen.
6. **Results** – Safe access for score data, refined ScoreCard/RecommendationCard, clearer layout.
7. **Polish** – Focus states, optional reduced-motion, consistent buttons/cards.

## Files Touched

- `index.html` – title, meta, theme-color
- `tailwind.config.js` – theme extension
- `src/index.css` – design tokens, base styles
- `src/App.tsx` – layout classes
- `src/components/Header.tsx` – branding, nav
- `src/components/Footer.tsx` – copy, links
- `src/pages/Home.tsx` – visual revamp
- `src/pages/Intake.tsx` – stepper, form, loading
- `src/pages/Results.tsx` – safe logic, layout
- `src/components/ScoreCard.tsx` – styling
- `src/components/RecommendationCard.tsx` – styling
- `package.json` – name/description (optional)
