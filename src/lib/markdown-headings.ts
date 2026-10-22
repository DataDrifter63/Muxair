/** URL-safe id for a heading, shared by the headings below and the case study table of contents. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type TocHeading = { id: string; text: string; level: 2 | 3 };

/** Lists the ## and ### headings of a Markdown string (skipping code fences and ::: blocks). */
export function extractHeadings(content: string): TocHeading[] {
  const out: TocHeading[] = [];
  let inFence = false;
  let inBlock = false;
  for (const line of content.split("\n")) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^:::\w/.test(line)) {
      inBlock = true;
      continue;
    }
    if (line.trim() === ":::") {
      inBlock = false;
      continue;
    }
    if (inBlock) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m || !m[1] || !m[2]) continue;
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    const id = slugifyHeading(text);
    if (id) out.push({ id, text, level: m[1].length === 2 ? 2 : 3 });
  }
  return out;
}
