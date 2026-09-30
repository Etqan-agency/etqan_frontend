"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { mayPlayVideo, motionPaused, useMotionPaused } from "./intro/motion";
import type { Dictionary } from "@/i18n";

const HERO_VIDEO = "/videos/hero-bg.mp4";
const HERO_POSTER = "/images/posters/hero-bg.webp";
const TYPE_CLASS = "text-[40px] font-bold uppercase leading-tight tracking-tighter md:text-[70px] lg:text-[90px]";

/**
 * Full-bleed video hero with a decorative typing line. Pages pass their real heading/intro/CTAs as
 * `children` (the typing line is aria-hidden, so it never replaces a page's H1).
 */
export default function Hero({
  t, children, scrollTarget, id = "vision",
}: {
  t: Dictionary["hero"]; children?: React.ReactNode; scrollTarget: string; id?: string;
}) {
  const PHRASES = t.phrases;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();
  // The poster is what paints first (and is the LCP candidate on /services): fetch it with the CSS.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });

  const lineBoxRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [placed, setPlaced] = useState(false);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const paused = useMotionPaused();
  const still = useReducedMotion() || paused;

  // The 2.8 MB background video is decoration: the poster paints first, the video only downloads once the
  // browser is idle and the hero is on screen, and it pauses while scrolled away.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !mayPlayVideo()) return;
    let started = false;
    let visible = false;
    let idle: number | undefined;
    const start = () => {
      started = true;
      video.preload = "auto";
      video.src = HERO_VIDEO;
      if (visible && !motionPaused()) video.play().catch(() => {});
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) return video.pause();
      if (started) return void (motionPaused() ? undefined : video.play().catch(() => {}));
      if (idle === undefined) {
        idle = typeof requestIdleCallback === "function" ? requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1500);
      }
    });
    io.observe(section);
    return () => {
      io.disconnect();
      if (idle !== undefined && !started) {
        if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
        else clearTimeout(idle);
      }
    };
  }, []);

  // Keep the typed line centred with a transform instead of layout: the line is laid out from a fixed
  // start corner and nudged to the centre, so each keystroke (and a phrase wrapping to two lines) never
  // counts as a layout shift. It looks the same as a centred, growing line.
  const placeLine = useCallback(() => {
    const box = lineBoxRef.current;
    const line = lineRef.current;
    if (!box || !line) return;
    const dx = (box.clientWidth - line.offsetWidth) / 2;
    const dy = (box.clientHeight - line.offsetHeight) / 2;
    const rtl = getComputedStyle(box).direction === "rtl";
    line.style.transform = `translate(${rtl ? -dx : dx}px, ${dy}px)`;
    setPlaced(true);
  }, []);
  useLayoutEffect(placeLine, [text, placeLine]);
  useEffect(() => {
    const box = lineBoxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(placeLine);
    ro.observe(box);
    return () => ro.disconnect();
  }, [placeLine]);

  // Typing loop (reduced motion: the first phrase is shown whole and stays put)
  useEffect(() => {
    const fullText = PHRASES[loopNum % PHRASES.length];
    if (still) {
      setText(PHRASES[0]);
      return;
    }

    if (!isDeleting && text === fullText) {
      const t = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }, 500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, isDeleting ? 40 : 100);
    return () => clearTimeout(t);
  }, [text, isDeleting, loopNum, PHRASES, still]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-background pb-32 pt-28"
    >
      {/* Background video */}
      <div className="pointer-events-none absolute inset-0 z-0 isolate overflow-hidden bg-background">
        <video
          ref={videoRef}
          poster={HERO_POSTER}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 h-full w-full rotate-[25deg] scale-[1.5] object-cover object-center opacity-[0.85] mix-blend-luminosity"
        />
        {/* Brand duotone: shadows pick up ETQAN blue, highlights stay white */}
        <div className="absolute inset-0 bg-navy mix-blend-lighten" />
        <div className="absolute inset-0 bg-brand-gradient opacity-40 mix-blend-color" />
        {/* Top-right corner blur */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-0 h-2/3 w-full backdrop-blur-[80px] md:w-2/3"
          style={{
            maskImage: "radial-gradient(circle at top right, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at top right, black 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />
      </div>

      {/* Foreground */}
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-6 md:px-12">
        <div className="flex w-full justify-center">
          <div className="grid min-h-[60px] w-full place-items-center md:min-h-[80px] lg:min-h-[100px]">
            {/* Invisible copies of every phrase reserve the tallest one's height, so wrapping never shifts the page. */}
            {PHRASES.map((p) => (
              <p key={p} aria-hidden className={`invisible col-start-1 row-start-1 ${TYPE_CLASS}`}>
                {p}<span className="ms-1">|</span>
              </p>
            ))}
            {/* Decorative typing line — the page's H1 is passed in as children. */}
            <p
              ref={lineBoxRef}
              aria-hidden
              className={`hero-reveal col-start-1 row-start-1 self-stretch justify-self-stretch text-foreground ${TYPE_CLASS}`}
              style={{ perspective: "1000px" }}
            >
              <span ref={lineRef} className={`block w-fit ${placed ? "" : "invisible"}`}>
                <span className="bg-gradient-to-r from-navy to-primary bg-clip-text text-transparent">{text}</span>
                <span className="ms-1 animate-pulse text-accent">|</span>
              </span>
            </p>
          </div>
        </div>
        {children && <div className="hero-scrim mt-10 flex w-full flex-col items-center text-center">{children}</div>}
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => {
          if (lenis) lenis.scrollTo(scrollTarget, { offset: -80, duration: 1.6 });
          else document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hero-reveal hero-reveal-late absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center"
      >
        <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{t.scroll}</span>
        <ChevronDown aria-hidden className="h-5 w-5 animate-bounce text-accent" />
      </button>
    </section>
  );
}
