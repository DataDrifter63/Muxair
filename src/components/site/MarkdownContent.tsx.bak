import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./primitives";

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

const markdownComponents = {
  h2: (props: any) => (
    <h2 className="mt-11 font-display text-2xl leading-snug text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 text-lg font-semibold leading-snug text-foreground" {...props} />
  ),
  p: (props: any) => <p className="mt-5 text-base leading-relaxed text-foreground/90" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
  ul: (props: any) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-foreground/90"
      {...props}
    />
  ),
  a: (props: any) => <a className="text-primary underline underline-offset-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-2 border-primary bg-surface/50 py-4 pl-5 pr-4 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-surface/60" {...props} />,
  th: (props: any) => (
    <th
      className="border-b border-border px-4 py-3 text-left font-display text-xs uppercase tracking-wide text-foreground"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border-b border-border px-4 py-3 align-top text-muted-foreground" {...props} />
  ),
  code: (props: any) => (
    <code className="rounded bg-surface px-1.5 py-0.5 text-[0.85em] text-primary" {...props} />
  ),
};

const BLOCK_RE = /:::(cta|checklist|compare)( [^\n]*)?\n([\s\S]*?)\n:::/g;

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
