"use client";

import { useContent, useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Experience() {
  const { experience, ui } = useContent();
  const { dir } = useLang();
  const rtl = dir === "rtl";
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32"
    >
      <SectionHeading
        tag={ui.experience.tag}
        title={ui.experience.title}
        lead={ui.experience.lead}
      />

      <ol className="mt-14">
        {experience.map((job, i) => (
          <li key={job.company} className="group relative">
            <div className="grid gap-x-8 gap-y-4 pb-14 sm:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr]">
              {/* Left rail: period */}
              <div className="relative">
                <Reveal>
                  <div className="sm:sticky sm:top-28">
                    <p className="font-mono text-[0.78rem] text-accent">
                      {job.period}
                    </p>
                    <p className="mt-1 font-mono text-[0.72rem] text-faint">
                      {job.location}
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right: content with timeline line (flips side in RTL) */}
              <div
                className={`relative border-line pb-2 ${
                  rtl ? "sm:border-r sm:pr-8" : "sm:border-l sm:pl-8"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute top-1.5 hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-accent sm:block ${
                    rtl ? "-right-[5px]" : "-left-[5px]"
                  }`}
                />

                <Reveal>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-base text-muted">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline font-medium text-ink"
                      >
                        {job.company} ↗
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{job.company}</span>
                    )}
                  </p>
                  <p className="prose-lead mt-3 leading-relaxed text-muted">
                    {job.summary}
                  </p>
                </Reveal>

                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((h, hi) => (
                    <Reveal as="li" key={hi} delay={hi * 0.04}>
                      <span className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-line)]"
                        />
                        {h}
                      </span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={0.1}>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md bg-elevated px-2.5 py-1 font-mono text-[0.72rem] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
