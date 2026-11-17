"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import type { Project } from "@/lib/data";
import { ProjectPlaceholder } from "@/components/detail/ProjectCard";
import { MOTION_EVENT, motionPaused } from "@/components/intro/motion";
import type { Dictionary } from "@/i18n";
import { picturesFor } from "@/lib/projectPictures";

/*
 * "Selected Work" as a scanner belt: project cards drift left under a glowing brand-blue line. As each card
 * crosses it, it dissolves into a cloud of pixels and the space it leaves shows the code behind that project.
 * Hovering slows the belt, dragging scrubs it (dragging right rebuilds a card from its code), and keyboard
 * focus parks the focused card just right of the line. Cards are DOM, the dissolve is one canvas.
 */

const PAD = 90; // belt px above the cards (room for the counter badge)
const RADIUS = 16; // card corner radius, px
const PALETTE = ["#034c88", "#0b67ad", "#1580a8", "#1c91bd", "#4dc1e3", "#9be0f2", "#e8f9fe"];

function hash(a: number, b: number, c: number) {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const clip = (s: string, n = 44) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function wrap(text: string, width: number, maxLines: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line && (line + " " + word).length > width) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/** The plain-markup version of a project: what the card "is" once the scanner has read it. */
function codeFor(p: Project, href: string, viewCase: string) {
  const html = [
    `<article class="project">`,
    `  <h1>${clip(p.title, 34)}</h1>`,
    `  <p>`,
    ...wrap(p.summary, 34, 4).map((l) => `    ${l}`),
    `  </p>`,
  ];
  if (p.features?.length) {
    html.push(`  <ul>`, ...p.features.slice(0, 4).map((f) => clip(`    <li>${f}</li>`)), `  </ul>`);
  }
  if (p.technologies?.length) html.push(clip(`  <p class="stack">${p.technologies.slice(0, 5).join(", ")}</p>`));
  html.push(clip(`  <a href="${href}">${viewCase}</a>`), `</article>`);
  const meta = [`<!-- ${clip(p.category, 24)} -->`, `<!-- ${clip(p.platform, 24)} -->`, `<!-- ${clip(href, 30)} -->`];
  return { html: html.join("\n"), meta: meta.join("\n") };
}

function Card({
  project, index, total, t, badge,
}: {
  project: Project; index: number; total: number; t: Dictionary["work"]; badge?: string;
}) {
  const { wide, panel } = picturesFor(project);
  const framed = panel.length > 0;
  return (
    <>
      {wide ? (
        <>
          <Image src={wide.src} alt="" fill sizes="(min-width:768px) 46vw, 84vw" draggable={false} className="object-cover object-top" />
          {/* Darken towards the text (bottom, start side) and under the top row, whatever the screenshot's colours. */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/25 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-x-0 top-0 h-[26%] bg-gradient-to-b from-navy/80 to-transparent" />
        </>
      ) : (
        <>
          {/* Branded navy backdrop with soft primary / accent light, so every app or logo sits on the same stage. */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_50%,var(--primary)_0%,var(--navy)_62%)]" />
          <div className="pointer-events-none absolute end-[8%] top-1/2 h-[70%] w-[38%] -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" aria-hidden />
          {!framed && <ProjectPlaceholder title="" className="absolute inset-0 opacity-50" />}
        </>
      )}

      {framed && (
        <div className="absolute inset-y-[17%] end-[4cqw] flex w-[42%] items-center justify-center gap-[2cqw]">
          {panel.map((pic, k) => (
            <Image
              key={pic.src}
              src={pic.src}
              alt=""
              width={pic.width}
              height={pic.height}
              sizes="20vw"
              draggable={false}
              className={`h-auto max-h-full w-auto min-w-0 rounded-[1.8cqw] object-contain shadow-[0_2cqw_5cqw_rgba(0,0,0,0.45)] ring-1 ring-white/15 ${
                panel.length > 1 ? `max-w-[48%] ${k === 1 ? "translate-y-[6%]" : "-translate-y-[6%]"}` : "max-w-full"
              }`}
            />
          ))}
        </div>
      )}

      <div className="relative flex h-full flex-col justify-between p-[4cqw]">
        <div className="flex items-center justify-between gap-[2cqw] text-[max(1.3cqw,8px)] font-medium uppercase tracking-[0.3em] text-white/90">
          <span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span className="flex items-center gap-[1.4cqw]">
            {badge && (
              <span className="rounded-full border border-accent/40 bg-navy/80 px-[1.4cqw] py-[0.5cqw] font-bold tracking-[0.2em] text-accent backdrop-blur">
                {badge}
              </span>
            )}
            <span className="rounded-full bg-navy/60 px-[1.4cqw] py-[0.5cqw] backdrop-blur">{project.platform}</span>
          </span>
        </div>
        <div className={framed ? "w-[50%]" : ""}>
          <p className="mb-[1.6cqw] line-clamp-1 text-[max(1.3cqw,8px)] font-medium uppercase tracking-[0.3em] text-accent">{project.category}</p>
          <h3 className={`font-medium leading-[0.95] tracking-[-0.04em] ${framed ? "text-[5.4cqw]" : "text-[6.4cqw]"}`}>{project.title}</h3>
          <div className={`mt-[2.4cqw] flex gap-[3cqw] ${framed ? "flex-col items-start" : "items-end justify-between"}`}>
            <p className={`line-clamp-2 text-[max(1.7cqw,10px)] leading-relaxed text-white/75 max-md:hidden ${framed ? "" : "max-w-[60cqw]"}`}>{project.summary}</p>
            <span className="flex shrink-0 items-center gap-[1cqw] rounded-full bg-white px-[2.2cqw] py-[1.3cqw] text-[max(1.2cqw,8px)] font-bold tracking-widest text-navy transition-colors duration-500 group-hover:bg-accent">
              {t.viewCase}
              <ArrowUpRight className="h-[1.8cqw] min-h-3 w-[1.8cqw] min-w-3 transition-transform duration-500 ease-premium group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function FeaturedWork({
  projects, t, projectsPath, teamBadge, viewAll, dir = "ltr",
}: {
  projects: Project[]; t: Dictionary["work"]; projectsPath: string; teamBadge: string; viewAll: string; dir?: "ltr" | "rtl";
}) {
  // Repeat short lists so the belt always loops without a visible gap.
  const items = useMemo(() => {
    if (!projects.length) return [];
    const out: Project[] = [];
    while (out.length < Math.max(4, projects.length)) out.push(projects[out.length % projects.length]);
    return out;
  }, [projects]);

  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const focusRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!belt || !canvas || !ctx || !items.length) return;
    const n = items.length;
    const real = projects.length;

    let W = 0, H = 0, cw = 0, ch = 0, gap = 0, span = 0, period = 0, Lx = 0, dpr = 1;
    let off = 0, vel = 0, hover = 0, hoverTarget = 0, started = false;
    let still = false, visible = true, focused = -1;
    let dragging = false, dragMoved = 0, lastX = 0, lastT = 0, dragVel = 0, pointerId = -1;
    let shownPct = 0, crossing = -1, raf = 0, prev = performance.now();
    const sparks: { x: number; y: number; vx: number; vy: number; s: number; c: string; life: number }[] = [];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncStill = () => { still = reduce.matches || motionPaused(); };
    syncStill();

    const measure = () => {
      const first = cardRefs.current[0];
      if (!first) return;
      W = belt.clientWidth;
      H = belt.clientHeight;
      cw = first.offsetWidth;
      ch = first.offsetHeight;
      gap = window.innerWidth * (window.matchMedia("(max-width: 767px)").matches ? 0.07 : 0.0475);
      span = cw + gap;
      period = span * n;
      Lx = W / 2;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      if (!started) { off = W / 2 - 0.62 * cw; started = true; }
    };

    const autoSpeed = () => (still ? 0 : -0.075 * W);
    const posOf = (i: number) => ((((off + i * span + span) % period) + period) % period) - span;

    focusRef.current = (i: number) => {
      focused = i;
      vel = 0;
      off += Lx + 20 - posOf(i); // park the card just right of the line, fully visible
    };

    const drawFx = (t: number, cards: { i: number; x: number; cut: number }[]) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const buckets: number[][] = PALETTE.map(() => []);
      const G = 3, R = 0.3 * cw, rows = Math.ceil(ch / G);
      for (const { i, x, cut } of cards) {
        if (x + cw <= Lx) continue;
        const hw = Math.min(150, x + cw - Lx);
        const haze = ctx.createLinearGradient(Lx, 0, Lx + 150, 0);
        haze.addColorStop(0, "rgba(77,193,227,.42)");
        haze.addColorStop(1, "rgba(77,193,227,0)");
        ctx.fillStyle = haze;
        ctx.fillRect(Lx, PAD, hw, ch);

        const g0 = Math.floor(cut / G), g1 = Math.min(Math.ceil(cw / G), Math.ceil((cut + R) / G));
        const tw = Math.floor(t * 9) + 97;
        for (let gx = g0; gx < g1; gx++) {
          const sx = x + gx * G;
          const d = sx - Lx;
          if (d < 0 || d > R) continue;
          const p = Math.pow(1 - d / R, 1.7);
          for (let row = -5; row < rows + 5; row++) {
            const inside = row >= 0 && row < rows;
            const fade = inside ? 1 : 1 - (row < 0 ? -row : row - rows + 1) / 6;
            const thr = inside ? p * 0.92 : p * 0.16 * fade;
            if (hash(gx, row, i) >= thr) continue;
            if (!still && hash(gx, row, tw) < 0.22) continue;
            const h2 = hash(row, gx, i + 31);
            const ci = d < 10 ? 4 + Math.floor(h2 * 3) : Math.floor(h2 * h2 * 7);
            const s = 1.1 + h2 * 1.7;
            const jx = still ? 0 : (hash(gx, row, tw + 5) - 0.5) * 1.6;
            const jy = still ? 0 : (hash(row, gx, tw + 9) - 0.5) * 1.6;
            buckets[Math.min(6, ci)].push(sx + jx, PAD + row * G + jy, s);
          }
        }
      }
      buckets.forEach((b, ci) => {
        if (!b.length) return;
        ctx.fillStyle = PALETTE[ci];
        ctx.beginPath();
        for (let k = 0; k < b.length; k += 3) ctx.rect(b[k], b[k + 1], b[k + 2], b[k + 2]);
        ctx.fill();
      });
      for (const s of sparks) {
        ctx.globalAlpha = Math.min(1, s.life * 2.2);
        ctx.fillStyle = s.c;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      }
      ctx.globalAlpha = 1;
    };

    const fmt = (v: number) => `${Math.round(v)}%`;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!visible || !cw) return;
      const t = now / 1000;

      hover += (hoverTarget - hover) * Math.min(1, dt * 4);
      if (!dragging && focused < 0) {
        const target = autoSpeed() * (1 - 0.65 * hover);
        vel += (target - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }

      const live: { i: number; x: number; cut: number }[] = [];
      let cross = -1, progress = 0;
      for (let i = 0; i < n; i++) {
        const card = cardRefs.current[i];
        const code = codeRefs.current[i];
        if (!card || !code) continue;
        const x = posOf(i);
        const cut = Math.max(0, Math.min(cw, Lx - x));
        const tf = `translate3d(${x}px,0,0)`;
        card.style.transform = tf;
        code.style.transform = tf;
        if (cut > 0) {
          card.style.clipPath = `inset(0 0 0 ${cut}px round 0 ${RADIUS}px ${RADIUS}px 0)`;
          const m = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
          card.style.maskImage = m;
          card.style.webkitMaskImage = m;
          code.style.visibility = "visible";
          code.style.clipPath = `inset(0 ${cw - cut}px 0 0)`;
          live.push({ i, x, cut });
        } else {
          card.style.clipPath = "";
          card.style.maskImage = "";
          card.style.webkitMaskImage = "";
          code.style.visibility = "hidden";
        }
        card.style.visibility = cut >= cw ? "hidden" : "visible";
        if (cut > 0 && cut < cw) { cross = i; progress = cut / cw; }
      }

      // Counter: which project is being read, and how much of it is now code.
      if (cross >= 0) {
        if (cross !== crossing) {
          crossing = cross;
          shownPct = progress * 100;
          if (numRef.current) {
            numRef.current.textContent = `${String((cross % real) + 1).padStart(2, "0")} / ${String(real).padStart(2, "0")}`;
          }
        }
        shownPct += (progress * 100 - shownPct) * Math.min(1, dt * 14);
        if (pctRef.current) pctRef.current.textContent = fmt(shownPct);
      }

      // Sparks drift off the line like embers.
      if (!still && cross >= 0) {
        for (let k = 0; k < 3; k++) {
          if (Math.random() > 0.7) continue;
          sparks.push({
            x: Lx + Math.random() * 30,
            y: PAD - 10 + Math.random() * (ch + 20),
            vx: -30 + Math.random() * 70 + vel * 0.6,
            vy: (Math.random() - 0.5) * 50,
            s: 0.8 + Math.random() * 1.8,
            c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            life: 0.3 + Math.random() * 0.8,
          });
        }
      }
      for (let k = sparks.length - 1; k >= 0; k--) {
        const s = sparks[k];
        s.life -= dt;
        if (s.life <= 0) { sparks.splice(k, 1); continue; }
        s.x += s.vx * dt;
        s.y += s.vy * dt;
      }

      drawFx(t, live);
    };

    /* ---- input ---- */
    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") hoverTarget = 1; };
    const onLeave = () => { hoverTarget = 0; };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      dragMoved = 0;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastT = performance.now();
      dragVel = 0;
      vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      dragMoved += Math.abs(dx);
      // Capture only once it is clearly a drag, so plain clicks still reach the card links.
      if (dragMoved > 4 && !belt.hasPointerCapture(pointerId)) {
        belt.setPointerCapture(pointerId);
        belt.dataset.dragging = "";
      }
      off += dx;
      dragVel = (dx / Math.max(8, now - lastT)) * 1000 * 0.8 + dragVel * 0.2;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      vel = dragVel;
      delete belt.dataset.dragging;
      if (belt.hasPointerCapture(pointerId)) belt.releasePointerCapture(pointerId);
    };
    const onClick = (e: MouseEvent) => {
      if (dragMoved > 6) { e.preventDefault(); e.stopPropagation(); }
      dragMoved = 0;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { vel -= e.deltaX * 6; focused = -1; }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!belt.contains(e.relatedTarget as Node | null)) focused = -1;
    };

    belt.addEventListener("pointerenter", onEnter);
    belt.addEventListener("pointerleave", onLeave);
    belt.addEventListener("pointerdown", onDown);
    belt.addEventListener("pointermove", onMove);
    belt.addEventListener("pointerup", onUp);
    belt.addEventListener("pointercancel", onUp);
    belt.addEventListener("click", onClick, true);
    belt.addEventListener("wheel", onWheel, { passive: true });
    belt.addEventListener("focusout", onFocusOut);
    reduce.addEventListener("change", syncStill);
    window.addEventListener(MOTION_EVENT, syncStill);

    const ro = new ResizeObserver(measure);
    ro.observe(belt);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; prev = performance.now(); });
    io.observe(belt);

    measure();
    belt.dataset.ready = "";
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      belt.removeEventListener("pointerenter", onEnter);
      belt.removeEventListener("pointerleave", onLeave);
      belt.removeEventListener("pointerdown", onDown);
      belt.removeEventListener("pointermove", onMove);
      belt.removeEventListener("pointerup", onUp);
      belt.removeEventListener("pointercancel", onUp);
      belt.removeEventListener("click", onClick, true);
      belt.removeEventListener("wheel", onWheel);
      belt.removeEventListener("focusout", onFocusOut);
      reduce.removeEventListener("change", syncStill);
      window.removeEventListener(MOTION_EVENT, syncStill);
    };
  }, [items, projects.length]);

  return (
    <section id="work" className="overflow-hidden border-t border-border pt-24 md:pt-40">
      <div className="mx-auto mb-10 flex max-w-[1600px] flex-wrap items-end justify-between gap-x-6 gap-y-4 px-6 md:mb-6 md:px-10">
        <h2 className="shrink-0 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-8xl">
          {t.heading[0]} {t.heading[1]}
        </h2>
        <Link href={projectsPath} className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">
          {viewAll} ({String(projects.length).padStart(2, "0")}) →
        </Link>
      </div>

      {items.length > 0 && (
        <div className="wb-stage" dir="ltr">
          <div className="wb-badge" aria-hidden>
            <span className="wb-badge-label" dir={dir}>{t.scanLabel}</span>
            <span className="wb-pill">
              <span className="wb-num" ref={numRef}>01 / {String(projects.length).padStart(2, "0")}</span>
              <span className="wb-pct" ref={pctRef}>0%</span>
            </span>
          </div>
          <div className="wb-scan" aria-hidden><i /><b /></div>

          <div ref={beltRef} className="wb-belt" role="region" aria-label={`${t.heading[0]} ${t.heading[1]}`}>
            <div className="wb-codes" aria-hidden>
              {items.map((p, i) => {
                const code = codeFor(p, `${projectsPath}/${p.id}`, t.viewCase);
                return (
                  <div key={i} ref={(el) => { codeRefs.current[i] = el; }} className="wb-code">
                    <pre className="wb-html">{code.html}</pre>
                    <pre className="wb-meta">{code.meta}</pre>
                  </div>
                );
              })}
            </div>
            <div className="wb-cards">
              {items.map((p, i) => (
                <Link
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  href={`${projectsPath}/${p.id}`}
                  draggable={false}
                  dir={dir}
                  aria-label={p.title}
                  // Duplicated cards (short lists) stay out of the tab order and the accessibility tree.
                  tabIndex={i < projects.length ? 0 : -1}
                  aria-hidden={i < projects.length ? undefined : true}
                  onFocus={() => focusRef.current(i)}
                  className="wb-card group"
                >
                  <Card
                    project={p}
                    index={i % projects.length}
                    total={projects.length}
                    t={t}
                    badge={p.ownership === "team" ? teamBadge : undefined}
                  />
                </Link>
              ))}
            </div>
            <canvas ref={canvasRef} className="wb-fx" aria-hidden />
          </div>
        </div>
      )}
    </section>
  );
}
