import { Boxes, Cpu, Workflow } from "lucide-react";
import type { Dictionary } from "@/i18n";

const ICONS = [Cpu, Boxes, Workflow];

/** Homepage "What We Do": the three things ETQAN builds. Copy lives in the dictionary (editable from the dashboard). */
export default function WhatWeDo({ t }: { t: Dictionary["whatWeDo"] }) {
  return (
    <section id="what-we-do" className="border-t border-border px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1520px]">
        <div className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-12 lg:items-end">
          <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-8xl lg:col-span-6">
            {t.heading[0]} {t.heading[1]}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted lg:col-span-6 lg:justify-self-end">{t.intro}</p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={item.title} className="group flex flex-col bg-background p-8 transition-colors duration-500 hover:bg-navy hover:text-white md:p-10">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-border text-primary transition-colors duration-500 group-hover:border-white/20 group-hover:text-accent">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="text-[11px] font-medium tracking-widest text-muted group-hover:text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl">{item.title}</h3>
                {item.text.map((p) => (
                  <p key={p} className="mt-4 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70 md:text-base">
                    {p}
                  </p>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
