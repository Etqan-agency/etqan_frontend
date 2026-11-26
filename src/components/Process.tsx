import TimelineLayout, { type TimelineItem } from "./TimelineLayout";
import type { Dictionary } from "@/i18n";

/** `intro` is shown only where it is passed (the homepage). */
export default function Process({ items, t, intro }: { items: TimelineItem[]; t: Dictionary["process"]; intro?: string[] }) {
  return (
    <section id="process" className="border-t border-border px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1520px]">
        <div className={`flex flex-wrap items-end justify-between gap-x-6 gap-y-4 ${intro?.length ? "mb-10" : "mb-20 md:mb-32"}`}>
          <h2 className="shrink-0 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-8xl">
            {t.heading[0]} {t.heading[1]}
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">({String(items.length).padStart(2, "0")}) {t.countLabel}</p>
        </div>
        {!!intro?.length && (
          <div className="mb-20 max-w-2xl md:mb-32">
            {intro.map((line, i) => (
              <p key={line} className={i === 0 ? "text-xl font-medium md:text-2xl" : "mt-2 text-lg leading-relaxed text-muted"}>{line}</p>
            ))}
          </div>
        )}
        <TimelineLayout items={items} />
      </div>
    </section>
  );
}
