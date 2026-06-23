"use client";

import { useEffect, useRef } from "react";
import { graph } from "@/lib/content";

type Palette = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  signal: string;
};

type NodeState = {
  id: string;
  label: string;
  layer: number;
  kind: string;
  bx: number; // base x (px)
  by: number; // base y (px)
  x: number; // animated x
  y: number; // animated y
  phase: number; // ambient float phase
  r: number; // radius
};

type Packet = { from: string; to: string; t: number; speed: number; delay: number };

function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  const v = (n: string, fallback: string) => s.getPropertyValue(n).trim() || fallback;
  return {
    bg: v("--bg", "#0a0c12"),
    surface: v("--surface", "#11141c"),
    ink: v("--ink", "#eceef3"),
    muted: v("--muted", "#9aa3b2"),
    line: v("--line-strong", "rgba(255,255,255,0.16)"),
    accent: v("--accent", "#8b78ff"),
    signal: v("--signal-2", "#38e0c8"),
  };
}

export function ArchitectureGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let palette = readPalette(document.documentElement);
    let fontFamily = getComputedStyle(wrap).fontFamily || "monospace";
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const layers = Math.max(...graph.nodes.map((n) => n.layer)) + 1;
    const perLayer: Record<number, number> = {};
    graph.nodes.forEach((n) => {
      perLayer[n.layer] = (perLayer[n.layer] ?? 0) + 1;
    });
    const layerIndex: Record<string, number> = {};

    const nodes: NodeState[] = graph.nodes.map((n) => {
      const idxInLayer = layerIndex[n.layer] ?? 0;
      layerIndex[n.layer] = idxInLayer + 1;
      return {
        id: n.id,
        label: n.label,
        layer: n.layer,
        kind: n.kind,
        bx: 0,
        by: 0,
        x: 0,
        y: 0,
        phase: Math.random() * Math.PI * 2,
        r: n.kind === "core" ? 7 : 4.5,
      };
    });
    const nodeById = new Map(nodes.map((n) => [n.id, n]));

    const packets: Packet[] = graph.edges.map(([from, to]) => ({
      from,
      to,
      t: Math.random(),
      speed: 0.0016 + Math.random() * 0.0014,
      delay: Math.random() * 240,
    }));

    const mouse = { x: -9999, y: -9999, active: false };

    function layout() {
      const padX = width * 0.13;
      const padY = height * 0.16;
      const usableW = width - padX * 2;
      const usableH = height - padY * 2;
      const counter: Record<number, number> = {};
      nodes.forEach((n) => {
        const i = counter[n.layer] ?? 0;
        counter[n.layer] = i + 1;
        const count = perLayer[n.layer];
        const fx = layers === 1 ? 0.5 : n.layer / (layers - 1);
        const fy = count === 1 ? 0.5 : i / (count - 1);
        // stagger columns vertically a touch so it reads organic, not gridded
        const stagger = (n.layer % 2) * 0.08;
        n.bx = padX + fx * usableW;
        n.by = padY + (fy * 0.86 + 0.07 + stagger) * usableH;
        if (n.x === 0 && n.y === 0) {
          n.x = n.bx;
          n.y = n.by;
        }
      });
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (reduced) draw(0);
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // Update node positions (ambient float + cursor repulsion).
      for (const n of nodes) {
        const floatX = reduced ? 0 : Math.sin(time * 0.0006 + n.phase) * 5;
        const floatY = reduced ? 0 : Math.cos(time * 0.0005 + n.phase * 1.3) * 6;
        let tx = n.bx + floatX;
        let ty = n.by + floatY;

        if (mouse.active && !reduced) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const radius = 130;
          if (dist < radius && dist > 0.01) {
            const force = (1 - dist / radius) * 26;
            tx += (dx / dist) * force;
            ty += (dy / dist) * force;
          }
        }
        n.x = reduced ? tx : lerp(n.x, tx, 0.12);
        n.y = reduced ? ty : lerp(n.y, ty, 0.12);
      }

      // Edges.
      for (const [from, to] of graph.edges) {
        const a = nodeById.get(from);
        const b = nodeById.get(to);
        if (!a || !b) continue;
        const midx = (a.x + b.x) / 2;
        const midy = (a.y + b.y) / 2;
        const distToMouse = mouse.active
          ? Math.hypot(midx - mouse.x, midy - mouse.y)
          : 9999;
        const near = Math.max(0, 1 - distToMouse / 160);
        ctx!.strokeStyle = palette.line;
        ctx!.globalAlpha = 0.5 + near * 0.5;
        ctx!.lineWidth = 1 + near * 0.6;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      // Data packets flowing along edges.
      if (!reduced) {
        for (const p of packets) {
          if (p.delay > 0) {
            p.delay -= 1;
            continue;
          }
          const a = nodeById.get(p.from);
          const b = nodeById.get(p.to);
          if (!a || !b) continue;
          p.t += p.speed * 16;
          if (p.t >= 1) {
            p.t = 0;
            p.delay = Math.random() * 180;
            continue;
          }
          const px = lerp(a.x, b.x, p.t);
          const py = lerp(a.y, b.y, p.t);
          const col = p.t < 0.5 ? palette.accent : palette.signal;
          ctx!.beginPath();
          ctx!.fillStyle = col;
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = col;
          ctx!.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }

      // Nodes.
      ctx!.font = `600 11px ${fontFamily}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const n of nodes) {
        const isCore = n.kind === "core";
        const hovered =
          mouse.active && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 70;

        // node dot
        ctx!.beginPath();
        ctx!.fillStyle = isCore || hovered ? palette.accent : palette.surface;
        ctx!.strokeStyle = isCore || hovered ? palette.accent : palette.line;
        ctx!.lineWidth = 1.5;
        ctx!.arc(n.x, n.y, n.r + (hovered ? 1.5 : 0), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        if (isCore) {
          ctx!.beginPath();
          ctx!.strokeStyle = palette.accent;
          ctx!.globalAlpha = 0.35;
          ctx!.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.globalAlpha = 1;
        }

        // label
        ctx!.fillStyle = hovered || isCore ? palette.ink : palette.muted;
        ctx!.fillText(n.label, n.x, n.y - n.r - 9);
      }
    }

    let raf = 0;
    function loop(time: number) {
      draw(time);
      raf = requestAnimationFrame(loop);
    }

    // Pointer tracking
    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    // Re-read palette when the theme flips.
    const mo = new MutationObserver(() => {
      palette = readPalette(document.documentElement);
      if (reduced) draw(0);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Redraw once web fonts are ready so labels use Geist Mono.
    document.fonts?.ready.then(() => {
      fontFamily = getComputedStyle(wrap).fontFamily || fontFamily;
      if (reduced) draw(0);
    });

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="font-mono relative h-full w-full"
      role="img"
      aria-label="Interactive diagram of Sobhan's stack: client and frontend frameworks (Next.js, Nuxt) connecting through a NestJS core to databases (PostgreSQL, Redis, Prisma) and integrations (OpenAI, PayPal, OAuth)."
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
