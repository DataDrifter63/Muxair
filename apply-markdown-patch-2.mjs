// Muxair: adds two more blocks to src/components/site/MarkdownContent.tsx
//   :::bars      before/after comparison bars
//   :::timeline  vertical timeline with dots
//
// Run this AFTER apply-markdown-patch.mjs (the one that added :::stats).
//
// Usage (from the project root, in the VS Code terminal):
//   node apply-markdown-patch-2.mjs
//
// Safe to run: it makes a backup (MarkdownContent.tsx.bak2), refuses to run
// twice, and stops without changing anything if a spot it expects is missing.

import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";

const TARGET = "src/components/site/MarkdownContent.tsx";

if (!existsSync(TARGET)) {
  console.error(`Could not find ${TARGET}. Run this from the project root (the folder with package.json).`);
  process.exit(1);
}

let src = readFileSync(TARGET, "utf8");

if (src.includes("BarsChart")) {
  console.log("Already patched (BarsChart found). Nothing to do.");
  process.exit(0);
}

if (!src.includes("StatsRow")) {
  console.error("StatsRow not found. Run `node apply-markdown-patch.mjs` first, then run this one.");
  process.exit(1);
}

const problems = [];

function replaceOnce(label, pattern, replacement) {
  if (!pattern.test(src)) {
    problems.push(label);
    return;
  }
  src = src.replace(pattern, () => replacement);
}

// 1. Doc comment.
replaceOnce(
  "doc comment",
  /\n \*\/\n\ntype CtaBlock/,
  `
 *
 *   :::bars Previous 28 days | Latest 28 days
 *   Clicks | 179 | 1,360
 *   Impressions | 45.1K | 197K
 *   :::
 *
 * ...renders paired horizontal bars per row (\`label | before | after\`),
 * scaled against the larger value. Values may use K and M suffixes. Do not
 * use it for metrics where lower is better, such as average position.
 *
 *   :::timeline
 *   Mid June | A quiet start | A sentence or two about what happened.
 *   :::
 *
 * ...renders a vertical timeline (\`when | title | description\`).
 */

type CtaBlock`,
);

// 2. The two components, placed just before markdownComponents.
replaceOnce(
  "markdownComponents",
  /const markdownComponents = \{/,
  `function parseMetric(value: string): number {
  const m = value.replace(/,/g, "").trim().match(/^([\\d.]+)\\s*([kKmM]?)/);
  if (!m || !m[1]) return 0;
  const n = parseFloat(m[1]);
  const suffix = (m[2] ?? "").toLowerCase();
  return suffix === "k" ? n * 1_000 : suffix === "m" ? n * 1_000_000 : n;
}

type BarRow = { label: string; before: string; after: string };

function parseBarsBlock(raw: string): BarRow[] {
  return raw
    .split("\\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, before, after] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", before: before ?? "", after: after ?? "" };
    });
}

function BarsChart({ legend, rows }: { legend: string; rows: BarRow[] }) {
  const [beforeLabel, afterLabel] = legend.split("|").map((s) => s.trim());
  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface/50 p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          {beforeLabel || "Before"}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          {afterLabel || "After"}
        </span>
      </div>
      <div className="space-y-7">
        {rows.map((row, i) => {
          const before = parseMetric(row.before);
          const after = parseMetric(row.after);
          const max = Math.max(before, after, 1);
          return (
            <div key={i}>
              <p className="text-sm font-semibold text-foreground">{row.label}</p>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div
                      className="h-3 rounded-full bg-muted-foreground/40"
                      style={{ width: \`\${Math.max((before / max) * 100, 2)}%\` }}
                    />
                  </div>
                  <span className="w-16 text-right text-xs text-muted-foreground">{row.before}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div
                      className="h-3 rounded-full bg-primary"
                      style={{ width: \`\${Math.max((after / max) * 100, 2)}%\` }}
                    />
                  </div>
                  <span className="w-16 text-right font-display text-sm font-bold text-primary">
                    {row.after}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type TimelineItem = { when: string; title: string; description: string };

function parseTimelineBlock(raw: string): TimelineItem[] {
  return raw
    .split("\\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [when, title, description] = line.split("|").map((s) => s.trim());
      return { when: when ?? "", title: title ?? "", description: description ?? "" };
    });
}

function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="not-prose my-8 ml-2 border-l border-border">
      {items.map((item, i) => (
        <li key={i} className="relative pb-8 pl-7 last:pb-0">
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
          <p className="text-[13px] font-bold uppercase tracking-wide text-primary">{item.when}</p>
          <p className="mt-1 text-[15.5px] font-semibold leading-snug text-foreground">
            {item.title}
          </p>
          {item.description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

const markdownComponents = {`,
);

// 3. Block regex.
replaceOnce(
  "BLOCK_RE",
  /\(cta\|checklist\|compare\|stats\)/,
  "(cta|checklist|compare|stats|bars|timeline)",
);

// 4. Render the new blocks.
replaceOnce(
  "stats dispatch",
  /nodes\.push\(<StatsRow key=\{key\+\+\} items=\{parseStatsBlock\(body \?\? ""\)\} \/>\);/,
  `nodes.push(<StatsRow key={key++} items={parseStatsBlock(body ?? "")} />);
    } else if (type === "bars") {
      nodes.push(
        <BarsChart
          key={key++}
          legend={(inlineArg ?? "").trim()}
          rows={parseBarsBlock(body ?? "")}
        />,
      );
    } else if (type === "timeline") {
      nodes.push(<TimelineList key={key++} items={parseTimelineBlock(body ?? "")} />);`,
);

if (problems.length) {
  console.error("Nothing was changed. These spots were not found in the file:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

copyFileSync(TARGET, TARGET + ".bak2");
writeFileSync(TARGET, src);
console.log("Patched " + TARGET);
console.log("Backup saved as " + TARGET + ".bak2");
console.log("Next: run `npm run dev` and open the case study to check it.");
