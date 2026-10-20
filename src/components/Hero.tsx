"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { mayPlayVideo, motionPaused } from "./intro/motion";

const HERO_VIDEO = "/videos/hero-hand.mp4";
const HERO_POSTER = "/images/posters/hero-hand.webp";

/**
 * Full-viewport robotic-hand video backdrop. The hand fills the middle; pages lay their own copy out
 * in `children`, which fills the section as a column (put content at the top and bottom edges so the
 * hand stays clear).
 */
export default function Hero({ children, id = "vision" }: { children?: React.ReactNode; id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // The poster is what paints first (and is the LCP candidate): fetch it with the CSS.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });

  // The 2.7 MB background video is decoration: the poster paints first, the video only downloads once the
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

  return (
    <section ref={sectionRef} id={id} className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background">
      {/* Background video. On phones the copy and index stack taller than the screen, so it keeps a screen-sized box at the top. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 isolate h-[80svh] overflow-hidden bg-background md:inset-0 md:h-auto">
        <video
          ref={videoRef}
          poster={HERO_POSTER}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Brand tint: the black robotic hand reads as ETQAN navy, the white backdrop stays white */}
        <div className="absolute inset-0 bg-navy mix-blend-lighten" />
        {/* White fade-up behind the bottom copy; the hand above it is untouched */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </section>
  );
}
