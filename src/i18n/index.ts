import ar from "./ar";
import en, { type Dictionary } from "./en";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
export type { Dictionary };
