# Talha Rehman, AI/ML Engineer Portfolio

A premium, SaaS-style portfolio for an AI/ML Engineer specializing in computer vision, edge
AI, and industrial data engineering, built to feel like a boutique software consultancy
(Linear / Stripe / Vercel inspired) rather than a traditional developer portfolio.

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

All engineering case studies (`src/data/case-studies.ts`) are anonymised, with no real client
names, logos, or confidential details included, per the site's stated policy. Case study
images (hero, architecture, and results) live in `public/case-studies/`.

## Contact Form

The contact form (`src/components/sections/contact.tsx`) submits directly from the
visitor's browser to [Web3Forms](https://web3forms.com), free, no account required.
It intentionally does *not* proxy through our own server: Web3Forms' upstream bot
protection blocks requests from cloud/server IP ranges (Vercel, AWS, etc.) even with a
valid key, so a real browser request is required.

1. Visit [web3forms.com](https://web3forms.com) and enter the inbox email that should
   receive submissions. An access key arrives by email instantly.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to that key.
3. On your hosting provider (Vercel, etc.), add the same `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   environment variable in the project settings, then trigger a **new deployment**
   (`NEXT_PUBLIC_` vars are baked in at build time, so a stale build won't pick it up).

Without this key set, the form shows an error instead of failing silently.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: run ESLint
