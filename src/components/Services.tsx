"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ServiceVisual from "./ServiceVisual";
import type { Service } from "@/lib/data";
import type { Dictionary } from "@/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services({
  services, t, servicesPath, learnMore,
}: {
  services: Service[]; t: Dictionary["services"]; servicesPath: string; learnMore: string;
}) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="expertise" className="border-t border-border px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 md:mb-24">
          <h2 className="shrink-0 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-8xl">
            {t.heading[0]} {t.heading[1]}
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">({String(services.length).padStart(2, "0")}) {t.countLabel}</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          <ul className="lg:col-span-5">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-t border-border last:border-b">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-6 py-7 text-start md:py-9"
                    >
                      <span className={`text-[11px] font-medium tracking-widest transition-colors duration-500 ${isActive ? "text-primary" : "text-muted"}`}>{s.id}</span>
                      <span
                        className={`flex-1 text-3xl font-medium tracking-[-0.03em] transition-all duration-700 ease-premium md:text-5xl ${
                          isActive ? "translate-x-3 text-foreground rtl:-translate-x-3" : "text-foreground/50"
                        }`}
                      >
                        {s.title}
                      </span>
                      <ArrowUpRight
                        size={22}
                        className={`text-primary transition-all duration-700 ease-premium rtl:-scale-x-100 ${isActive ? "rotate-45 opacity-100 rtl:-rotate-45" : "opacity-0"}`}
                      />
                    </button>
                  </h3>
                  {/* Mobile inline reveal. Every description stays in the HTML (collapsed, not unmounted) so crawlers see all services. */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium lg:hidden ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!isActive}>
                      <p className="pb-4 text-sm leading-relaxed text-muted">{s.description}</p>
                      <Link href={`${servicesPath}/${s.slug}`} className="mb-8 inline-block text-[11px] font-bold tracking-widest text-primary">
                        {learnMore} →
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* The visual spans exactly the list's height; the description gets its own row underneath */}
          <div className="relative hidden overflow-hidden rounded-sm bg-navy lg:col-span-7 lg:block">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute inset-0"
              >
                <ServiceVisual slug={current.slug} title={current.title} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden lg:col-span-7 lg:col-start-6 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="grid grid-cols-7 gap-8"
              >
                <p className="col-span-4 text-lg leading-relaxed">{current.description}</p>
                <ul className="col-span-3 space-y-2 text-[11px] font-medium uppercase tracking-widest text-muted">
                  {current.tags.map((t) => <li key={t}><span className="text-accent">—</span> {t}</li>)}
                </ul>
                <Link href={`${servicesPath}/${current.slug}`} className="col-span-7 text-[11px] font-bold tracking-widest text-primary hover:underline">
                  {learnMore} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
