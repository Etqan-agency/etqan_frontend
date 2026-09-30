import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUp, mayPlayVideo, motionPaused } from "./motion";

const HEAD_VIDEO = "/videos/hero-head.mp4";
const HEAD_POSTER = "/images/posters/hero-head.webp";
/**
 * 24px first-frame placeholder, inlined. Being tiny it is never an LCP candidate, so the H1 stays the LCP
 * element on the homepage (a full-size poster out-scores the H1 on phones and would land ~2s later).
 */
const HEAD_PLACEHOLDER = "data:image/webp;base64,UklGRuwCAABXRUJQVlA4WAoAAAAgAAAAFwAAFQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg/gAAALAGAJ0BKhgAFgA+0WCoT6glI6IoCAEAGglpAM4CsAwanM2qAdCv0Hf1gDpnkt1DuxMBNmYt+Fbpwlkx2y4AAP7zc4z4+in5O4gRHZcK3ZMOF8OrM7PY/AHJM8hAu9nrHCBy/UiK5Db0KzLcUxHt4Cvnjf/YmNQXZVrUylYOtzd90qJXDaWTxRABv/q1xB1fv0hoTd0pz23Y9XqwvQo/QlXc21BZAfS/5u3E13co3iHv1uwYTKfQMOz89OqAvRBZjuN/verr9e2MnHBXY7aaCX9ifDVtMjccij+a1qD6xW96mpb4jOU6GYBm2rSFxZmMdcJQk6/80fJBvSgAAAAA";
const EDGE_FADE = "radial-gradient(ellipse at center, black 65%, transparent 100%)";
const BOTTOM_FADE = "linear-gradient(to bottom, transparent 0%, black 8%, black 78%, transparent 100%)";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The small loop loads right after hydration and pauses while off screen. Reduced-motion and Save-Data
  // visitors never download it; they get the sharp first-frame poster instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!mayPlayVideo()) {
      video.poster = HEAD_POSTER;
      return;
    }
    video.preload = "auto";
    video.src = HEAD_VIDEO;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motionPaused()) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div variants={fadeUp} className="relative mt-6 w-full max-w-[640px] md:mt-10">
      {/* Soft back-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-40 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="relative isolate aspect-[640/594] w-full overflow-hidden bg-background"
        style={{
          // Spec'd radial fade, intersected with soft top/bottom fades so the frame edges never show
          maskImage: `${EDGE_FADE}, ${BOTTOM_FADE}`,
          WebkitMaskImage: `${EDGE_FADE}, ${BOTTOM_FADE}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <video
          ref={videoRef}
          poster={HEAD_PLACEHOLDER}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover brightness-[1.04] mix-blend-darken"
        />
        {/* Deepest shadows settle on ETQAN navy; the white plate stays the page background */}
        <div aria-hidden className="absolute inset-0 bg-navy mix-blend-lighten" />
      </motion.div>
    </motion.div>
  );
}
