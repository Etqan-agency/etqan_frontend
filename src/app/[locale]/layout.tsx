import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import Tracking from "@/components/Tracking";
import ConsentBanner from "@/components/ConsentBanner";
import ContactBar from "@/components/ContactBar";
import { getSite } from "@/lib/api";
import { GTM_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES, dirOf, isLocale, languageAlternates, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

// Readex Pro covers Arabic and Latin, so both locales share one face.
const readex = Readex_Pro({
  subsets: ["latin", "arabic"],
  variable: "--font-readex",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s | ${SITE_NAME}` },
    description: t.meta.description,
    alternates: { canonical: localePath(locale, "/"), languages: languageAlternates("/") },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: localePath(locale, "/"),
      siteName: SITE_NAME,
      locale: t.meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => getDictionary(l).meta.ogLocale),
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

// Consent Mode v2 defaults must be set before GTM loads.
const GTM_BOOTSTRAP = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode } & Params>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const site = await getSite(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={readex.variable} suppressHydrationWarning>
      <head>
        {/* Apply a saved "Pause animations" choice before first paint (see MotionToggle). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('etqan_motion')==='paused')document.documentElement.classList.add('motion-paused')}catch(e){}",
          }}
        />
        <StructuredData contact={site.contact} locale={locale} description={t.meta.description} />
      </head>
      <body className="bg-background text-foreground">
        <a
          href="#main"
          className="sr-only rounded-full bg-foreground text-xs font-bold tracking-widest text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:px-5 focus:py-3"
        >
          {t.a11y.skip}
        </a>
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">{GTM_BOOTSTRAP}</Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
            </noscript>
          </>
        )}
        <SmoothScroll>{children}</SmoothScroll>
        <ContactBar contact={site.contact} t={t.contactBar} />
        <Tracking />
        {GTM_ID && <ConsentBanner t={t.consent} />}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
