import type { Project } from "./data";

export type Pic = { src: string; width: number; height: number };

/**
 * How a project's pictures sit in a card, so every project looks right whatever was uploaded:
 * wide screenshots (websites, dashboards) fill the card; anything square or tall (app screens, logos)
 * is shown whole in a framed panel. Mobile apps prefer real phone screenshots from the gallery over a
 * square cover such as a logo.
 */
export function picturesFor(project: Project): { wide: Pic | null; panel: Pic[] } {
  const img = project.image;
  if (img && img.width / img.height >= 1.2) return { wide: img, panel: [] };
  const phones = (project.gallery ?? []).filter((g) => g.height > g.width * 1.2).slice(0, 2);
  if (phones.length) return { wide: null, panel: phones };
  return { wide: null, panel: img ? [img] : [] };
}
