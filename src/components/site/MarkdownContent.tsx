import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./primitives";

/**
 * Renders blog post content written in Markdown, with one custom extension:
 *
 *   :::cta
 *   title: Want an exact number for your business?
 *   text: Book a free call and we'll give you a straight quote.
 *   button: Get a Free Strategy Call
 *   href: /contact
 *   :::
 *
 * ...renders as an inline CTA card using the site's real MagneticButton,
 * so it always matches the rest of the site's buttons.
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
    <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-foreground/90" {...props} />
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
    <th className="border-b border-border px-4 py-3 text-left font-display text-xs uppercase tracking-wide text-foreground" {...props} />
  ),
  td: (props: any) => (
    <td className="border-b border-border px-4 py-3 align-top text-muted-foreground" {...props} />
  ),
  code: (props: any) => (
    <code className="rounded bg-surface px-1.5 py-0.5 text-[0.85em] text-primary" {...props} />
  ),
};

export function MarkdownContent({ content }: { content: string }) {
  // Split the raw markdown on :::cta ... ::: blocks, rendering markdown
  // segments through ReactMarkdown and cta segments as InlineCta cards.
  const parts = content.split(/:::cta\n([\s\S]*?)\n:::/g);

  return (
    <div className="prose-invert">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <InlineCta key={i} {...parseCtaBlock(part)} />
        ) : part.trim() ? (
          <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {part}
          </ReactMarkdown>
        ) : null,
      )}
    </div>
  );
}
