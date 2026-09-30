import Link from "next/link";
import { jsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/i18n";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
    })),
  };

  // The first crumb is always the localized home ("/" or "/ar"), which tells us the page language.
  const label = getDictionary(items[0]?.href.startsWith("/ar") ? "ar" : "en").a11y.breadcrumb;

  return (
    <nav aria-label={label} className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-accent">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-foreground">{c.name}</span>
            ) : (
              <Link href={c.href} className="transition-colors hover:text-primary">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </nav>
  );
}
