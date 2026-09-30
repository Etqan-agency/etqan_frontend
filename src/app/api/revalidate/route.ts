import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { LOCALES } from "@/i18n/config";
import { API_CACHE_TAG } from "@/lib/api";

/**
 * On-demand revalidation, called by the Django API after content is saved or deleted.
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "paths": ["/blog", "/blog/my-post"], "type": "page" | "layout" }
 *
 * Paths are locale-neutral. English pages live at the root but render from /en internally (see
 * middleware), so each path is refreshed as-is, under /en and under /ar.
 */
export const dynamic = "force-dynamic";

const MAX_PATHS = 100;

function secretMatches(given: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET ?? "";
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Normalise to "/x/y" (no query/fragment, no trailing slash, no locale prefix); null if unusable. */
function normalise(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let p = raw.trim().split("#")[0].split("?")[0];
  if (!p.startsWith("/") || p.startsWith("//") || /\s/.test(p)) return null;
  if (p.length > 1) p = p.replace(/\/+$/, "") || "/";
  for (const locale of LOCALES) {
    if (p === `/${locale}`) return "/";
    if (p.startsWith(`/${locale}/`)) return p.slice(locale.length + 1);
  }
  return p;
}

const localeVariants = (path: string) => [
  path,
  ...LOCALES.map((l) => (path === "/" ? `/${l}` : `/${l}${path}`)),
];

export async function POST(req: NextRequest) {
  if (!secretMatches(req.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ revalidated: false, detail: "Invalid secret." }, { status: 401 });
  }

  let body: { paths?: unknown; type?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ revalidated: false, detail: "Body must be JSON." }, { status: 400 });
  }
  if (!Array.isArray(body.paths) || body.paths.length === 0) {
    return NextResponse.json({ revalidated: false, detail: "`paths` must be a non-empty array." }, { status: 400 });
  }
  const type = body.type === "layout" ? "layout" : "page";

  const paths = [...new Set(body.paths.slice(0, MAX_PATHS).map(normalise).filter((p): p is string => p !== null))];
  const revalidated = [...new Set(paths.flatMap(localeVariants))];
  // Expire cached API responses first (revalidatePath alone left the pages rendering from stale fetch data),
  // then the affected pages in both languages.
  revalidateTag(API_CACHE_TAG);
  for (const p of revalidated) revalidatePath(p, type);

  return NextResponse.json({ revalidated: true, type, paths: revalidated, now: Date.now() });
}
