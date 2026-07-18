"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import type { SiteSettingsStats } from "@/types/api";

function MiniBars({ color, count = 7 }: { color: string; count?: number }) {
  const heights = [40, 55, 35, 70, 50, 85, 60, 45, 75];
  return (
    <div className="flex h-9 items-end gap-1">
      {heights.slice(0, count).map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-sm"
          style={{ height: `${h}%`, backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function buildCards(stats: SiteSettingsStats) {
  const projects = stats.projects ?? 120;
  const satisfaction = stats.retention ?? 98;
  const clients = stats.clients ?? 45;
  const awards = stats.awards ?? 8;

  return [
    {
      label: "Delivery",
      render: () => (
        <>
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            Projects Delivered
          </p>
          <MiniBars color="oklch(0.58 0.18 255)" count={9} />
        </>
      ),
    },
    {
      label: "Satisfaction",
      render: () => (
        <>
          <p className="text-sm text-muted-foreground">Client</p>
          <p className="text-lg font-semibold text-foreground">Satisfaction</p>
          <div className="mt-4">
            <MiniBars color="oklch(0.62 0.2 20)" />
          </div>
          <p className="mt-3 text-base font-semibold text-foreground">
            {satisfaction}%{" "}
            <span className="text-muted-foreground">Happy Clients</span>
          </p>
        </>
      ),
    },
    {
      label: "Software",
      render: () => (
        <>
          <p className="text-lg font-medium text-foreground">
            Build your <span className="text-muted-foreground">product</span> with
            confidence
          </p>
          <p className="mt-5 text-xs text-muted-foreground">Projects Delivered</p>
          <p className="text-2xl font-semibold text-foreground">
            {projects}
            {" "}
            <span className="text-sm font-normal text-muted-foreground">
              and counting
            </span>
          </p>
        </>
      ),
    },
    {
      label: "Team",
      render: () => (
        <div className="text-white">
          <p className="text-lg font-semibold">Our clients</p>
          <p className="text-xs text-white/70">Across every industry</p>
          <div className="mt-9">
            <p className="text-xs text-white/70">Clients served</p>
            <p className="text-xl font-semibold">{clients}+</p>
          </div>
        </div>
      ),
      dark: true,
    },
    {
      label: "Stack",
      render: () => (
        <>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Project Timeline
          </p>
          <div className="my-3 h-1.5 rounded-full bg-muted">
            <div className="h-1.5 w-2/3 rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            Awards &amp; recognitions: {awards}
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-muted">
            <div className="h-1.5 w-1/2 rounded-full bg-primary" />
          </div>
        </>
      ),
    },
  ];
}

const CARD_WIDTH_DESKTOP = 224;
const CARD_WIDTH_MOBILE = 150;

function useCardWidth() {
  const [width, setWidth] = useState(CARD_WIDTH_DESKTOP);

  useEffect(() => {
    const update = () =>
      setWidth(window.innerWidth < 640 ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

function CardCarousel({ stats }: { stats: SiteSettingsStats }) {
  const cards = buildCards(stats);
  const [active, setActive] = useState(2);
  const cardWidth = useCardWidth();

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(id);
  }, [cards.length]);

  return (
    <div
      className="relative mx-auto h-48 w-full max-w-4xl [perspective:1600px] sm:h-56"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      {cards.map((card, i) => {
        let offset = i - active;
        if (offset > cards.length / 2) offset -= cards.length;
        if (offset < -cards.length / 2) offset += cards.length;

        const abs = Math.abs(offset);

        return (
          <motion.div
            key={card.label}
            className={`absolute left-1/2 top-0 flex h-48 flex-col justify-center p-4 text-left backdrop-blur-lg sm:h-56 sm:p-5 ${
              card.dark
                ? "bg-gradient-to-br from-[#c0394b]/80 to-[#7a1f33]/80"
                : "bg-card/80"
            }`}
            style={{ width: cardWidth, marginLeft: -cardWidth / 2 }}
            animate={{
              x: offset * cardWidth,
              y: abs * 14,
              rotateY: offset * -22,
              scale: 1 - abs * 0.08,
              opacity: abs > 2 ? 0 : 1,
              zIndex: 10 - abs,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {card.render()}
          </motion.div>
        );
      })}
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection({
  stats = {},
  ratingLabel = "Rated 4.9/5 by 200+ clients",
}: {
  stats?: SiteSettingsStats;
  ratingLabel?: string;
}) {
  const [showCursor, setShowCursor] = useState(true);

  return (
    <section
      id="home"
      className="relative bg-background px-2 pt-2 sm:px-3 sm:pt-3"
    >
      {/* Blue sky panel with downward point */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute h-0 w-0"
      >
        <defs>
          <clipPath id="heroClip" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.01)"
              d="M 0,2
                 Q 0,0 2,0
                 L 98,0
                 Q 100,0 100,2
                 L 100,70
                 Q 100,71.5 98.7,72.3
                 L 51.7,99.4
                 Q 50,100.4 48.3,99.4
                 L 1.3,72.3
                 Q 0,71.5 0,70
                 Z"
            />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative overflow-hidden"
        style={{ clipPath: "url(#heroClip)" }}
      >
        {/* Sky background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #2f80c6 0%, #4a9fe0 30%, #79bce9 60%, #a9d4f0 80%, #cfe6f6 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
        {/* soft cloud blobs */}
        <div className="pointer-events-none absolute left-[8%] top-[14%] -z-10 h-28 w-72 rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute right-[6%] top-[22%] -z-10 h-32 w-80 rounded-full bg-white/45 blur-3xl" />
        <div className="pointer-events-none absolute left-[24%] top-[38%] -z-10 h-24 w-64 rounded-full bg-white/30 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-24 text-center sm:pb-20 sm:pt-20">
          <h1 className="mx-auto flex min-h-14 max-w-3xl items-center justify-center text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:min-h-32 sm:text-6xl md:min-h-38 md:text-7xl">
            <TypeAnimation
              sequence={[
                "We build whatever you imagine",
                () => setShowCursor(false),
              ]}
              wrapper="span"
              speed={50}
              cursor={false}
              repeat={0}
            />
            {showCursor && <span className="animate-pulse text-white">|</span>}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-white/90 sm:text-base">
            Full-service software agency delivering end-to-end digital
            solutions, from web and mobile apps to system integrations.
          </p>

          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToId("work")}
              className="flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lg transition-transform hover:scale-[1.02]"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="size-3" />
              </span>
              View Our Work
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="size-4" fill="currentColor" />
              Get in Touch
            </button>
          </div>

          {/* Composition area */}
          <div className="relative mx-auto mt-8 mb-16 h-80 max-w-5xl sm:mt-10 sm:mb-24 sm:h-100 md:h-110">
            {/* central portrait */}
            <div className="absolute left-1/2 -top-20 h-120 w-100 -translate-x-1/2 overflow-hidden sm:-top-32 sm:h-150 sm:w-125 md:-top-38 md:h-170 md:w-145">
              <img
                src="/hero-person.png"
                alt="Software developer at Etqan Agency"
                className="h-full w-full object-cover object-top [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_40%,transparent_80%)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_40%,transparent_80%)]"
              />
            </div>

            {/* tint to blend cards into sky */}
            <div className="pointer-events-none absolute inset-x-0 top-[28%] -z-0 h-48 bg-gradient-to-b from-transparent via-[#3f93d6]/30 to-transparent" />

            {/* Card carousel */}
            <div className="absolute inset-x-0 top-[68%] [perspective:1200px]">
              <CardCarousel stats={stats} />
            </div>
          </div>

          {/* Rating */}
          <div className="relative z-10 mt-4">
            <p className="text-sm font-medium text-black/90">{ratingLabel}</p>
            <div className="mt-1 flex items-center justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 text-amber-400"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
