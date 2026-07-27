# Talha Anjum — Enterprise Java Backend Engineer Portfolio

A premium, SaaS-style portfolio for a Senior Java Backend Engineer — built to feel like a
boutique software consultancy (Linear / Stripe / Vercel inspired) rather than a traditional
developer portfolio.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui-style primitives (hand-rolled on Radix UI)
- Framer Motion for scroll reveals and micro-interactions
- Lucide Icons
- `cmdk` command palette (⌘K / Ctrl+K)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                       Route segments (home, case studies, sitemap, robots)
  components/
    layout/                  Navbar, footer, command palette, scroll progress
    sections/                Homepage sections (hero, services, process, about, ...)
    diagrams/                Architecture diagram + thumbnail SVG components
    ui/                      Design-system primitives (button, card, dialog, ...)
  data/                      Case study content + site copy (single source of truth)
  lib/                       Site config and utilities
```

## Content

All 6 engineering case studies (`src/data/case-studies.ts`) are anonymised — no real client
names, logos, or confidential details are included, per the site's stated policy.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
