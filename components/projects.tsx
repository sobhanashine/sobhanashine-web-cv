"use client";

import { useRef } from "react";
import type { Project } from "@/lib/content";
import { useContent } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Projects() {
  const { projects, ui } = useContent();
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32"
    >
      <SectionHeading
        tag={ui.projects.tag}
        title={ui.projects.title}
        lead={ui.projects.lead}
      />

      <div className="mt-14 space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <ProjectCard project={p} builtWith={ui.projects.builtWith} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  builtWith,
}: {
  project: Project;
  builtWith: string;
}) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-[var(--accent-line)] sm:p-9"
    >
      {/* whole-card link (stretched) when the project has a URL */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — open ${project.url.replace("https://", "")}`}
          className="absolute inset-0 z-20"
        />
      )}

      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), var(--accent-soft), transparent 70%)",
        }}
      />

      <div className="relative grid gap-x-10 gap-y-6 lg:grid-cols-[1fr_240px]">
        {/* main */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.72rem] text-accent">
              {project.index}
            </span>
            <span className="h-px w-8 bg-line-strong" />
            {project.url && (
              <span className="font-mono text-[0.72rem] text-faint">
                {project.url.replace("https://", "")}
              </span>
            )}
          </div>

          <h3 className="font-display mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-ink">
            {project.name}
            {project.url && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            )}
          </h3>

          <p className="mt-2 text-base font-medium text-accent/90">
            {project.tagline}
          </p>
          <p className="prose-lead mt-4 leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.contributions.map((c, ci) => (
              <li
                key={ci}
                className="flex gap-3 text-[0.92rem] leading-relaxed text-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-line)]" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* stack rail */}
        <div className="lg:border-l lg:border-line lg:pl-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-faint">
            {builtWith}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
            {project.stack.map((s, si) => (
              <li
                key={s}
                className={`rounded-md px-2.5 py-1.5 font-mono text-[0.8rem] text-muted lg:rounded-none lg:border-line lg:px-0 lg:py-2 ${
                  si !== 0 ? "lg:border-t" : ""
                } bg-elevated lg:bg-transparent`}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
