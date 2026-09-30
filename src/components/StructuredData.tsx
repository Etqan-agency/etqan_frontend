import type { Contact } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { localePath, type Locale } from "@/i18n/config";

const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Sitewide entity data (Organization + ProfessionalService + WebSite).
 * Only facts shown on the site belong here — no ratings, founding year or legal name until verified.
 */
export default function StructuredData({ contact, locale, description }: { contact: Contact; locale: Locale; description: string }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: ["ETQAN Agency", "إتقان", "وكالة إتقان"],
      url: SITE_URL,
      logo: `${SITE_URL}/brand/etqan-logo.png`,
      description,
      email: contact.email,
      telephone: contact.phone.replace(/\s/g, ""),
      sameAs: contact.socials.map((s) => s.href),
      knowsAbout: [
        "Web development", "Mobile app development", "Custom software development",
        "E-commerce development", "UI/UX design", "Branding", "Digital marketing", "SEO",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/brand/etqan-logo.png`,
      parentOrganization: { "@id": ORG_ID },
      email: contact.email,
      telephone: contact.phone.replace(/\s/g, ""),
      address: {
        "@type": "PostalAddress",
        addressLocality: "6th of October City",
        addressRegion: "Giza",
        addressCountry: "EG",
      },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      availableLanguage: ["en", "ar"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": ORG_ID },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${localePath(locale, "/")}#webpage`,
      url: `${SITE_URL}${localePath(locale, "/")}`,
      name: SITE_NAME,
      description,
      inLanguage: locale,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": ORG_ID },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: every value is our own content, and "<" is escaped below.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
