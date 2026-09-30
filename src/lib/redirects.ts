import { notFound, permanentRedirect, redirect } from "next/navigation";
import { localePath, type Locale } from "@/i18n/config";
import { API_CACHE_TAG, API_URL } from "./api";
import { LEGACY_SERVICE_SLUGS } from "./data";

type Resolved = { to: string; permanent: boolean };

/** Ask the backend whether a moved URL has a new home (paths are stored without the /ar prefix). */
async function resolve(path: string): Promise<Resolved | null> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/redirects/resolve/?path=${encodeURIComponent(path)}`, { next: { revalidate: 300, tags: [API_CACHE_TAG] } });
      if (res.ok) return (await res.json()) as Resolved;
    } catch {
      /* API down — fall through to built-in legacy slugs */
    }
  }
  const legacy = path.match(/^\/services\/([^/]+)$/);
  const to = legacy && LEGACY_SERVICE_SLUGS[legacy[1]];
  return to ? { to: `/services/${to}`, permanent: true } : null;
}

/**
 * Call instead of notFound() on pages whose URL may have changed: a moved page answers with
 * a 308/307 to its new URL (same language) so rankings and shared links carry over; anything else 404s.
 */
export async function redirectOrNotFound(locale: Locale, path: string): Promise<never> {
  const hit = await resolve(path);
  if (hit && hit.to !== path) {
    const target = localePath(locale, hit.to);
    if (hit.permanent) permanentRedirect(target);
    redirect(target);
  }
  notFound();
}
