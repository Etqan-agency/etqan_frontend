import { NextResponse, type NextRequest } from "next/server";

/**
 * English is served at the root and Arabic under /ar, from one `app/[locale]` tree.
 * Unprefixed paths are rewritten to /en internally; a literal /en URL redirects to the root
 * so each page has exactly one public URL per language.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension (images, videos, fonts…).
  matcher: ["/((?!_next|api|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml|.*\\..*).*)"],
};
