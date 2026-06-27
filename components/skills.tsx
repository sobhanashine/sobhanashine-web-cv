"use client";

import { useContent } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Skills() {
  const { skillGroups, ui } = useContent();
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading
        tag={ui.skills.tag}
        title={ui.skills.title}
        lead={ui.skills.lead}
      />

      <div className="mt-12 border-t border-line">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.04}>
            <div className="group grid grid-cols-1 gap-4 border-b border-line py-6 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--elevated)_50%,transparent)] sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.72rem] text-faint transition-colors duration-300 group-hover:text-accent">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-sm font-medium tracking-tight text-ink">
                  {group.label}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)] hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
