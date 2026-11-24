import { cache } from "react";
import ar from "./ar";
import en, { type Dictionary } from "./en";
import type { Locale } from "./config";
import { applyCopyOverrides, defaultCopy, type CopyTree } from "./catalog";
import type { LegalStrings } from "./legal";
import { getSiteCopyOverrides } from "@/lib/api";
import type { TimelineItem } from "@/components/TimelineLayout";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

/** Built-in copy only (no dashboard overrides). Server code should use `getCopy`. */
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
export type { Dictionary };

/**
 * The locale's copy tree with the dashboard's overrides (`/api/site-copy/`) applied. Fetched once per
 * request (React `cache`) and through the API cache tag, so the backend's revalidation webhook refreshes
 * it. If the API is unreachable the built-in copy is used.
 */
const getCopyTree = cache(async (locale: Locale): Promise<CopyTree> => {
  const overrides = await getSiteCopyOverrides();
  return applyCopyOverrides(defaultCopy(locale), overrides?.[locale]);
});

/** UI dictionary for a locale, dashboard overrides applied. */
export async function getCopy(locale: Locale): Promise<Dictionary> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { legal, processSteps, ...dict } = await getCopyTree(locale);
  return dict;
}

/** Legal pages / services-menu strings, dashboard overrides applied. */
export async function getLegalCopy(locale: Locale): Promise<LegalStrings> {
  return (await getCopyTree(locale)).legal;
}

/** "How we work" steps, dashboard overrides applied. */
export async function getProcessCopy(locale: Locale): Promise<TimelineItem[]> {
  return (await getCopyTree(locale)).processSteps;
}
