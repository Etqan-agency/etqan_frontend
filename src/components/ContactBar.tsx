"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { Contact } from "@/lib/data";
import type { Dictionary } from "@/i18n";

/** Always-available WhatsApp (and call, on mobile). Clicks are tracked by <Tracking />. */
export default function ContactBar({ contact, t }: { contact: Contact; t: Dictionary["contactBar"] }) {
  const [href, setHref] = useState(contact.whatsapp);

  // Pre-fill the chat with the page the visitor came from, so WhatsApp leads can be attributed.
  useEffect(() => {
    const text = t.prefill.replace("{path}", window.location.pathname);
    setHref(`${contact.whatsapp}?text=${encodeURIComponent(text)}`);
  }, [contact.whatsapp, t.prefill]);

  return (
    <>
      {/* Desktop: floating button */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={t.aria}
        data-cta-location="whatsapp_float"
        className="fixed bottom-6 end-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 md:grid"
      >
        <MessageCircle size={26} aria-hidden />
      </a>

      {/* Mobile: sticky bottom bar */}
      <div data-cta-location="mobile_bar" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 text-[11px] font-bold tracking-widest text-[#0b7064]">
          <MessageCircle size={18} aria-hidden /> {t.whatsapp}
        </a>
        <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 border-s border-border py-4 text-[11px] font-bold tracking-widest">
          <Phone size={18} aria-hidden /> {t.call}
        </a>
      </div>
    </>
  );
}
