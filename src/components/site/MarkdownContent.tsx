import { Fragment, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./primitives";
import { slugifyHeading } from "@/lib/markdown-headings";

/**
 * Renders blog post content written in Markdown, with two custom block
 * extensions (parsed out before the rest is handed to ReactMarkdown):
 *
 *   :::cta
 *   title: Want an exact number for your business?
 *   text: Book a free call and we'll give you a straight quote.
 *   button: Get a Free Strategy Call
 *   href: /contact
 *   :::
 *
 * ...renders as an inline CTA card using the site's real MagneticButton.
 *
 *   :::checklist Trust & Credibility
 *   01 | Licensing and certification badges displayed | Gas Safe, F-Gas, or whatever applies to your trade.
 *   02 | Reviews and testimonials visible on the homepage | Real names and companies where possible.
 *   :::
 *
 * ...renders a numbered checklist group: an orange uppercase group label,
 * then each `number | title | description` line as a row with the number
 * in orange, a bold title, and a dimmed description underneath.
 *
 *   :::compare
 *   Choose Ads first if:
 *   - You need leads within days, not months
 *   - You're testing a new service area
 *
 *   Choose SEO first if:
 *   - You're established with an existing reputation
 *   - You can commit to at least 3-6 months
 *   :::
 *
 * ...renders a side-by-side pair of cards (stacked on mobile), each with an
 * orange title and a bulleted list — for "X vs Y" / "choose A if / choose B
 * if" comparisons. Separate the two cards with a blank line; each card is
 * its title line followed by `- ` bullet lines. Works with 2 cards; a 3rd
 * blank-line-separated group is ignored past the first two.
 *
 *   :::stats
 *   2016 | Year founded
 *   $12M+ | Projects delivered
 *   :::
 *
 * ...renders a row of big orange numbers with a small label underneath, each
 * line being `value | label` (2 to 4 lines look best).
 *
 * Images use normal Markdown: ![alt text](url "optional caption"). They render
 * as a rounded, bordered figure with the title text shown as a caption.
 *
 *   :::bars Previous 28 days | Latest 28 days
 *   Clicks | 179 | 1,360
 *   Impressions | 45.1K | 197K
 *   :::
 *
 * ...renders paired horizontal bars per row (`label | before | after`),
 * scaled against the larger value. Values may use K and M suffixes. Do not
 * use it for metrics where lower is better, such as average position.
 *
 *   :::timeline
 *   Mid June | A quiet start | A sentence or two about what happened.
 *   :::
 *
 * ...renders a vertical timeline (`when | title | description`).
 */

type CtaBlock = { title?: string; text?: string; button?: string; href?: string };

function parseCtaBlock(raw: string): CtaBlock {
  const fields: CtaBlock = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^(title|text|button|href):\s*(.*)$/);
    if (match && match[1] && match[2] !== undefined) {
      (fields as Record<string, string>)[match[1]] = match[2].trim();
    }
  }
  return fields;
}

function InlineCta({ title, text, button, href }: CtaBlock) {
  return (
    <div className="not-prose my-10 rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-md sm:p-7">
      {title ? <p className="font-display text-lg text-foreground">{title}</p> : null}
      {text ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p> : null}
      {button && href ? (
        <div className="mt-5">
          <MagneticButton href={href}>
            {button}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </div>
      ) : null}
    </div>
  );
}

type ChecklistItem = { number: string; title: string; description: string };

function parseChecklistBlock(raw: string): ChecklistItem[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [number, title, description] = line.split("|").map((s) => s.trim());
      return { number: number ?? "", title: title ?? "", description: description ?? "" };
    });
}

function ChecklistGroup({ label, items }: { label: string; items: ChecklistItem[] }) {
  return (
    <div className="not-prose mt-9">
      {label ? (
        <p className="mb-1 text-[13px] font-bold uppercase tracking-wide text-primary">{label}</p>
      ) : null}
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex gap-4 py-4 ${i < items.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className="w-6 flex-none font-display text-sm font-bold text-primary">
              {item.number}
            </span>
            <div>
              <p className="text-[15.5px] font-semibold leading-snug text-foreground">
                {item.title}
              </p>
              {item.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type CompareCard = { title: string; items: string[] };

function parseCompareBlock(raw: string): CompareCard[] {
  return raw
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => {
      const lines = chunk
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const title = lines.find((l) => !l.startsWith("-")) ?? "";
      const items = lines.filter((l) => l.startsWith("-")).map((l) => l.replace(/^-\s*/, ""));
      return { title, items };
    })
    .filter((card) => card.title || card.items.length);
}

function CompareCards({ cards }: { cards: CompareCard[] }) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {cards.map((card, i) => (
        <div key={i} className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
          {card.title ? (
            <h3 className="font-display text-base text-primary">{card.title}</h3>
          ) : null}
          <ul className="mt-3 space-y-2">
            {card.items.map((item, j) => (
              <li
                key={j}
                className="pl-4 text-sm leading-relaxed text-muted-foreground relative before:absolute before:left-0 before:content-['—']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type StatItem = { value: string; label: string };

function parseStatsBlock(raw: string): StatItem[] {
  return raw
    .split("\n")
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

function parseMetric(value: string): number {
  const m = value
    .replace(/,/g, "")
    .trim()
    .match(/^([\d.]+)\s*([kKmM]?)/);
  if (!m || !m[1]) return 0;
  const n = parseFloat(m[1]);
  const suffix = (m[2] ?? "").toLowerCase();
  return suffix === "k" ? n * 1_000 : suffix === "m" ? n * 1_000_000 : n;
}

type BarRow = { label: string; before: string; after: string };

function parseBarsBlock(raw: string): BarRow[] {
  return raw
    .split("\n")
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
                      style={{ width: `${Math.max((before / max) * 100, 2)}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-xs text-muted-foreground">
                    {row.before}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div
                      className="h-3 rounded-full bg-primary"
                      style={{ width: `${Math.max((after / max) * 100, 2)}%` }}
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
    .split("\n")
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
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// react-markdown passes the parsed syntax node alongside the normal element props.
type MdNode = import("hast").Element;
type MdProps<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> & {
  node?: MdNode | undefined;
};

const markdownComponents = {
  h2: ({ node: _node, ...props }: MdProps<"h2">) => (
    <h2
      id={slugifyHeading(nodeText(props.children))}
      className="mt-11 scroll-mt-28 font-display text-2xl leading-snug text-foreground"
      {...props}
    />
  ),
  h3: ({ node: _node, ...props }: MdProps<"h3">) => (
    <h3
      id={slugifyHeading(nodeText(props.children))}
      className="mt-8 scroll-mt-28 text-lg font-semibold leading-snug text-foreground"
      {...props}
    />
  ),
  p: ({ node, ...props }: MdProps<"p">) => {
    const first = node?.children?.[0];
    const onlyImage =
      node?.children?.length === 1 && first?.type === "element" && first.tagName === "img";
    return onlyImage ? (
      <>{props.children}</>
    ) : (
      <p className="mt-5 text-base leading-relaxed text-foreground/90" {...props} />
    );
  },
  img: ({ src, alt, title }: MdProps<"img">) => <MdImage src={src} alt={alt} title={title} />,
  strong: ({ node: _node, ...props }: MdProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  ul: ({ node: _node, ...props }: MdProps<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90"
      {...props}
    />
  ),
  ol: ({ node: _node, ...props }: MdProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-foreground/90"
      {...props}
    />
  ),
  a: ({ node: _node, ...props }: MdProps<"a">) => (
    <a className="text-primary underline underline-offset-2" {...props} />
  ),
  blockquote: ({ node: _node, ...props }: MdProps<"blockquote">) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-2 border-primary bg-surface/50 py-4 pl-5 pr-4 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  table: ({ node: _node, ...props }: MdProps<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: ({ node: _node, ...props }: MdProps<"thead">) => (
    <thead className="bg-surface/60" {...props} />
  ),
  th: ({ node: _node, ...props }: MdProps<"th">) => (
    <th
      className="border-b border-border px-4 py-3 text-left font-display text-xs uppercase tracking-wide text-foreground"
      {...props}
    />
  ),
  td: ({ node: _node, ...props }: MdProps<"td">) => (
    <td className="border-b border-border px-4 py-3 align-top text-muted-foreground" {...props} />
  ),
  code: ({ node: _node, ...props }: MdProps<"code">) => (
    <code className="rounded bg-surface px-1.5 py-0.5 text-[0.85em] text-primary" {...props} />
  ),
};

const BLOCK_RE = /:::(cta|checklist|compare|stats|bars|timeline)( [^\n]*)?\n([\s\S]*?)\n:::/g;

export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  BLOCK_RE.lastIndex = 0;
  while ((match = BLOCK_RE.exec(content))) {
    const [full, type, inlineArg, body] = match;
    const before = content.slice(cursor, match.index);
    if (before.trim()) {
      nodes.push(
        <ReactMarkdown key={key++} remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {before}
        </ReactMarkdown>,
      );
    }

    if (type === "cta") {
      nodes.push(<InlineCta key={key++} {...parseCtaBlock(body ?? "")} />);
    } else if (type === "checklist") {
      nodes.push(
        <ChecklistGroup
          key={key++}
          label={(inlineArg ?? "").trim()}
          items={parseChecklistBlock(body ?? "")}
        />,
      );
    } else if (type === "compare") {
      nodes.push(<CompareCards key={key++} cards={parseCompareBlock(body ?? "")} />);
    } else if (type === "stats") {
      nodes.push(<StatsRow key={key++} items={parseStatsBlock(body ?? "")} />);
    } else if (type === "bars") {
      nodes.push(
        <BarsChart
          key={key++}
          legend={(inlineArg ?? "").trim()}
          rows={parseBarsBlock(body ?? "")}
        />,
      );
    } else if (type === "timeline") {
      nodes.push(<TimelineList key={key++} items={parseTimelineBlock(body ?? "")} />);
    }

    cursor = match.index + full.length;
  }

  const rest = content.slice(cursor);
  if (rest.trim()) {
    nodes.push(
      <ReactMarkdown key={key++} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {rest}
      </ReactMarkdown>,
    );
  }

  return (
    <div className={`prose-invert${className ? ` ${className}` : ""}`}>
      {nodes.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </div>
  );
}

/** Markdown image that disappears (instead of showing a broken-image icon) if it fails to load. */
function MdImage({
  src,
  alt,
  title,
}: {
  src?: string | undefined;
  alt?: string | undefined;
  title?: string | undefined;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;
  return (
    <figure className="not-prose my-8">
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-2xl border border-border"
      />
      {title ? (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">{title}</figcaption>
      ) : null}
    </figure>
  );
}
