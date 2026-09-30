"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";

const KEY = "etqan_consent";

type Choice = "granted" | "denied";

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
}

/** Google Consent Mode v2 banner. Defaults are "denied" (set in layout) until the visitor accepts. */
export default function ConsentBanner({ t }: { t: Dictionary["consent"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* storage blocked: ask every visit */
    }
    if (saved === "granted" || saved === "denied") applyConsent(saved);
    else setOpen(true);
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    applyConsent(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={t.aria}
      className="fixed inset-x-4 bottom-24 z-[70] mx-auto max-w-xl rounded-2xl border border-border bg-background p-5 text-sm shadow-2xl md:bottom-6"
    >
      <p className="leading-relaxed text-foreground">
        {t.text}
      </p>
      <div className="mt-4 flex justify-end gap-3">
        <button type="button" onClick={() => choose("denied")} className="rounded-full border border-foreground px-5 py-2 text-[11px] font-bold tracking-widest">
          {t.decline}
        </button>
        <button type="button" onClick={() => choose("granted")} className="rounded-full bg-foreground px-5 py-2 text-[11px] font-bold tracking-widest text-white hover:bg-primary">
          {t.accept}
        </button>
      </div>
    </div>
  );
}
