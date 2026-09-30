"use client";

import { MotionConfig } from "framer-motion";
import Lenis, { type ScrollCallback, type ScrollToOptions } from "lenis";
import { LenisContext } from "lenis/react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** Smooth scrolling is a desktop nicety: mouse/trackpad users without a reduced-motion preference. */
const SMOOTH_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Native-scroll stand-in for touch / reduced-motion visitors. It covers the Lenis surface this site uses
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

  useEffect(() => {
    const query = window.matchMedia(SMOOTH_QUERY);
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (query.matches) {
        // Lenis runs its own rAF loop (no GSAP ticker needed any more).
        const instance = new Lenis({ lerp: 0.05, autoRaf: true });
        const emit = () => callbacks.current.forEach(({ callback }) => callback(instance));
        instance.on("scroll", emit);
        setLenis(instance);
        cleanup = () => {
          instance.off("scroll", emit);
          instance.destroy();
        };
      } else {
        const native = createNativeScroll() as unknown as Lenis;
        const emit = () => callbacks.current.forEach(({ callback }) => callback(native));
        window.addEventListener("scroll", emit, { passive: true });
        setLenis(native);
        cleanup = () => {
          window.removeEventListener("scroll", emit);
          document.documentElement.classList.remove("lenis-stopped");
        };
      }
    };

    setup();
    query.addEventListener("change", setup);
    return () => {
      query.removeEventListener("change", setup);
      cleanup();
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
