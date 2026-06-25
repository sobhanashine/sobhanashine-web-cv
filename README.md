# Sobhan Ashineh — Web CV

An animated, interactive portfolio / CV site for **Sobhan Ashineh**, a backend-focused
full-stack developer. Built as a single-page experience with a live architecture graph,
scroll-driven reveals, and smooth scrolling.

🔗 **Live:** [ofoq-web.vercel.app](https://ofoq-web.vercel.app) <!-- update to the deployed CV URL -->

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) with **Turbopack**
- **React 19** + **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com)** for styling
- **[Motion](https://motion.dev)** for animation
- **[Lenis](https://lenis.darkroom.engineering)** for smooth scrolling

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page
hot-reloads as you edit.

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Editing content

All personal data — profile, skills, experience, projects, education, and the hero
architecture graph — lives in a **single source of truth**:

```
lib/content.ts
```

Edit values there and every section updates automatically. No need to touch the
components for content changes.

The downloadable CV is served from `public/sobhan-ashineh-cv.pdf` (linked from the
hero's "Download CV" button).

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata
  page.tsx            Section composition (Hero → About → … → Footer)
  globals.css         Theme tokens and base styles
components/           One file per section + shared UI primitives
  hero.tsx            Landing + live architecture graph
  architecture-graph.tsx
  about.tsx  skills.tsx  experience.tsx  projects.tsx
  other-projects.tsx  education.tsx  footer.tsx  nav.tsx
  reveal.tsx  magnetic.tsx  scroll-progress.tsx  smooth-scroll.tsx
  section-heading.tsx
lib/
  content.ts          All site content (edit here)
```

## Deployment

Optimized for [Vercel](https://vercel.com). Push to `main` and Vercel builds and
deploys automatically. See the
[Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
for other targets.
