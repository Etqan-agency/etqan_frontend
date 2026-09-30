"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type TimelineItem = { date: string; title: string; description: string };

const EASE = [0.16, 1, 0.3, 1] as const;

function Entry({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Node "lights up" as the entry crosses the middle of the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "start 45%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ring = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const even = index % 2 === 0;

  return (
    <li ref={ref} className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_5rem_1fr]">
      {/* Node on the track */}
      <div className="relative col-start-1 row-start-1 flex justify-center pt-2 md:col-start-2">
        <motion.span
          style={{ scale: ring }}
          className="relative grid h-4 w-4 place-items-center rounded-full border border-primary bg-background"
        >
          <motion.span style={{ scale: fill }} className="h-2 w-2 rounded-full bg-brand-gradient" />
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className={`col-start-2 row-start-1 pb-20 md:pb-32 ${
          even ? "md:col-start-1 md:text-end" : "md:col-start-3"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{item.date}</p>
        <h3 className="mt-4 text-3xl font-medium leading-[1] tracking-[-0.035em] md:text-5xl">{item.title}</h3>
        <p className={`mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base ${even ? "md:ms-auto" : ""}`}>
          {item.description}
        </p>
      </motion.div>
    </li>
  );
}

export default function TimelineLayout({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Size the SVG in real pixels so the path length maps 1:1 to the list height.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const headY = useTransform(progress, (p) => p * height);

  const path = `M 1 0 L 1 ${height}`;

  return (
    <div ref={containerRef} className="relative">
      {height > 0 && (
        <svg
          aria-hidden
          width="2"
          height={height}
          viewBox={`0 0 2 ${height}`}
          className="pointer-events-none absolute start-[1.25rem] top-0 -translate-x-1/2 overflow-visible rtl:translate-x-1/2 md:start-1/2"
        >
          <defs>
            <linearGradient id="timeline-fill" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <path d={path} stroke="var(--border)" strokeWidth="1" fill="none" />
          <motion.path d={path} stroke="url(#timeline-fill)" strokeWidth="2" fill="none" style={{ pathLength: progress }} />
          <motion.circle cx="1" r="5" fill="var(--accent)" style={{ cy: headY }} />
        </svg>
      )}
      <ol className="relative">
        {items.map((item, i) => (
          <Entry key={`${item.date}-${item.title}`} item={item} index={i} />
        ))}
      </ol>
    </div>
  );
}
