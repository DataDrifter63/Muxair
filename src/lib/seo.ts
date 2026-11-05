/** Cut text at a word boundary so it fits `max` characters, adding an ellipsis when shortened. */
function clip(text: string, max: number): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.:;\-–—]+$/, "")}…`;
}

/**
 * Page <title> that stays within ~60 characters (search results cut longer ones). The suffix is
 * kept whole and the page's own title is shortened first, so long post / case study names don't
 * push the title over the limit.
 */
export function fitTitle(title: string, suffix: string, max = 60): string {
  const full = `${title} ${suffix}`;
  if (full.length <= max) return full;
  return `${clip(title, max - suffix.length - 1)} ${suffix}`;
}

/** Meta description kept to ~155 characters so it isn't cut off in search results. */
export function fitDescription(text: string, max = 155): string {
  return clip(text, max);
}
