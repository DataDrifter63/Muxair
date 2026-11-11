export type FaqItem = { question: string; answer: string };

/** Parses the body of a `:::faq` block: groups separated by a blank line, first line = question. */
export function parseFaqBlock(raw: string): FaqItem[] {
  return raw
    .split(/\n\s*\n/)
    .map((group) =>
      group
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    )
    .filter((lines) => lines.length >= 2)
    .map(([question, ...answer]) => ({ question: question ?? "", answer: answer.join(" ") }));
}

/** Pulls every `:::faq` block out of a post, e.g. for FAQPage structured data. */
export function extractFaqs(content: string): FaqItem[] {
  const out: FaqItem[] = [];
  const re = /:::faq[^\n]*\n([\s\S]*?)\n:::/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) out.push(...parseFaqBlock(m[1] ?? ""));
  return out;
}
