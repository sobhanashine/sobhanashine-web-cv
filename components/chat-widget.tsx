"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { content, type Lang } from "@/lib/content";

type Message = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Render a single line of model output: turns **bold**, bare URLs, and email
 * addresses into real elements. Builds React nodes (no dangerouslySetInnerHTML),
 * so user/model text can never inject markup.
 */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const pattern =
    /(\*\*[^*]+\*\*)|(https?:\/\/[^\s)]+)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  const link =
    "text-accent underline underline-offset-2 break-all hover:text-accent-strong";
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (m[1]) {
      nodes.push(
        <strong key={`${keyBase}-b${i}`} className="font-semibold">
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (m[2]) {
      nodes.push(
        <a key={`${keyBase}-u${i}`} href={tok} target="_blank" rel="noopener noreferrer" className={link}>
          {tok}
        </a>,
      );
    } else {
      nodes.push(
        <a key={`${keyBase}-m${i}`} href={`mailto:${tok}`} className={link}>
          {tok}
        </a>,
      );
    }
    last = pattern.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Render model output into paragraphs and bullet lists for comfortable reading. */
function FormattedMessage({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  let key = 0;

  const flush = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul${key++}`} className="my-0.5 space-y-1.5">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{renderInline(it, `li${key}-${idx}`)}</span>
          </li>
        ))}
      </ul>,
    );
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
    } else if (line === "") {
      flush();
    } else {
      flush();
      blocks.push(
        <p key={`p${key++}`}>{renderInline(line, `p${key}`)}</p>,
      );
    }
  }
  flush();

  return <div className="space-y-2">{blocks}</div>;
}

/* ------------------------------------------------------------------------- */
/*  Artifacts — rich inline cards the model can attach to an answer.          */
/*  The model only names WHAT to show (e.g. {"type":"project","name":"OFOQ"}) */
/*  and the card pulls the real data (links, stack, URLs) from lib/content,   */
/*  so cards are always accurate, bilingual, and never hallucinated.          */
/* ------------------------------------------------------------------------- */

type Artifact =
  | { type: "contact" }
  | { type: "cv" }
  | { type: "call" }
  | { type: "skills"; group?: string }
  | { type: "project"; name?: string }
  | { type: "experience"; company?: string };

const ARTIFACT_RE = /```artifact\s*([\s\S]*?)```/g;

/** Pull ```artifact {json}``` blocks out of model output, returning the
 *  remaining prose plus the parsed artifacts (malformed blocks are dropped). */
function parseArtifacts(raw: string): { text: string; artifacts: Artifact[] } {
  const artifacts: Artifact[] = [];
  const text = raw
    .replace(ARTIFACT_RE, (_full, body: string) => {
      try {
        const obj = JSON.parse(body.trim());
        if (obj && typeof obj.type === "string") artifacts.push(obj as Artifact);
      } catch {
        /* ignore malformed artifact block */
      }
      return "";
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { text, artifacts };
}

const CARD_COPY = {
  en: { contact: "Get in touch", email: "Email", call: "Call", linkedin: "LinkedIn", github: "GitHub", cv: "Download CV", visit: "Visit site", skills: "Skills" },
  fa: { contact: "در تماس باشید", email: "ایمیل", call: "تماس", linkedin: "لینکدین", github: "گیت‌هاب", cv: "دانلود رزومه", visit: "مشاهده سایت", skills: "مهارت‌ها" },
} as const;

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Find an item by a name field across BOTH languages (the en/fa arrays are
 *  parallel), so the model may reference it in either language. Returns the
 *  shared index, or -1. */
function indexByKey<T>(en: T[], fa: T[], key: keyof T, name?: string): number {
  if (!name) return -1;
  const n = name.trim().toLowerCase();
  const hit = (arr: T[]) =>
    arr.findIndex((x) => {
      const v = String(x[key]).toLowerCase();
      return v === n || v.includes(n) || n.includes(v);
    });
  const i = hit(en);
  return i >= 0 ? i : hit(fa);
}

function Icon({ d, fill = false }: { d: string; fill?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const MailIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
const GitHubIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>;
const LinkedInIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
const DownloadIcon = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" />;
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />;
const ExternalIcon = () => <Icon d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14 21 3" />;
const SparkIcon = () => <Icon d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />;

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-elevated px-2 py-0.5 text-[11px] text-muted">
      {children}
    </span>
  );
}

function CardShell({ title, icon, children }: { title?: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface/80 shadow-sm">
      {title && (
        <div className="flex items-center gap-2 border-b border-line/70 bg-accent-soft px-3 py-2 text-accent">
          {icon}
          <span className="text-xs font-semibold text-ink">{title}</span>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

function ContactCard({ lang }: { lang: Lang }) {
  const p = content[lang].profile;
  const c = CARD_COPY[lang];
  const base = "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors";
  const ghost = `${base} border border-line bg-elevated text-ink hover:border-line-strong`;
  return (
    <CardShell title={c.contact} icon={<MailIcon />}>
      <div className="grid grid-cols-2 gap-2">
        <a href={`mailto:${p.email}`} className={`${base} bg-accent text-[var(--accent-ink)] hover:bg-accent-strong`}><MailIcon /> {c.email}</a>
        <a href={telHref(p.phone)} className={ghost}><PhoneIcon /> {c.call}</a>
        <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className={ghost}><LinkedInIcon /> {c.linkedin}</a>
        <a href={p.github} target="_blank" rel="noopener noreferrer" className={ghost}><GitHubIcon /> {c.github}</a>
        <a href={p.resume} download className={`${ghost} col-span-2`}><DownloadIcon /> {c.cv}</a>
      </div>
    </CardShell>
  );
}

function CvCard({ lang }: { lang: Lang }) {
  const p = content[lang].profile;
  const c = CARD_COPY[lang];
  return (
    <CardShell>
      <a href={p.resume} download className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-accent-strong">
        <DownloadIcon /> {c.cv}
      </a>
    </CardShell>
  );
}

function CallCard({ lang }: { lang: Lang }) {
  const p = content[lang].profile;
  const c = CARD_COPY[lang];
  return (
    <CardShell title={c.call} icon={<PhoneIcon />}>
      <a href={telHref(p.phone)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-accent-strong">
        <PhoneIcon /> <span dir="ltr">{p.phone}</span>
      </a>
    </CardShell>
  );
}

function ProjectCard({ lang, name }: { lang: Lang; name?: string }) {
  const idx = indexByKey(content.en.projects, content.fa.projects, "name", name);
  if (idx < 0) return null;
  const proj = content[lang].projects[idx];
  const c = CARD_COPY[lang];
  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold text-ink">{proj.name}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted">{proj.tagline}</p>
        </div>
        {proj.url && (
          <a href={proj.url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-accent-line bg-accent-soft px-2.5 py-1.5 text-[11px] font-medium text-accent transition-opacity hover:opacity-80">
            {c.visit} <ExternalIcon />
          </a>
        )}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {proj.stack.map((s) => <Chip key={s}>{s}</Chip>)}
      </div>
    </CardShell>
  );
}

function ExperienceCard({ lang, company }: { lang: Lang; company?: string }) {
  const idx = indexByKey(content.en.experience, content.fa.experience, "company", company);
  if (idx < 0) return null;
  const exp = content[lang].experience[idx];
  return (
    <CardShell>
      <p className="font-display text-sm font-semibold text-ink">{exp.role}</p>
      <p className="mt-0.5 text-xs font-medium text-accent">{exp.company}</p>
      <p className="mt-0.5 text-[11px] text-faint">{exp.period} · {exp.location}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{exp.summary}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {exp.stack.map((s) => <Chip key={s}>{s}</Chip>)}
      </div>
    </CardShell>
  );
}

function SkillsCard({ lang, group }: { lang: Lang; group?: string }) {
  const groups = content[lang].skillGroups;
  let shown = groups;
  if (group) {
    const gi = indexByKey(content.en.skillGroups, content.fa.skillGroups, "label", group);
    if (gi >= 0) shown = [groups[gi]];
  }
  return (
    <CardShell title={CARD_COPY[lang].skills} icon={<SparkIcon />}>
      <div className="space-y-2.5">
        {shown.map((g) => (
          <div key={g.label}>
            <p className="mb-1.5 text-[11px] font-medium text-faint">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => <Chip key={it}>{it}</Chip>)}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function ArtifactView({ artifact, lang }: { artifact: Artifact; lang: Lang }) {
  switch (artifact.type) {
    case "contact":
      return <ContactCard lang={lang} />;
    case "cv":
      return <CvCard lang={lang} />;
    case "call":
      return <CallCard lang={lang} />;
    case "project":
      return <ProjectCard lang={lang} name={artifact.name} />;
    case "experience":
      return <ExperienceCard lang={lang} company={artifact.company} />;
    case "skills":
      return <SkillsCard lang={lang} group={artifact.group} />;
    default:
      return null;
  }
}

const SUGGESTIONS = {
  en: [
    "What is your tech stack?",
    "Are you available for remote work?",
    "Tell me about the OFOQ project.",
    "How can I contact you?",
  ],
  fa: [
    "مهارت‌های فنی شما چیست؟",
    "آیا برای همکاری دورکاری آماده‌اید؟",
    "درباره پروژه افق (OFOQ) توضیح دهید.",
    "چگونه می‌توانم با شما در ارتباط باشم؟",
  ],
};

export function ChatWidget() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The greeting is derived (not stored in state), so it always renders in the
  // current language and is never sent to the model as conversation history.
  const greeting =
    lang === "fa"
      ? "سلام! من دستیار هوش مصنوعی سبحان هستم. هر سوالی درباره مهارت‌ها، پروژه‌ها یا سوابق کاری او دارید از من بپرسید."
      : "Hi there! I'm Sobhan's AI Assistant. Ask me anything about his skills, experience, or projects!";

  // Greeting bubble first, then the live conversation.
  const displayMessages: Message[] = [
    { role: "assistant", content: greeting },
    ...messages,
  ];

  // Keep the latest message in view. Scroll the panel's own container directly
  // (not scrollIntoView) so it never nudges the Lenis-driven page behind it.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg =
        lang === "fa"
          ? "متأسفانه مشکلی در برقراری ارتباط رخ داد. لطفاً دوباره تلاش کنید."
          : "Sorry, I encountered an error. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const suggestions = SUGGESTIONS[lang as "en" | "fa"] || SUGGESTIONS.en;

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        className={`fixed z-50 p-4 rounded-full bg-accent text-[var(--accent-ink)] shadow-lg hover:scale-105 transition-all duration-300 ease-out-expo hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
          lang === "fa"
            ? "left-6 bottom-6 md:left-8 md:bottom-8"
            : "right-6 bottom-6 md:right-8 md:bottom-8"
        }`}
        style={{ transformOrigin: "center" }}
      >
        <span className="relative block w-6 h-6">
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              isOpen ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              isOpen ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
        </span>
      </button>

      {/* Chat Window Container */}
      <div
        className={`fixed z-50 bottom-24 flex flex-col bg-surface border border-line rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out-expo ${
          isOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        } ${
          lang === "fa"
            ? "left-4 right-4 sm:right-auto sm:left-6"
            : "right-4 left-4 sm:left-auto sm:right-6"
        } w-auto sm:w-96 h-[500px] sm:h-[550px]`}
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(17, 20, 28, 0.95)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-gradient-to-b from-accent-soft to-transparent px-3.5 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-sm font-bold text-[var(--accent-ink)] shadow-sm">
              S
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-surface" />
            </span>
            <div className="min-w-0 leading-tight">
              <h3 className="truncate text-sm font-semibold text-ink">
                {lang === "fa" ? "دستیار هوشمند سبحان" : "Sobhan's AI Assistant"}
              </h3>
              <p className="text-[11px] text-faint">
                {lang === "fa" ? "آنلاین" : "Online"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-elevated hover:text-ink"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Message Area — min-h-0 lets this flex child actually scroll, and
            data-lenis-prevent stops the site's smooth-scroll from stealing the
            wheel/touch gesture inside the panel. */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="chat-scroll flex-1 min-h-0 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {displayMessages.map((msg, idx) => {
            if (msg.role === "user") {
              return (
                <div key={idx} className="msg-in ms-auto flex w-fit max-w-[88%] items-end gap-2">
                  <div
                    dir="auto"
                    className="rounded-2xl rounded-se-md bg-gradient-to-br from-accent to-accent-strong px-3.5 py-2.5 text-sm leading-relaxed text-[var(--accent-ink)] shadow-[0_6px_18px_-8px_var(--accent)] whitespace-pre-wrap"
                  >
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Assistant: prose bubble (if any) plus any rich artifact cards.
            const { text, artifacts } = parseArtifacts(msg.content);
            return (
              <div key={idx} className="msg-in me-auto flex w-full max-w-[92%] items-start gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-[11px] font-bold text-[var(--accent-ink)] shadow-sm">
                  S
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  {text && (
                    <div
                      dir="auto"
                      className="w-fit max-w-full rounded-2xl rounded-ss-md border border-line/70 bg-elevated/90 px-3.5 py-2.5 text-sm leading-relaxed text-ink shadow-sm"
                    >
                      <FormattedMessage content={text} />
                    </div>
                  )}
                  {artifacts.map((a, ai) => (
                    <ArtifactView key={ai} artifact={a} lang={lang} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="msg-in me-auto flex w-fit items-end gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-[11px] font-bold text-[var(--accent-ink)] shadow-sm">
                S
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-ss-md border border-line/70 bg-elevated/90 px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length === 0 && !isLoading && (
          <div className="px-4 pb-2 pt-1.5 overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestions.map((question, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(question)}
                className="whitespace-nowrap flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-line-strong bg-elevated hover:bg-line text-muted hover:text-ink transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input Area Form */}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 border-t border-line bg-surface/50 p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={lang === "fa" ? "سوالی بپرسید..." : "Ask a question..."}
            className="min-w-0 flex-1 rounded-full border border-line bg-elevated px-4 py-2.5 text-sm text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label={lang === "fa" ? "ارسال پیام" : "Send message"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-[var(--accent-ink)] shadow-[0_6px_16px_-6px_var(--accent)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-40 disabled:shadow-none"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
