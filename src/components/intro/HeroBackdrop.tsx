import { useEffect, useRef } from "react";
import { MOTION_EVENT, mayPlayVideo } from "./motion";

type VantaEffect = { destroy: () => void };

/**
 * Vanta "net" field behind the hero copy, as floating dots only (no connecting lines), in the ETQAN mark's
 * blue on the page background.
 * three.js and Vanta load only after hydration, and only for visitors who allow motion and aren't saving data;
 * everyone else keeps the plain background. The caller sizes and places it via `className`.
 */
export default function HeroBackdrop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let effect: VantaEffect | null = null;
    let cancelled = false;

    const start = async () => {
      if (effect || !mayPlayVideo()) return;
      const [THREE, { default: NET }] = await Promise.all([import("three"), import("vanta/dist/vanta.net.min")]);
      if (cancelled || effect || !mayPlayVideo()) return;
      effect = NET({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x034c88,
        // Lines join dots closer than this; 0 leaves just the dots.
        maxDistance: 0,
        backgroundColor: 0xf6f8fb,
      });
    };
    const sync = () => {
      if (mayPlayVideo()) start();
      else {
        effect?.destroy();
        effect = null;
      }
    };

    sync();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce.addEventListener("change", sync);
    window.addEventListener(MOTION_EVENT, sync);
    return () => {
      cancelled = true;
      reduce.removeEventListener("change", sync);
      window.removeEventListener(MOTION_EVENT, sync);
      effect?.destroy();
    };
  }, []);

  return <div ref={ref} aria-hidden className={`pointer-events-none absolute -z-10 ${className}`} />;
}
