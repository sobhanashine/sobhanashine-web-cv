/**
 * Single source of truth for all site content — in two languages.
 *
 * The site is bilingual: English (`en`, LTR) and Persian (`fa`, RTL).
 * Every section reads its copy from `content[lang]` via the `useContent`
 * hook in `lib/i18n`. Edit a string here and it updates everywhere.
 *
 * Language-neutral data (the architecture graph, machine-readable years)
 * lives in shared exports at the bottom.
 *
 * TODO(sobhan): confirm the two values marked PLACEHOLDER below.
 */

export type Lang = "en" | "fa";

/* ------------------------------------------------------------------ */
/*  Shared, language-neutral links & identity                          */
/* ------------------------------------------------------------------ */

const links = {
  email: "sobhan.ashineh1@gmail.com", // from CV (account shows ashineh.sobhan1@ — confirm which to use)
  phone: "+98 911 600 4866",
  github: "https://github.com/sobhanashine",
  linkedin: "https://www.linkedin.com/in/sobhan-ashineh", // PLACEHOLDER — send real URL
  resume: "/sobhan-ashineh-cv.pdf",
} as const;

export type SkillGroup = {
  label: string;
  // The first item in each group is treated as the "headline" skill.
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string; // machine-readable, for the timeline
  end: string;
  url?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  contributions: string[];
  stack: string[];
  url?: string;
  index: string;
};

export type OtherProject = { name: string; url: string };

/* ------------------------------------------------------------------ */
/*  English (default, LTR)                                              */
/* ------------------------------------------------------------------ */

const en = {
  profile: {
    name: "Sobhan Ashineh",
    firstName: "Sobhan",
    lastName: "Ashineh",
    role: "Full-Stack Engineer",
    tagline: "I build the systems behind the screen.",
    location: "Rasht, Iran — working remotely",
    yearsExperience: "4+",
    availability: "Open to remote roles",
    ...links,
  },

  about: {
    paragraphs: [
      "I'm a full-stack engineer with four years of building scalable, high-performance backends in NestJS, Node.js, and TypeScript — RESTful and GraphQL APIs, relational data models, and the real-time plumbing behind them.",
      "I'm comfortable the whole way up the stack: headless architectures, WebSocket systems, payment and OAuth integrations, and AI features built on the OpenAI platform — through to the SEO-fast Next.js, Nuxt, and Vue frontends users actually touch.",
      "I care about clean, well-tested code and turning fuzzy requirements into systems that hold up in production.",
    ],
    facts: [
      { label: "Experience", value: "4+ years" },
      { label: "Focus", value: "Backend-first, full-stack" },
      { label: "Based in", value: "Rasht, Iran (remote)" },
      { label: "Languages", value: "Farsi (native), English (fluent)" },
    ],
  },

  skillGroups: [
    {
      label: "Backend",
      items: ["NestJS", "Node.js", "Express", "TypeScript", "Python", "REST APIs", "GraphQL", "WebSockets"],
    },
    {
      label: "Frontend",
      items: ["Next.js", "Nuxt.js", "React.js", "Vue.js", "JavaScript", "Tailwind CSS", "SASS", "Bootstrap"],
    },
    {
      label: "Data & ORMs",
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM"],
    },
    {
      label: "Architecture & Web",
      items: ["Headless CMS (WPGraphQL)", "SSG / ISR", "i18n (next-intl, RTL)", "Technical SEO (JSON-LD, Yoast)"],
    },
    {
      label: "Integrations & AI",
      items: ["OpenAI API (GPT)", "PayPal", "Google OAuth 2.0", "JWT", "Passport.js"],
    },
    {
      label: "DevOps & Tooling",
      items: ["Docker", "AWS S3", "Liara", "Git", "Jest", "Supertest"],
    },
  ] as SkillGroup[],

  experience: [
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
      summary: "Built responsive, interactive product UIs in Vue.js and Nuxt.js.",
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
  ] as Experience[],

  projects: [
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
      stack: ["Next.js", "TypeScript", "WPGraphQL", "Tailwind CSS", "next-intl", "WordPress"],
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
  ] as Project[],

  otherProjects: [
    { name: "Kashi Land", url: "https://kashiland.com" },
    { name: "Future Media Services", url: "https://futuremservices.com" },
    { name: "Mehrshad Store", url: "https://mehrshadstore.ir" },
    { name: "Paytakhte Ketab", url: "https://paytakhteketab.com" },
    { name: "Noornegar", url: "https://noornegar.com" },
    { name: "Jaheshino", url: "https://jaheshino.ir" },
    { name: "Sakkou Coworking Space", url: "https://sakkou-cowork.ir" },
  ] as OtherProject[],

  education: {
    degree: "M.Sc. in Computer Engineering",
    school: "Islamic Azad University, Rasht Branch",
    period: "Oct 2024 — Present",
  },

  languages: [
    { name: "Farsi", level: "Native" },
    { name: "English", level: "Fluent" },
  ],

  sections: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  // Interface strings — labels, buttons, micro-copy that don't live in a data list.
  ui: {
    nav: { emailMe: "Email me", cv: "CV", downloadCv: "Download CV", switchTo: "FA", switchAria: "Switch to Persian", openMenu: "Open menu", closeMenu: "Close menu" },
    hero: {
      taglinePre: "I build the ",
      taglineHighlight: "systems",
      taglinePost: " behind the screen.",
      nameRoleSep: " — ",
      lead: "Scalable backends in NestJS & Node, real-time systems and AI features — and the SEO-fast frontends in front of them. {years} years, backend-first and full-stack.",
      viewWork: "View work",
      downloadCv: "Download CV",
      basedIn: "Based in",
      email: "Email",
      panelTitle: "// system.map",
      live: "live",
      cursorHint: "move your cursor through the stack",
      scroll: "scroll",
      scrollToAbout: "Scroll to about",
    },
    about: { tag: "whoami", title: "Backend-first. Frontend-fluent." },
    skills: {
      tag: "stack",
      title: "The tools I reach for",
      lead: "Six clusters I've shipped production work with — from the database up to the pixels.",
    },
    experience: {
      tag: "work",
      title: "Four years, shipping systems",
      lead: "Roles where I owned backend architecture and stepped across the full stack when it mattered.",
    },
    projects: {
      tag: "selected builds",
      title: "Things I've shipped",
      lead: "A few projects where I owned meaningful surface area — from headless architecture to real-time features.",
      builtWith: "Built with",
    },
    otherProjects: { tag: "also shipped" },
    education: { tag: "education", languagesTag: "languages" },
    footer: {
      tag: "get in touch",
      title: "Let's build something that holds up.",
      leadPre: "I'm ",
      leadPost: " and happy to talk backend architecture, full-stack builds, or AI features. The fastest way to reach me is email.",
      copyEmail: "Copy email",
      copied: "Copied!",
      downloadCv: "Download CV",
      backToTop: "Back to top",
      builtWith: "Built with Next.js, TypeScript & Tailwind.",
      socials: { github: "GitHub", linkedin: "LinkedIn", email: "Email", phone: "Phone" },
    },
  },
};

export type Content = typeof en;

/* ------------------------------------------------------------------ */
/*  Persian (فارسی, RTL)                                               */
/*  Translations aim to read naturally, not literally. Technology      */
/*  names (NestJS, PostgreSQL, …) stay in Latin, as is standard in     */
/*  Iranian tech writing. Numbers use Persian digits.                  */
/* ------------------------------------------------------------------ */

const fa: Content = {
  profile: {
    name: "سبحان آشینه",
    firstName: "سبحان",
    lastName: "آشینه",
    role: "مهندس فول‌استک",
    tagline: "سیستم‌های پشت صفحه را می‌سازم.",
    location: "رشت، ایران — به‌صورت دورکاری",
    yearsExperience: "+۴",
    availability: "آماده‌ی همکاری دورکاری",
    ...links,
  },

  about: {
    paragraphs: [
      "مهندس فول‌استک با چهار سال تجربه‌ی ساخت بک‌اندهای مقیاس‌پذیر و پرسرعت با NestJS، Node.js و TypeScript — APIهای REST و GraphQL، مدل‌های داده‌ی رابطه‌ای و زیرساخت بلادرنگی که پشت آن‌هاست.",
      "در تمام لایه‌های استک راحتم: معماری‌های Headless، سیستم‌های WebSocket، یکپارچه‌سازی پرداخت و OAuth، و قابلیت‌های هوش مصنوعی روی پلتفرم OpenAI — تا فرانت‌اندهای سریع و سئوپسند با Next.js، Nuxt و Vue که کاربر مستقیماً با آن‌ها کار می‌کند.",
      "به کد تمیز و آزمون‌شده اهمیت می‌دهم و دوست دارم نیازمندی‌های مبهم را به سیستم‌هایی تبدیل کنم که در محیط واقعی پایدار بمانند.",
    ],
    facts: [
      { label: "تجربه", value: "بیش از ۴ سال" },
      { label: "تمرکز", value: "بک‌اندمحور، فول‌استک" },
      { label: "محل", value: "رشت، ایران (دورکاری)" },
      { label: "زبان‌ها", value: "فارسی (مادری)، انگلیسی (مسلط)" },
    ],
  },

  skillGroups: [
    {
      label: "بک‌اند",
      items: ["NestJS", "Node.js", "Express", "TypeScript", "Python", "REST APIs", "GraphQL", "WebSockets"],
    },
    {
      label: "فرانت‌اند",
      items: ["Next.js", "Nuxt.js", "React.js", "Vue.js", "JavaScript", "Tailwind CSS", "SASS", "Bootstrap"],
    },
    {
      label: "داده و ORM",
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM"],
    },
    {
      label: "معماری و وب",
      items: ["Headless CMS (WPGraphQL)", "SSG / ISR", "i18n (next-intl, RTL)", "Technical SEO (JSON-LD, Yoast)"],
    },
    {
      label: "یکپارچه‌سازی و هوش مصنوعی",
      items: ["OpenAI API (GPT)", "PayPal", "Google OAuth 2.0", "JWT", "Passport.js"],
    },
    {
      label: "DevOps و ابزارها",
      items: ["Docker", "AWS S3", "Liara", "Git", "Jest", "Supertest"],
    },
  ] as SkillGroup[],

  experience: [
    {
      company: "Droplinked",
      role: "توسعه‌دهنده NestJS",
      location: "دورکاری · قراردادی",
      period: "ژوئیه ۲۰۲۴ — فوریه ۲۰۲۶",
      start: "2024",
      end: "2026",
      url: "https://droplinked.com",
      summary:
        "بک‌اند یک پلتفرم تجارت Web3 — پرداخت، احراز هویت و مجموعه‌ای از قابلیت‌های هوش مصنوعی برای فروشندگان.",
      highlights: [
        "بازنویسی ماژول‌های اصلی بر پایه‌ی طراحی Use-Case‑محور و بهینه‌سازی کوئری‌ها تا ۹۰٪ بهبود کارایی.",
        "طراحی و پیاده‌سازی کامل یکپارچه‌سازی پرداخت PayPal به‌صورت سرتاسری، شامل فرایند ثبت‌نام فروشندگان.",
        "افزودن ورود امن و یکپارچه با Google OAuth برای فروشندگان و مشتریان.",
        "ساخت یک دستیار هوش مصنوعی مبتنی بر GPT و بک‌اند یک ایجنت هوشمند که توضیحات محصول، مقاله‌ی بلاگ و محتوای فروشگاه را به‌صورت خودکار تولید می‌کند.",
        "طراحی یک جریان پشتیبانی هوشمند که هرجا اتوماسیون کافی نباشد، درخواست را از طریق ایمیل به اپراتور انسانی ارجاع می‌دهد.",
      ],
      stack: ["NestJS", "TypeScript", "OpenAI", "PayPal", "OAuth"],
    },
    {
      company: "نیک‌نظر آینده",
      role: "توسعه‌دهنده بک‌اند",
      location: "رشت، گیلان",
      period: "آوریل ۲۰۲۳ — ژوئن ۲۰۲۵",
      start: "2023",
      end: "2025",
      summary:
        "راهبری بک‌اند در پروژه‌های متعدد مشتریان بر بستر اکوسیستم NestJS، همراه با کارهای فول‌استک در Nuxt.js.",
      highlights: [
        "راهبری سرویس‌های بک‌اند برای طیفی از پروژه‌های مشتریان و انجام کارهای فول‌استک با ساخت فرانت‌اند در Nuxt.js.",
        "طراحی احراز هویت امن مبتنی بر توکن (JWT) و کنترل دسترسی با Passport.js.",
        "ساخت و نگه‌داری APIهای REST پایدار و اسکیمای PostgreSQL با Prisma.",
        "کاهش حدود ۳۰٪ زمان پاسخ میانگین APIها از طریق بهینه‌سازی کوئری و راهکارهای کشینگ.",
        "کانتینری‌سازی سرویس‌ها با Docker و استقرار روی بسترهای ابری مانند Liara.",
      ],
      stack: ["NestJS", "Nuxt.js", "PostgreSQL", "Prisma", "Docker"],
    },
    {
      company: "کارا تجارت آفرین آروشا",
      role: "توسعه‌دهنده فرانت‌اند",
      location: "رشت، گیلان",
      period: "آوریل ۲۰۲۲ — آوریل ۲۰۲۳",
      start: "2022",
      end: "2023",
      summary: "ساخت رابط‌های کاربری واکنش‌گرا و تعاملی محصولات با Vue.js و Nuxt.js.",
      highlights: [
        "ساخت رابط‌های کاربری واکنش‌گرا و تعاملی برای اپلیکیشن‌های وب با Vue.js و Nuxt.js.",
        "تبدیل طرح‌های UI/UX به کامپوننت‌های باکیفیت و قابل‌استفاده‌ی مجدد.",
        "مصرف APIهای بک‌اند در همکاری نزدیک با مهندسان سمت سرور.",
        "بهبود کارایی و تجربه‌ی کاربری اپلیکیشن از طریق بهینه‌سازی هدفمند کد.",
      ],
      stack: ["Vue.js", "Nuxt.js", "JavaScript", "SASS"],
    },
    {
      company: "نیک سلامت گستر",
      role: "توسعه‌دهنده فول‌استک",
      location: "رشت، گیلان",
      period: "اکتبر ۲۰۲۱ — مارس ۲۰۲۲",
      start: "2021",
      end: "2022",
      summary:
        "کار فول‌استک روی پلتفرم سلامت دیجی‌مراقب، از پایگاه‌داده تا رابط کاربری.",
      highlights: [
        "مشارکت در فرانت‌اند React.js و بک‌اند Nest.js پلتفرم دیجی‌مراقب.",
        "توسعه‌ی قابلیت‌ها در سراسر استک، از مدل‌سازی پایگاه‌داده تا پیاده‌سازی رابط کاربری.",
        "ساخت یک اپلیکیشن وب کامل به‌صورت سرتاسری.",
      ],
      stack: ["React.js", "Nest.js", "PostgreSQL"],
    },
  ] as Experience[],

  projects: [
    {
      name: "افق",
      index: "P-01",
      tagline: "یک پلتفرم محتوای Headless و چندزبانه.",
      description:
        "فرانت‌اند جداشده‌ی Next.js روی بک‌اند وردپرس. تمام رندر، HTML و سئو در دست Next.js است و محتوا از طریق WPGraphQL سرو می‌شود — چندزبانه میان فارسی، انگلیسی و عربی با پشتیبانی کامل از RTL.",
      contributions: [
        "طراحی معماری Headless با وردپرس و Next.js و مصرف محتوا از طریق یک کلاینت سبک WPGraphQL همراه با SSG/ISR و بازاعتبارسنجی بر اساس درخواست.",
        "پیاده‌سازی کامل چندزبانگی با next-intl (فارسی پیش‌فرض، به‌علاوه‌ی انگلیسی و عربی) شامل رندر RTL.",
        "نگاشت داده‌های سئوی Yoast / WPGraphQL به Metadata API نکست و ساخت JSON-LD مبتنی بر schema.org برای نتایج غنی.",
        "ساخت یک اندپوینت بازاعتبارسنجی بر اساس درخواست و مبتنی بر Webhook تا انتشار محتوای ادیتور بلافاصله صفحات ISR را تازه کند.",
      ],
      stack: ["Next.js", "TypeScript", "WPGraphQL", "Tailwind CSS", "next-intl", "WordPress"],
      url: "https://ofoq-web.vercel.app",
    },
    {
      name: "Aura Disposable",
      index: "P-02",
      tagline: "فروشگاه آنلاین لوکس با سامانه‌ی اصالت‌سنجی محصول.",
      description:
        "یک فروشگاه دیجیتال و درگاه عمده‌فروشی برای محصولات یک‌بارمصرف لوکس. راهبری توسعه‌ی وب را بر عهده داشتم؛ فرانت‌اند با Next.js و زیرساخت بک‌اند با Supabase.",
      contributions: [
        "ساخت فروشگاه اصلی و رابط کاربری با Next.js برای نمایش و مدیریت کاتالوگ محصولات.",
        "طراحی و یکپارچه‌سازی یک پنل مدیریت قدرتمند روی Supabase برای مدیریت بک‌اند، ذخیره‌سازی و عملیات.",
        "ساخت یک سامانه‌ی اصالت‌سنجی اختصاصی که خرید را از طریق کدهای یکتا و مستقیماً روی سایت تأیید می‌کند.",
      ],
      stack: ["Next.js", "Supabase", "TypeScript"],
      url: "https://auradisposable.com",
    },
    {
      name: "دیجی‌مراقب",
      index: "P-03",
      tagline: "پلتفرم سلامت برای اتصال بیماران به پزشکان.",
      description:
        "پلتفرمی برای مشاوره‌ی آنلاین و نوبت‌دهی. به‌عنوان توسعه‌دهنده‌ی فول‌استک روی بخش‌های اصلی کار کردم، با تمرکز بر ارتباط بلادرنگ.",
      contributions: [
        "توسعه‌ی چت بلادرنگ بیمار و پزشک با WebSocket.",
        "ساخت اندپوینت‌های API برای ثبت‌نام، مدیریت پروفایل و رزرو نوبت.",
        "مشارکت در طراحی اسکیمای پایگاه‌داده برای کاربران و نوبت‌ها.",
      ],
      stack: ["Vue.js", "Node.js", "Express", "PostgreSQL", "WebSockets"],
      url: "https://digimoragheb.com",
    },
  ] as Project[],

  otherProjects: [
    { name: "کاشی‌لند", url: "https://kashiland.com" },
    { name: "Future Media Services", url: "https://futuremservices.com" },
    { name: "فروشگاه مهرشاد", url: "https://mehrshadstore.ir" },
    { name: "پایتخت کتاب", url: "https://paytakhteketab.com" },
    { name: "نورنگار", url: "https://noornegar.com" },
    { name: "جهشینو", url: "https://jaheshino.ir" },
    { name: "فضای کار اشتراکی سکّو", url: "https://sakkou-cowork.ir" },
  ] as OtherProject[],

  education: {
    degree: "کارشناسی ارشد مهندسی کامپیوتر",
    school: "دانشگاه آزاد اسلامی، واحد رشت",
    period: "اکتبر ۲۰۲۴ — اکنون",
  },

  languages: [
    { name: "فارسی", level: "زبان مادری" },
    { name: "انگلیسی", level: "مسلط" },
  ],

  sections: [
    { id: "home", label: "خانه" },
    { id: "about", label: "درباره" },
    { id: "work", label: "تجربه‌ها" },
    { id: "projects", label: "پروژه‌ها" },
    { id: "contact", label: "تماس" },
  ],

  ui: {
    nav: { emailMe: "ایمیل به من", cv: "رزومه", downloadCv: "دانلود رزومه", switchTo: "EN", switchAria: "تغییر به انگلیسی", openMenu: "باز کردن منو", closeMenu: "بستن منو" },
    hero: {
      taglinePre: "من ",
      taglineHighlight: "سیستم‌هایی",
      taglinePost: " می‌سازم که پشت صفحه‌اند.",
      nameRoleSep: " — ",
      lead: "بک‌اندهای مقیاس‌پذیر با NestJS و Node، سیستم‌های بلادرنگ و قابلیت‌های هوش مصنوعی — و فرانت‌اندهای سریع و سئوپسندی که جلوی آن‌ها قرار می‌گیرند. {years} سال، بک‌اندمحور و فول‌استک.",
      viewWork: "دیدن نمونه‌کارها",
      downloadCv: "دانلود رزومه",
      basedIn: "محل",
      email: "ایمیل",
      panelTitle: "// system.map",
      live: "زنده",
      cursorHint: "نشانگر را میان لایه‌های استک حرکت دهید",
      scroll: "اسکرول",
      scrollToAbout: "اسکرول به بخش درباره",
    },
    about: { tag: "whoami", title: "بک‌اندمحور. مسلط بر فرانت‌اند." },
    skills: {
      tag: "stack",
      title: "ابزارهایی که سراغشان می‌روم",
      lead: "شش دسته‌ای که با آن‌ها کار واقعی و محصولی تحویل داده‌ام — از پایگاه‌داده تا تک‌تک پیکسل‌ها.",
    },
    experience: {
      tag: "work",
      title: "چهار سال، ساختِ سیستم‌ها",
      lead: "نقش‌هایی که در آن‌ها مالک معماری بک‌اند بودم و هرجا لازم شد در سراسر استک گام برداشتم.",
    },
    projects: {
      tag: "selected builds",
      title: "چیزهایی که ساخته‌ام",
      lead: "چند پروژه که در آن‌ها سهم معناداری بر عهده داشتم — از معماری Headless تا قابلیت‌های بلادرنگ.",
      builtWith: "ساخته‌شده با",
    },
    otherProjects: { tag: "همچنین ساخته‌شده" },
    education: { tag: "تحصیلات", languagesTag: "زبان‌ها" },
    footer: {
      tag: "در تماس باشیم",
      title: "بیایید چیزی بسازیم که دوام بیاورد.",
      leadPre: "من ",
      leadPost: " هستم و با کمال میل درباره‌ی معماری بک‌اند، ساخت فول‌استک یا قابلیت‌های هوش مصنوعی گفت‌وگو می‌کنم. سریع‌ترین راه دسترسی به من ایمیل است.",
      copyEmail: "کپی ایمیل",
      copied: "کپی شد!",
      downloadCv: "دانلود رزومه",
      backToTop: "بازگشت به بالا",
      builtWith: "ساخته‌شده با Next.js، TypeScript و Tailwind.",
      socials: { github: "گیت‌هاب", linkedin: "لینکدین", email: "ایمیل", phone: "تلفن" },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Locale registry + shared, language-neutral data                    */
/* ------------------------------------------------------------------ */

export const content: Record<Lang, Content> = { en, fa };

/** English profile/graph kept as static exports for server-side metadata. */
export const profile = en.profile;

/**
 * The architecture graph in the hero. Nodes are grouped into layers so the
 * canvas can lay them out as a real system diagram. Edges describe data flow.
 * Language-neutral — node labels are technology names.
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
