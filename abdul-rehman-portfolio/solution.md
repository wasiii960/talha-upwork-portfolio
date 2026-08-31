# Solution: Abdul Rehman — Single-Page React Portfolio

## Goal

Build a standalone, single-page portfolio website for **Abdul Rehman**, as its
own separate project (not part of the existing Next.js portfolio at the repo
root), developed in **React**.

## Scope

- One page (`/`), all sections reachable via in-page anchor navigation
  (no multi-route/App Router setup — this is intentionally not Next.js).
- Sections: Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer.
- Fully responsive (mobile, tablet, desktop).
- Static content only — no CMS/backend. Content lives in one data file so
  copy can be edited without touching component code.
- Contact section provides a mailto/contact-form-free approach initially
  (static links: email, resume download, socials), matching "single page,
  no backend" scope. A real form can be wired to a form service later if
  requested.

## Tech Stack

- **React 19 + TypeScript** (Vite scaffold, not Next.js — per explicit ask
  and to keep this a genuinely separate, lighter project).
- **Vite** for dev server/build.
- **Tailwind CSS v4** for styling (consistent with the sibling project's
  design language, but this project has its own independent config).
- **lucide-react** for icons.
- Plain CSS transitions/animations (no framer-motion dependency needed for
  a single static page — keep the project lean).

## Project Location

`abdul-rehman-portfolio/` at the repo root — a sibling directory to the
existing Next.js app, with its own `package.json`, own `node_modules`,
own build. It does not share dependencies or config with the root project.

## Structure

```
abdul-rehman-portfolio/
  src/
    components/
      Navbar.tsx
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
      Footer.tsx
    data/
      content.ts        # single source of truth for all copy/data
    App.tsx
    main.tsx
    index.css
  index.html
  package.json
  vite.config.ts
  postcss.config.js
  README.md
```

## Milestones

1. Scaffold Vite + React + TypeScript project.
2. Add Tailwind CSS v4, base styles, fonts.
3. Add content data file (`src/data/content.ts`) with Abdul Rehman's profile,
   skills, projects, experience.
4. Build components section by section: Navbar → Hero → About → Skills →
   Projects → Experience → Contact → Footer.
5. Wire everything into `App.tsx`, verify responsive layout.
6. Run production build (`npm run build`) to confirm it compiles cleanly.
7. Write project README with setup/run instructions.
8. Commit and push to the working branch; open/refresh the PR.

## Out of Scope (for now)

- Backend/API, real contact-form submission handling.
- CMS integration.
- Deployment configuration (Vercel/Netlify) — can be added on request.
- Multi-page routing.

## Definition of Done

- `npm install && npm run dev` runs the site locally without errors.
- `npm run build` produces a clean production build.
- All sections render correctly on mobile and desktop widths.
- Content is Abdul-Rehman-specific (not copied verbatim from the sibling
  Talha Rehman portfolio).
