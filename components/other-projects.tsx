import { otherProjects } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function OtherProjects() {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-[0.8rem] text-muted">
          <span className="text-faint">// </span>also shipped
        </p>
      </Reveal>

      <ul className="mt-6 border-t border-line">
        {otherProjects.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 0.03}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--elevated)_50%,transparent)] sm:px-2"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[0.72rem] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {p.name}
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden font-mono text-[0.78rem] text-faint sm:inline">
                  {p.url.replace("https://", "")}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="-translate-x-1 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
