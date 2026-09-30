"use client";

import { Pause, Play } from "lucide-react";
import { MOTION_EVENT, MOTION_STORAGE_KEY, useMotionPaused } from "./intro/motion";

/** Lets visitors stop marquees, background videos and the typing line (WCAG 2.2.2 Pause, Stop, Hide). */
export default function MotionToggle({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const paused = useMotionPaused();

  const toggle = () => {
    const next = !paused;
    document.documentElement.classList.toggle("motion-paused", next);
    try {
      if (next) localStorage.setItem(MOTION_STORAGE_KEY, "paused");
      else localStorage.removeItem(MOTION_STORAGE_KEY);
    } catch {
      /* storage blocked: the choice lasts for this page view */
    }
    document.querySelectorAll("video").forEach((v) => {
      if (next) return v.pause();
      // Resume only loaded videos that are on screen; the others resume when scrolled into view.
      const r = v.getBoundingClientRect();
      if (v.currentSrc && r.bottom > 0 && r.top < window.innerHeight) v.play().catch(() => {});
    });
    window.dispatchEvent(new Event(MOTION_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="inline-flex items-center gap-2 text-white/80 transition-colors duration-300 hover:text-accent"
    >
      {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
      {paused ? playLabel : pauseLabel}
    </button>
  );
}
