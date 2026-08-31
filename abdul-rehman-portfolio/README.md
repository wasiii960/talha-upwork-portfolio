# Abdul Rehman — Portfolio

A single-page portfolio website for Abdul Rehman, a Full-Stack React Developer.
Built as a standalone project, independent of the other portfolio(s) in this
repository.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: type-check and produce a production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run Oxlint

## Project Structure

```
src/
  components/    Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
  data/          content.ts — single source of truth for all site copy
  App.tsx        assembles the page from the section components
  main.tsx       React entry point
  index.css      Tailwind entry + base styles
```

## Content

All copy (name, role, skills, projects, experience, contact links) lives in
`src/data/content.ts`. Update that file to change the site's content without
touching any component.

See `solution.md` for the original plan and `progress.md` for the build
checklist.
