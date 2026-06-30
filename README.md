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

## AI chat widget ("Ask about Sobhan")

A floating chat widget (bottom corner, responsive on desktop + mobile, bilingual
EN/FA) lets visitors ask questions and get AI answers grounded in the data from
`lib/content.ts`. It's powered by **[Groq](https://groq.com)**, which has a
generous **free** tier (no credit card).

- **Component:** `components/chat-widget.tsx` (mounted in `app/layout.tsx`)
- **API route:** `app/api/chat/route.ts` — keeps the key server-side and builds
  the system prompt from `lib/content.ts`, so answers stay accurate and update
  automatically when you edit your content.

Until a key is set, the widget runs in a **simulation mode** that still responds
and explains how to enable the live AI. To turn on live answers (free, ~2 min):

1. Create a free key at **[console.groq.com/keys](https://console.groq.com/keys)**.
2. Put it in `.env.local`: `GROQ_API_KEY=gsk_...`, then restart `npm run dev`.
3. When deploying (e.g. Vercel), add `GROQ_API_KEY` in the host's
   **Environment Variables** settings.

Optionally set `GROQ_MODEL` to override the default `llama-3.3-70b-versatile`.

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
