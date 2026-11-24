"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/i18n/en";

/**
 * The 404 page is a client component (it reads the language from the URL), so it can't fetch the
 * dashboard's copy overrides itself. The locale layout passes its already-merged 404 strings down here.
 */
const NotFoundCopyContext = createContext<Dictionary["notFound"] | null>(null);

export function NotFoundCopyProvider({ copy, children }: { copy: Dictionary["notFound"]; children: React.ReactNode }) {
  return <NotFoundCopyContext.Provider value={copy}>{children}</NotFoundCopyContext.Provider>;
}

export const useNotFoundCopy = () => useContext(NotFoundCopyContext);
