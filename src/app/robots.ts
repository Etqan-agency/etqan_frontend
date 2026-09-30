import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search and AI-search crawlers are all welcome; only the post-conversion page is kept out.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you", "/ar/thank-you"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
