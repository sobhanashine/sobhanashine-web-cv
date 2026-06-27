import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Vazirmatn,
} from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";
import { LanguageProvider, noFlashScript } from "@/lib/i18n";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Nav } from "@/components/nav";
import { ScrollProgress } from "@/components/scroll-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Persian (RTL) typeface — applied via [data-lang="fa"] in globals.css.
const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// TODO(sobhan): set this to your real deployed domain so OG/Twitter cards resolve.
const SITE_URL = "https://sobhanashine.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Full-stack engineer with 4+ years building scalable backends in NestJS & Node, and the SEO-fast frontends in front of them. Available for remote roles.",
  keywords: [
    "Sobhan Ashineh",
    "Full-Stack Engineer",
    "NestJS Developer",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Backend Developer",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} — ${profile.role}`,
    description:
      "Backend-first, frontend-fluent. Building scalable systems in NestJS, Node, and TypeScript.",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Backend-first, frontend-fluent. Building scalable systems in NestJS, Node, and TypeScript.",
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github, profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Rasht", addressCountry: "IR" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      data-lang="en"
      suppressHydrationWarning
      style={{ colorScheme: "dark" }}
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${vazirmatn.variable} antialiased`}
    >
      <head>
        <script
          // Applies the saved language to <html> before paint (no RTL flash).
          dangerouslySetInnerHTML={{ __html: noFlashScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          <ScrollProgress />
          <div className="grain" aria-hidden="true" />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent-ink)]"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
