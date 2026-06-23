import { education, languages } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Education() {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
      <div className="grid gap-10 rounded-3xl border border-line bg-surface p-8 sm:grid-cols-2 sm:p-10">
        {/* Education */}
        <Reveal>
          <p className="font-mono text-[0.8rem] text-muted">
            <span className="text-faint">// </span>education
          </p>
          <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-ink">
            {education.degree}
          </h3>
          <p className="mt-1 text-muted">{education.school}</p>
          <p className="mt-1 font-mono text-[0.78rem] text-faint">
            {education.period}
          </p>
        </Reveal>

        {/* Languages */}
        <Reveal delay={0.06} className="sm:border-l sm:border-line sm:pl-10">
          <p className="font-mono text-[0.8rem] text-muted">
            <span className="text-faint">// </span>languages
          </p>
          <ul className="mt-4 space-y-3">
            {languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between">
                <span className="text-lg font-medium text-ink">{l.name}</span>
                <span className="font-mono text-[0.8rem] text-muted">
                  {l.level}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
