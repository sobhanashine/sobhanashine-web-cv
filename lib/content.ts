/**
 * Single source of truth for all personal data on the site.
 * Edit values here — every section reads from this file.
 *
 * TODO(sobhan): confirm the two values marked PLACEHOLDER below.
 */

export const profile = {
  name: "Sobhan Ashineh",
  firstName: "Sobhan",
  lastName: "Ashineh",
  role: "Full-Stack Engineer",
  // Shown as a short, specific positioning line.
  tagline: "I build the systems behind the screen.",
  location: "Rasht, Iran — working remotely",
  yearsExperience: "4+",
  availability: "Open to remote roles",
  // Links
  email: "sobhan.ashineh1@gmail.com", // from CV (account shows ashineh.sobhan1@ — confirm which to use)
  phone: "+98 911 600 4866",
  github: "https://github.com/sobhanashine",
  linkedin: "https://www.linkedin.com/in/sobhan-ashineh", // PLACEHOLDER — send real URL
  resume: "/sobhan-ashineh-cv.pdf",
} as const;

/** Short, plain-spoken intro used in the About section. */
export const about = {
  // Each paragraph is one idea. Specific over clever.
  paragraphs: [
    "I'm a full-stack engineer with four years of building scalable, high-performance backends in NestJS, Node.js, and TypeScript — RESTful and GraphQL APIs, relational data models, and the real-time plumbing behind them.",
    "I'm comfortable the whole way up the stack: headless architectures, WebSocket systems, payment and OAuth integrations, and AI features built on the OpenAI platform — through to the SEO-fast Next.js, Nuxt, and Vue frontends users actually touch.",
    "I care about clean, well-tested code and turning fuzzy requirements into systems that hold up in production.",
  ],
  // Quick-glance facts for the sidebar of the About section.
  facts: [
    { label: "Experience", value: "4+ years" },
    { label: "Focus", value: "Backend-first, full-stack" },
    { label: "Based in", value: "Rasht, Iran (remote)" },
    { label: "Languages", value: "Farsi (native), English (fluent)" },
  ],
} as const;

export type SkillGroup = {
  label: string;
  // The first item in each group is treated as the "headline" skill.
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "Express",
      "TypeScript",
      "Python",
      "REST APIs",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    label: "Frontend",
    items: [
      "Next.js",
      "Nuxt.js",
      "React.js",
      "Vue.js",
      "JavaScript",
      "Tailwind CSS",
      "SASS",
      "Bootstrap",
    ],
  },
  {
    label: "Data & ORMs",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM"],
  },
  {
    label: "Architecture & Web",
    items: [
      "Headless CMS (WPGraphQL)",
      "SSG / ISR",
      "i18n (next-intl, RTL)",
      "Technical SEO (JSON-LD, Yoast)",
    ],
  },
  {
    label: "Integrations & AI",
    items: [
      "OpenAI API (GPT)",
      "PayPal",
      "Google OAuth 2.0",
      "JWT",
      "Passport.js",
    ],
  },
  {
    label: "DevOps & Tooling",
    items: ["Docker", "AWS S3", "Liara", "Git", "Jest", "Supertest"],
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string; // machine-readable, for the timeline
  end: string;
  url?: string;
  // One-line summary of the engagement.
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Droplinked",
    role: "NestJS Developer",
    location: "Remote · Contract",
    period: "Jul 2024 — Feb 2026",
    start: "2024",
    end: "2026",
    url: "https://droplinked.com",
    summary:
      "Backend for a Web3 commerce platform — payments, auth, and a suite of AI features for merchants.",
    highlights: [
      "Refactored core modules to a use-case-driven design, optimizing queries for up to a 90% performance improvement.",
      "Built and led the PayPal payment integration end to end, including merchant onboarding.",
      "Integrated Google OAuth for secure, streamlined sign-in for both merchants and customers.",
      "Shipped a GPT-powered AI assistant and the backend for an AI agent that auto-generates product descriptions, blog articles, and storefront content.",
      "Designed an AI support flow that escalates to a human agent by email when automation isn't enough.",
    ],
    stack: ["NestJS", "TypeScript", "OpenAI", "PayPal", "OAuth"],
  },
  {
    company: "Nik Nazar Ayandeh",
    role: "Backend Developer",
    location: "Rasht, Gilan",
    period: "Apr 2023 — Jun 2025",
    start: "2023",
    end: "2025",
    summary:
      "Led backend across client projects on the NestJS ecosystem, with full-stack work in Nuxt.js.",
    highlights: [
      "Led backend services for a range of client projects, and took on full-stack work building frontends in Nuxt.js.",
      "Designed secure, token-based authentication (JWT) and authorization with Passport.js.",
      "Built and maintained robust REST APIs and PostgreSQL schemas with Prisma.",
      "Cut average API response time ~30% through query optimization and caching strategies.",
      "Containerized services with Docker and deployed to cloud platforms like Liara.",
    ],
    stack: ["NestJS", "Nuxt.js", "PostgreSQL", "Prisma", "Docker"],
  },
  {
    company: "Kara Tejarat Afarin Arosha",
    role: "Frontend Developer",
    location: "Rasht, Gilan",
    period: "Apr 2022 — Apr 2023",
    start: "2022",
    end: "2023",
    summary:
      "Built responsive, interactive product UIs in Vue.js and Nuxt.js.",
    highlights: [
      "Built responsive, interactive interfaces for web applications using Vue.js and Nuxt.js.",
      "Translated UI/UX designs into high-quality, reusable components.",
      "Consumed backend APIs in close collaboration with server-side engineers.",
      "Improved app performance and UX through focused code optimization.",
    ],
    stack: ["Vue.js", "Nuxt.js", "JavaScript", "SASS"],
  },
  {
    company: "Nik Salamat Gostar",
    role: "Full-Stack Developer",
    location: "Rasht, Gilan",
    period: "Oct 2021 — Mar 2022",
    start: "2021",
    end: "2022",
    summary:
      "Full-stack work on the Digi Moragheb healthcare platform, from database to UI.",
    highlights: [
      "Contributed to both the React.js frontend and Nest.js backend of the Digi Moragheb platform.",
      "Developed features across the full stack, from database modeling to UI implementation.",
      "Built a complete web application end to end.",
    ],
    stack: ["React.js", "Nest.js", "PostgreSQL"],
  },
];

export type Project = {
  name: string;
  // One memorable line.
  tagline: string;
  description: string;
  contributions: string[];
  stack: string[];
  url?: string;
  // Used as the mono index label, e.g. "P-01".
  index: string;
};

export const projects: Project[] = [
  {
    name: "OFOQ",
    index: "P-01",
    tagline: "A multilingual, headless content platform.",
    description:
      "A decoupled Next.js frontend over a WordPress backend. Next.js owns all rendering, HTML, and SEO while content is served over WPGraphQL — multilingual across Persian, English, and Arabic with full RTL support.",
    contributions: [
      "Architected a headless WordPress + Next.js setup, consuming content through a lightweight WPGraphQL client with SSG/ISR and on-demand revalidation.",
      "Implemented full internationalization with next-intl (Persian default, plus English and Arabic), including RTL rendering.",
      "Mapped Yoast / WPGraphQL SEO data to the Next.js Metadata API and built schema.org JSON-LD for rich results.",
      "Built a webhook-driven on-demand revalidation endpoint so editor publishes refresh ISR pages immediately.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "WPGraphQL",
      "Tailwind CSS",
      "next-intl",
      "WordPress",
    ],
    url: "https://ofoq-web.vercel.app",
  },
  {
    name: "Aura Disposable",
    index: "P-02",
    tagline: "Premium e-commerce with built-in product verification.",
    description:
      "A digital storefront and wholesale portal for premium disposable products. I led web development on Next.js for the frontend and Supabase for the backend infrastructure.",
    contributions: [
      "Built the main e-commerce store and interface in Next.js to showcase and manage the product catalog.",
      "Designed and integrated a robust admin panel on Supabase for backend management, storage, and operations.",
      "Built a custom product verification system that authenticates purchases via unique codes, directly on the site.",
    ],
    stack: ["Next.js", "Supabase", "TypeScript"],
    url: "https://auradisposable.com",
  },
  {
    name: "Digi Moragheb",
    index: "P-03",
    tagline: "A healthcare platform connecting patients with providers.",
    description:
      "A platform for online consultations and appointment scheduling. I worked as a full-stack developer on the core functionality, with a focus on real-time communication.",
    contributions: [
      "Developed the real-time patient–doctor chat using WebSockets.",
      "Built API endpoints for registration, profile management, and appointment booking.",
      "Helped design the database schema for users and appointments.",
    ],
    stack: ["Vue.js", "Node.js", "Express", "PostgreSQL", "WebSockets"],
    url: "https://digimoragheb.com",
  },
];

export type OtherProject = { name: string; url: string };

export const otherProjects: OtherProject[] = [
  { name: "Kashi Land", url: "https://kashiland.com" },
  { name: "Future Media Services", url: "https://futuremservices.com" },
  { name: "Mehrshad Store", url: "https://mehrshadstore.ir" },
  { name: "Paytakhte Ketab", url: "https://paytakhteketab.com" },
  { name: "Noornegar", url: "https://noornegar.com" },
  { name: "Jaheshino", url: "https://jaheshino.ir" },
  { name: "Sakkou Coworking Space", url: "https://sakkou-cowork.ir" },
];

export const education = {
  degree: "M.Sc. in Computer Engineering",
  school: "Islamic Azad University, Rasht Branch",
  period: "Oct 2024 — Present",
} as const;

export const languages = [
  { name: "Farsi", level: "Native" },
  { name: "English", level: "Fluent" },
] as const;

/** Section registry — drives the nav and scroll-spy. */
export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * The architecture graph in the hero. Nodes are grouped into layers so the
 * canvas can lay them out as a real system diagram. Edges describe data flow.
 */
export const graph = {
  nodes: [
    // layer 0 — client
    { id: "client", label: "Client", layer: 0, kind: "edge" },
    { id: "next", label: "Next.js", layer: 0, kind: "edge" },
    { id: "nuxt", label: "Nuxt", layer: 0, kind: "edge" },
    // layer 1 — api
    { id: "nest", label: "NestJS", layer: 1, kind: "core" },
    { id: "graphql", label: "GraphQL", layer: 1, kind: "api" },
    { id: "ws", label: "WebSocket", layer: 1, kind: "api" },
    // layer 2 — data
    { id: "postgres", label: "PostgreSQL", layer: 2, kind: "data" },
    { id: "redis", label: "Redis", layer: 2, kind: "data" },
    { id: "prisma", label: "Prisma", layer: 2, kind: "data" },
    // layer 3 — integrations
    { id: "openai", label: "OpenAI", layer: 3, kind: "ext" },
    { id: "paypal", label: "PayPal", layer: 3, kind: "ext" },
    { id: "oauth", label: "OAuth", layer: 3, kind: "ext" },
  ],
  edges: [
    ["client", "next"],
    ["client", "nuxt"],
    ["next", "nest"],
    ["nuxt", "nest"],
    ["next", "graphql"],
    ["nest", "graphql"],
    ["nest", "ws"],
    ["nest", "prisma"],
    ["prisma", "postgres"],
    ["nest", "redis"],
    ["nest", "openai"],
    ["nest", "paypal"],
    ["nest", "oauth"],
  ],
} as const;
