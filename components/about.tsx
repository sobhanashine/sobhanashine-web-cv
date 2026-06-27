"use client";

import { useContent } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function About() {
  const { about, ui } = useContent();
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <div>
          <SectionHeading tag={ui.about.tag} title={ui.about.title} />
          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05} as="p">
                <span
                  className={
                    i === 0
                      ? "text-xl leading-relaxed text-ink"
                      : "text-lg leading-relaxed text-muted"
                  }
                >
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Quick facts — a small spec panel */}
        <Reveal delay={0.1} className="lg:pt-20">
          <dl className="overflow-hidden rounded-2xl border border-line bg-surface">
            {about.facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
                  i !== 0 ? "border-t border-line" : ""
                }`}
              >
                <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-faint">
                  {f.label}
                </dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
