"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useContent, useLang } from "@/lib/i18n";
import { Magnetic } from "@/components/magnetic";

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function Nav() {
  const { profile, sections, ui } = useContent();
  const { lang, toggle } = useLang();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  // tel: link needs digits only (strip spaces from the display number).
  const telHref = `tel:${profile.phone.replace(/\s/g, "")}`;

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconLink =
    "grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:bg-elevated hover:text-ink";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-4 py-3 sm:px-6 sm:py-4">
      <nav
        className={`pointer-events-auto flex w-full max-w-6xl items-center gap-4 rounded-full border px-3 py-2 pl-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-line bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] shadow-[var(--shadow-md)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Left zone — flex-1 keeps the centered links balanced against the
            right cluster instead of overlapping it (the links used to be
            absolutely positioned, which collided once the cluster grew). */}
        <div className="flex flex-1 justify-start">
          {/* Wordmark — Latin uses the mono brand face; Persian shows the
              full name in Vazirmatn (inherited sans) so the script renders
              cleanly instead of falling back through the monospace stack. */}
          <a
            href="#home"
            className={`group flex items-center gap-2 text-sm font-medium tracking-tight ${
              lang === "fa" ? "" : "font-mono"
            }`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[13px] font-bold text-[var(--accent-ink)]">
              S
            </span>
            <span className="hidden sm:inline">
              {lang === "fa" ? profile.name : profile.lastName.toLowerCase()}
              <span className="text-accent">.</span>
            </span>
          </a>
        </div>

        {/* Desktop links — centered zone */}
        <ul className="hidden shrink-0 items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                  active === s.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-elevated"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right zone — flex-1 mirrors the left zone so the link group
            stays centered between them and never overlaps the cluster. */}
        <div className="flex flex-1 justify-end">
          <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${iconLink} hidden sm:grid`}
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${iconLink} hidden sm:grid`}
          >
            <LinkedInIcon />
          </a>
          {/* Responsive visibility lives on the wrapper: Magnetic forces
              display:inline-flex inline, which would override `hidden`. */}
          <span className="hidden xl:inline-flex">
            <Magnetic>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors duration-300 hover:border-line-strong hover:bg-elevated"
              >
                <PhoneIcon />
                {ui.nav.callMe}
              </a>
            </Magnetic>
          </span>
          <span className="hidden sm:inline-flex">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <MailIcon />
                {ui.nav.emailMe}
              </a>
            </Magnetic>
          </span>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={ui.nav.switchAria}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 font-mono text-[0.78rem] font-medium text-muted transition-colors duration-300 hover:border-line-strong hover:bg-elevated hover:text-ink"
          >
            <GlobeIcon />
            {ui.nav.switchTo}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 top-0 h-[1.5px] w-full bg-current transition-all duration-300"
                style={{
                  transform: open ? "translateY(5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-all duration-300"
                style={{
                  transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed inset-0 z-[-1] flex flex-col bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-1 flex-col items-center justify-center gap-1.5">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-display text-4xl font-semibold ${
                      active === s.id ? "text-accent" : "text-ink"
                    }`}
                  >
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Direct contact at the base of the mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-5 px-6 pb-12"
            >
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-[var(--accent-ink)]"
              >
                <MailIcon />
                {ui.nav.emailMe}
              </a>
              <a
                href={telHref}
                onClick={() => setOpen(false)}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-base font-semibold text-ink"
              >
                <PhoneIcon />
                {ui.nav.callMe}
              </a>
              <div className="flex items-center gap-3">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
                  <GitHubIcon />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
                  <LinkedInIcon />
                </a>
                <a href={profile.resume} download aria-label={ui.nav.downloadCv} className={`${iconLink} w-auto px-4 font-mono text-[0.75rem]`}>
                  {ui.nav.cv}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
