"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";

// not-found pages don't receive route params, so read the language from the URL.
export default function NotFound() {
  const locale = usePathname()?.startsWith("/ar") ? "ar" : "en";
  const t = getDictionary(locale).notFound;
  const home = localePath(locale, "/");

  return (
    <main id="main" tabIndex={-1} className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">404</p>
      <h1 className="mt-6 text-5xl font-medium tracking-[-0.04em] md:text-7xl">{t.heading}</h1>
      <p className="mt-6 max-w-md text-muted">{t.text}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4 text-[11px] font-bold tracking-widest">
        <Link href={home} className="rounded-full bg-foreground px-6 py-4 text-white hover:bg-primary">{t.home}</Link>
        <Link href={`${home}#expertise`} className="rounded-full border border-foreground px-6 py-4">{t.services}</Link>
        <Link href={`${home}#contact`} className="rounded-full border border-foreground px-6 py-4">{t.contact}</Link>
      </div>
    </main>
  );
}
