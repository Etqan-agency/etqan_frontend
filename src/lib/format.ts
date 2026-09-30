import type { Locale } from "@/i18n/config";

export const formatDate = (iso: string | undefined, locale: Locale) =>
  iso ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso)) : "";
