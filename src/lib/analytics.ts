/*
 * Thin dataLayer wrapper. GTM (when NEXT_PUBLIC_GTM_ID is set) forwards these to GA4.
 * Event names follow the growth plan: snake_case, object_action, no personal data.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/* ----- First-touch attribution, sent with every lead ----- */

const ATTRIBUTION_KEY = "etqan_attribution";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | "referrer" | "landing_page", string>>;

/** Store UTMs / click ids / referrer from the landing visit (first touch wins, 30 days). */
export function captureAttribution() {
  try {
    const stored = readAttribution();
    const params = new URLSearchParams(window.location.search);
    const hasCampaign = UTM_KEYS.some((k) => params.get(k));
    if (stored && !hasCampaign) return;

    const data: Attribution = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 150);
    });
    const ref = document.referrer;
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref.slice(0, 500);
    data.landing_page = (window.location.pathname + window.location.search).slice(0, 500);
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage blocked — attribution is best-effort */
  }
}

export function readAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Attribution };
    if (Date.now() - at > ATTRIBUTION_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}
