/** Canonical origin for metadata, sitemap and structured data. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.etqanpp.com").replace(/\/+$/, "");

export const SITE_NAME = "ETQAN";
export const SITE_TITLE = "ETQAN — Software Development & Digital Marketing Company in Egypt";
export const SITE_DESCRIPTION =
  "ETQAN designs, builds and markets websites, mobile apps and custom business software for companies in Egypt and the Gulf — engineering and marketing under one roof.";

/** Optional integrations — each is off until its env var is set. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
