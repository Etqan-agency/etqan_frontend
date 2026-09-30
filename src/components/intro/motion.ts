import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/** Transform-only entrance for LCP text: it is painted immediately (opacity stays 1), then settles. */
export const riseUp: Variants = {
  hidden: { y: 20 },
  show: { y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/**
 * Whether decorative background video may download and play: never for reduced-motion users or when the
 * browser asks to save data (they keep the poster frame). Client-only — call it from an effect.
 */
export function mayPlayVideo(): boolean {
  if (motionPaused()) return false;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !saveData && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---- Visitor-controlled "Pause animations" (WCAG 2.2.2). State lives on <html class="motion-paused">. ---- */

export const MOTION_EVENT = "etqan:motion";
export const MOTION_STORAGE_KEY = "etqan_motion";

export const motionPaused = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("motion-paused");

/** Re-renders when the visitor pauses/resumes animations. */
export function useMotionPaused(): boolean {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () => setPaused(motionPaused());
    sync();
    window.addEventListener(MOTION_EVENT, sync);
    return () => window.removeEventListener(MOTION_EVENT, sync);
  }, []);
  return paused;
}
