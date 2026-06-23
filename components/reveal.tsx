"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  as?: "div" | "li" | "section" | "span" | "p" | "article";
};

/**
 * Rises content into view as it enters the viewport. A safety timeout always
 * reveals the content shortly after mount, so nothing can ship blank if the
 * observer never fires (headless renders, no-scroll, paused tabs).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), 900);
    return () => clearTimeout(t);
  }, []);

  const show = reduced || inView || forced;
  const MotionTag = motion[as] as typeof motion.div;
  const hidden = { opacity: 0, y };
  const visible = { opacity: 1, y: 0 };

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? visible : hidden}
      animate={show ? visible : hidden}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
