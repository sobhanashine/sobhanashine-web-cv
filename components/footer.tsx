"use client";

import { useState } from "react";
import { profile } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

const socials = [
  { label: "GitHub", href: profile.github, handle: "@sobhanashine" },
  { label: "LinkedIn", href: profile.linkedin, handle: "in/sobhan-ashineh" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, handle: profile.phone },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto button still works */
    }
  }

  return (
    <footer
      id="contact"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 pt-24 sm:px-8 lg:pt-32"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 sm:px-12 sm:py-20">
        {/* ambient accent glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "var(--accent-soft)" }}
        />

        <div className="relative">
          <Reveal>
            <p className="font-mono text-[0.8rem] text-accent">
              <span className="text-faint">// </span>get in touch
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-4 max-w-2xl text-balance text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink">
              Let&apos;s build something that holds up.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="prose-lead mt-5 text-lg leading-relaxed text-muted">
              I&apos;m {profile.availability.toLowerCase()} and happy to talk
              backend architecture, full-stack builds, or AI features. The
              fastest way to reach me is email.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[var(--accent-ink)] shadow-[var(--shadow-md)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  {profile.email}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-elevated"
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                    </svg>
                    Copy email
                  </>
                )}
              </button>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-elevated"
              >
                Download CV
              </a>
            </div>
          </Reveal>

          {/* socials */}
          <Reveal delay={0.2}>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex h-full flex-col gap-1 bg-surface px-5 py-4 transition-colors duration-300 hover:bg-elevated"
                  >
                    <span className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-wider text-faint">
                      {s.label}
                      <span className="text-faint transition-all duration-300 group-hover:text-accent">
                        ↗
                      </span>
                    </span>
                    <span className="truncate text-sm font-medium text-ink">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* base bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-[0.72rem] text-faint">
          © {year} {profile.name}. Built with Next.js, TypeScript &amp; Tailwind.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 font-mono text-[0.72rem] text-faint transition-colors hover:text-ink"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
