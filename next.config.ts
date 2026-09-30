import type { NextConfig } from "next";

// Allow next/image to load media uploaded through the dashboard (served by the Django API host).
const api = process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL) : null;
// When the backend stores media on S3/R2 behind a CDN (AWS_S3_CUSTOM_DOMAIN), images come from that host instead.
const media = process.env.NEXT_PUBLIC_MEDIA_URL ? new URL(process.env.NEXT_PUBLIC_MEDIA_URL) : null;
const imageHosts = [api, media].filter((u): u is URL => u !== null);

// Third parties the site may load: GTM/GA4, Clarity (via GTM), Cloudflare Turnstile.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms ${imageHosts.map((u) => u.origin).join(" ")}`.trim(),
  "font-src 'self'",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms${api ? ` ${api.origin}` : ""}`,
  "frame-src https://www.googletagmanager.com https://challenges.cloudflare.com",
  "media-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Report-only first: switch to Content-Security-Policy once the browser console shows no violations.
  { key: "Content-Security-Policy-Report-Only", value: CSP },
];

const nextConfig: NextConfig = {
  // /work was the first name for case studies; /projects matches the navigation. Keep old links alive.
  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/ar/work", destination: "/ar/projects", permanent: true },
      { source: "/ar/work/:slug", destination: "/ar/projects/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // Pin the workspace root (a stray lockfile in the home folder confuses inference).
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: imageHosts.map((u) => ({
      protocol: u.protocol.replace(":", "") as "http" | "https",
      hostname: u.hostname,
      port: u.port,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
