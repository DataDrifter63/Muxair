// Muxair: adds styled markdown images (with captions) and a :::stats block
// to src/components/site/MarkdownContent.tsx.
//
// Usage (from the project root, in the VS Code terminal):
//   node apply-markdown-patch.mjs
//
// Safe to run: it makes a backup (MarkdownContent.tsx.bak), refuses to run
// twice, and stops without changing anything if a spot it expects is missing.

import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";

const TARGET = "src/components/site/MarkdownContent.tsx";

if (!existsSync(TARGET)) {
  console.error(`Could not find ${TARGET}. Run this from the project root (the folder with package.json).`);
  process.exit(1);
}

let src = readFileSync(TARGET, "utf8");

if (src.includes("StatsRow")) {
  console.log("Already patched (StatsRow found). Nothing to do.");
  process.exit(0);
}

const problems = [];

function replaceOnce(label, pattern, replacement) {
  const matches = src.match(pattern);
  if (!matches) {
    problems.push(label);
    return;
  }
  src = src.replace(pattern, () => replacement);
}

// 1. Doc comment: describe the new :::stats block.
replaceOnce(
  "doc comment",
  /\n \*\/\n\ntype CtaBlock/,
  `
 *
 *   :::stats
 *   2016 | Year founded
 *   $12M+ | Projects delivered
 *   :::
 *
 * ...renders a row of big orange numbers with a small label underneath, each
 * line being \`value | label\` (2 to 4 lines look best).
 *
 * Images use normal Markdown: ![alt text](url "optional caption"). They render
 * as a rounded, bordered figure with the title text shown as a caption.
 */

type CtaBlock`,
);

// 2. Stats component, placed just before markdownComponents.
replaceOnce(
  "markdownComponents",
  /const markdownComponents = \{/,
  `type StatItem = { value: string; label: string };

function parseStatsBlock(raw: string): StatItem[] {
  return raw
    .split("\\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label] = line.split("|").map((s) => s.trim());
      return { value: value ?? "", label: label ?? "" };
    });
}

function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:grid-cols-4">
      {items.map((s, i) => (
        <div key={i} className="text-center">
          <p className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

const markdownComponents = {`,
);

// 3. Paragraph renderer: don't wrap a lone image in <p>, and add the img renderer.
replaceOnce(
  "p renderer",
  /  p: \(props: any\) => <p className="mt-5 text-base leading-relaxed text-foreground\/90" \{\.\.\.props\} \/>,\n/,
  `  p: ({ node, ...props }: any) => {
    const onlyImage = node?.children?.length === 1 && node.children[0]?.tagName === "img";
    return onlyImage ? (
      <>{props.children}</>
    ) : (
      <p className="mt-5 text-base leading-relaxed text-foreground/90" {...props} />
    );
  },
  img: ({ src, alt, title }: any) => (
    <figure className="not-prose my-8">
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full rounded-2xl border border-border"
      />
      {title ? (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">{title}</figcaption>
      ) : null}
    </figure>
  ),
`,
);

// 4. Block regex: recognise :::stats.
replaceOnce(
  "BLOCK_RE",
  /\(cta\|checklist\|compare\)/,
  "(cta|checklist|compare|stats)",
);

// 5. Render :::stats blocks.
replaceOnce(
  "compare dispatch",
  /nodes\.push\(<CompareCards key=\{key\+\+\} cards=\{parseCompareBlock\(body \?\? ""\)\} \/>\);/,
  `nodes.push(<CompareCards key={key++} cards={parseCompareBlock(body ?? "")} />);
    } else if (type === "stats") {
      nodes.push(<StatsRow key={key++} items={parseStatsBlock(body ?? "")} />);`,
);

if (problems.length) {
  console.error("Nothing was changed. These spots were not found in the file:");
  for (const p of problems) console.error("  - " + p);
  console.error("The file may have been edited since this patch was written.");
  process.exit(1);
}

copyFileSync(TARGET, TARGET + ".bak");
writeFileSync(TARGET, src);
console.log("Patched " + TARGET);
console.log("Backup saved as " + TARGET + ".bak");
console.log("Next: run `npm run dev` and open a case study to check it.");
