"use client";

import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/analytics";

/** Where on the page a click happened: explicit data-cta-location, else the enclosing landmark/section. */
function locationOf(el: Element): string {
  const tagged = el.closest("[data-cta-location]");
  if (tagged) return tagged.getAttribute("data-cta-location") ?? "unknown";
  const region = el.closest("header, footer, section[id]");
  if (!region) return "unknown";
  return region.tagName === "SECTION" ? region.id : region.tagName.toLowerCase();
}

/**
 * One delegated listener covers every contact link on the site, so components
 * don't need their own tracking code. Also records first-touch attribution.
 */
export default function Tracking() {
  useEffect(() => {
    captureAttribution();

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest("a, button");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const location = locationOf(link);
      const page_path = window.location.pathname;

      if (href.includes("wa.me/")) track("whatsapp_click", { location, page_path });
      else if (href.startsWith("tel:")) track("phone_click", { location, page_path });
      else if (href.startsWith("mailto:")) track("email_click", { location, page_path });
      else if (/^https?:/.test(href) && !href.startsWith(window.location.origin)) track("outbound_click", { destination: href });

      const cta = link.closest("[data-cta]");
      if (cta) {
        track("cta_click", {
          cta_text: cta.getAttribute("data-cta") || cta.textContent?.trim().slice(0, 60),
          cta_location: location,
          destination: href || undefined,
        });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
