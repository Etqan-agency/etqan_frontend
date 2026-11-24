import { NextResponse } from "next/server";
import { buildCatalog } from "@/i18n/catalog";

/**
 * Every built-in UI string the dashboard can override, with its default text:
 *
 *   GET /api/site-copy-catalog
 *   { "en": { "hero.h1Line1": "Software products", ... }, "ar": { ... },
 *     "sections": [{ "key": "hero", "label": { "en": "Homepage hero", "ar": "..." }, "count": 9 }, ...] }
 *
 * Keys are flat dot paths into the copy tree (arrays by index). Public data only: the defaults shipped in
 * the site's code, never the overrides (those come from the API's /api/site-copy/).
 */

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=300",
};

export function GET() {
  return NextResponse.json(buildCatalog(), { headers: HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}
