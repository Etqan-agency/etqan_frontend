"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Fragment, useMemo, useRef } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";

// Unrevealed words stay readable (≥3:1 for this large text) — the reveal still reads as ink filling in.
const FADED = "rgba(21, 25, 52, 0.5)";
const INK = "rgba(21, 25, 52, 1)";
// Each word inks in over WORD_SPAN of the timeline, starting STAGGER after the previous one.
const WORD_SPAN = 0.5;
const STAGGER = 0.1;
const quintOut = (t: number) => 1 - Math.pow(1 - t, 5);

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const length = WORD_SPAN + STAGGER * (total - 1);
  const start = (index * STAGGER) / length;
  const color = useTransform(progress, [start, start + WORD_SPAN / length], [FADED, INK], { ease: quintOut });
  return <motion.span className="word" style={{ color }}>{word}</motion.span>;
}

export default function About({ text, t, href }: { text: string; t: Dictionary["about"]; href: string }) {
  const VALUES = t.values;
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  // Word-by-word reveal scrubbed to scroll: starts when the paragraph's top reaches 80% of the viewport and
  // completes when its bottom reaches 45%; the spring gives the same soft catch-up as the old 1s scrub.
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.8", "end 0.45"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 18, restDelta: 0.001 });

  return (
    <section id="about" className="relative border-t border-border py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 md:grid-cols-12 md:px-10">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted md:col-span-3">{t.label}</h2>
        <p
          ref={textRef}
          className="manifesto text-[clamp(2rem,4.6vw,5rem)] font-medium leading-[1.05] tracking-[-0.035em] md:col-span-9"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <Word word={w} index={i} total={words.length} progress={progress} />
            </Fragment>
          ))}
        </p>
        <div className="md:col-span-9 md:col-start-4">
          <Link href={href} className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">{t.more} →</Link>
        </div>
      </div>

      <div dir="ltr" className="marquee-track mt-24 overflow-hidden border-y border-border py-8 md:mt-40 md:py-12">
        <div className="marquee-inner flex w-max animate-marquee-slow">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
              {VALUES.map((v) => (
                <span key={v} className="flex items-center whitespace-nowrap text-6xl font-bold uppercase tracking-[-0.04em] md:text-[9rem]">
                  <span className="px-8 md:px-14">{v}</span>
                  <span className="text-accent">—</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
