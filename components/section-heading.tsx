import { Reveal } from "@/components/reveal";

type Props = {
  /** Code-comment kicker, e.g. "whoami" → renders as "// whoami". */
  tag: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
};

export function SectionHeading({ tag, title, lead, className }: Props) {
  return (
    <div className={className}>
      <Reveal>
        <p className="font-mono text-[0.8rem] text-accent">
          <span className="text-faint">// </span>
          {tag}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="prose-lead mt-4 text-lg leading-relaxed text-muted">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
