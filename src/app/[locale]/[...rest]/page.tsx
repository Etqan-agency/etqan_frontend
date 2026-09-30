import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { redirectOrNotFound } from "@/lib/redirects";

/**
 * Any unknown path inside a locale: follow a stored redirect if the page moved, otherwise
 * render that locale's 404 page (with its layout, fonts and direction).
 */
export default async function CatchAll({ params }: { params: Promise<{ locale: string; rest: string[] }> }) {
  const { locale, rest } = await params;
  if (!isLocale(locale)) notFound();
  return redirectOrNotFound(locale, `/${rest.map(decodeURIComponent).join("/")}`);
}
