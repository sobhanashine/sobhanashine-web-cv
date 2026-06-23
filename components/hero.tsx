"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { profile } from "@/lib/content";
import { ArchitectureGraph } from "@/components/architecture-graph";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.1 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:pt-32"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Left — copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-7 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="label !text-[0.7rem] !tracking-[0.14em] text-muted">
              {profile.availability}
            </span>
          </motion.div>

          <h1 className="font-display text-balance">
            <motion.span
              variants={item}
              className="mb-3 block text-base font-medium tracking-tight text-muted sm:text-lg"
            >
              {profile.name} — {profile.role}
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink"
            >
              I build the{" "}
              <span className="relative inline-block whitespace-nowrap text-accent">
                systems
                {!reduced && <span className="caret" aria-hidden="true" />}
              </span>{" "}
              behind the screen.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="prose-lead mt-7 text-lg leading-relaxed text-muted"
          >
            Scalable backends in NestJS &amp; Node, real-time systems and AI
            features — and the SEO-fast frontends in front of them. {profile.yearsExperience}{" "}
            years, backend-first and full-stack.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-[var(--shadow-md)] transition-transform duration-300 hover:scale-[1.02]"
              >
                View work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </Magnetic>

            <a
              href={profile.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-elevated"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
              Download CV
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6"
          >
            {[
              { k: "Based in", v: profile.location },
              { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
            ].map((m) => (
              <div key={m.k}>
                <dt className="label !text-[0.62rem]">{m.k}</dt>
                <dd className="mt-1 text-sm text-ink">
                  {m.href ? (
                    <a className="link-underline" href={m.href}>
                      {m.v}
                    </a>
                  ) : (
                    m.v
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Right — live system map */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] shadow-[var(--shadow-lg)] backdrop-blur-sm sm:aspect-[4/3] lg:aspect-square">
            {/* panel header */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[0.7rem] tracking-wide text-muted">
                // system.map
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                live
              </span>
            </div>
            {/* corner ticks */}
            <span className="pointer-events-none absolute left-3 top-12 h-3 w-3 border-l border-t border-line-strong" />
            <span className="pointer-events-none absolute right-3 top-12 h-3 w-3 border-r border-t border-line-strong" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-line-strong" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-line-strong" />

            <div className="absolute inset-0 pt-10">
              <ArchitectureGraph />
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.7rem] text-faint">
            move your cursor through the stack
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint lg:flex"
      >
        <span className="label !text-[0.6rem]">scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <motion.span
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-faint"
          />
        </span>
      </motion.a>
    </section>
  );
}
