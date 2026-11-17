"use client";

import { MotionConfig } from "framer-motion";
import type Lenis from "lenis";
import type { ScrollCallback, ScrollToOptions } from "lenis";
import { LenisContext } from "lenis/react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * Native-scroll stand-in for the Lenis API. It covers the Lenis surface this site uses
 * (`scroll`, `scrollTo`, `stop`, `start`) so `useLenis()` consumers — the navbar's scroll state and menu
 * scroll-lock, the hero anchor buttons — keep working without running Lenis's frame loop.
 */
function createNativeScroll() {
  const html = document.documentElement;
  return {
    get scroll() {
      return window.scrollY;
    },
    scrollTo(target: number | string | HTMLElement, options: ScrollToOptions = {}) {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
      if (typeof target !== "number" && !el) return;
      const top = el ? el.getBoundingClientRect().top + window.scrollY : (target as number);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top + (options.offset ?? 0), behavior: options.immediate || reduce ? "auto" : "smooth" });
    },
    stop() {
      html.classList.add("lenis", "lenis-stopped");
    },
    start() {
      html.classList.remove("lenis-stopped");
    },
  };
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis>();
  const callbacks = useRef<{ callback: ScrollCallback; priority: number }[]>([]);

  const addCallback = useCallback((callback: ScrollCallback, priority: number) => {
    callbacks.current = [...callbacks.current, { callback, priority }].sort((a, b) => a.priority - b.priority);
  }, []);
  const removeCallback = useCallback((callback: ScrollCallback) => {
    callbacks.current = callbacks.current.filter((c) => c.callback !== callback);
  }, []);

  // Native browser scrolling everywhere (no Lenis smoothing): the stand-in below keeps the navbar's
  // scroll state, the menu scroll-lock and the anchor buttons working.
  useEffect(() => {
    const native = createNativeScroll() as unknown as Lenis;
    const emit = () => callbacks.current.forEach(({ callback }) => callback(native));
    window.addEventListener("scroll", emit, { passive: true });
    setLenis(native);
    return () => {
      window.removeEventListener("scroll", emit);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  // Lenis's own provider also exposes `undefined` until its effect runs; consumers guard with `lenis?.`.
  const value = useMemo(() => ({ lenis: lenis as Lenis, addCallback, removeCallback }), [lenis, addCallback, removeCallback]);
  // reducedMotion="user": every Framer Motion animation on the site drops its movement for visitors who ask for less motion.
  return (
    <MotionConfig reducedMotion="user">
      <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
    </MotionConfig>
  );
}
