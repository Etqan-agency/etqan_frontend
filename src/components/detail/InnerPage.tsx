import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getServices, getSite } from "@/lib/api";
import { getNav } from "@/lib/nav";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Chrome shared by every inner page: navigation, an optional contact section (kept on service and
 * project pages because that's where buying decisions happen), and the footer.
 */
export default async function InnerPage({
  locale, path, children, withContact = true,
}: {
  locale: Locale; path: string; children: React.ReactNode; withContact?: boolean;
}) {
  const t = getDictionary(locale);
  const [site, services, nav] = await Promise.all([getSite(locale), getServices(locale), getNav(locale, path)]);

  return (
    <>
      <Navbar contact={site.contact} t={t.nav} {...nav} />
      <main id="main" tabIndex={-1} className="pt-20">
        {children}
        {withContact && <Contact contact={site.contact} services={services.map((s) => ({ slug: s.slug, title: s.title }))} t={t.contact} form={t.form} />}
      </main>
      <Footer contact={site.contact} services={services} t={t.footer} nav={nav.links} locale={locale} />
    </>
  );
}
