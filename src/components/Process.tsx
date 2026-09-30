import TimelineLayout, { type TimelineItem } from "./TimelineLayout";
import type { Dictionary } from "@/i18n";

export default function Process({ items, t }: { items: TimelineItem[]; t: Dictionary["process"] }) {
  return (
    <section id="process" className="border-t border-border px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 md:mb-32">
          <h2 className="shrink-0 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-8xl">
            {t.heading[0]} {t.heading[1]}
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">({String(items.length).padStart(2, "0")}) {t.countLabel}</p>
        </div>
        <TimelineLayout items={items} />
      </div>
    </section>
  );
}
