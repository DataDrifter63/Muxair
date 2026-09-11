import { useRef, useState } from "react";
import { Bold, Code, Eye, Heading2, Italic, Link2, List, Pencil, Quote } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * A small, dependency-light Markdown editor: a plain textarea with a
 * formatting toolbar and a live-preview toggle.
 *
 * Replaces @uiw/react-md-editor, which touches the DOM at import time and
 * risked crashing on load in this SSR (TanStack Start) setup — that crash
 * is what made "New Post" unreliable. A plain textarea has no such risk and
 * needs no client-only mount guard.
 */

const toolbarActions = [
  { icon: Bold, label: "Bold", wrap: "**" },
  { icon: Italic, label: "Italic", wrap: "_" },
  { icon: Heading2, label: "Heading", prefix: "## " },
  { icon: List, label: "List item", prefix: "- " },
  { icon: Quote, label: "Quote", prefix: "> " },
  { icon: Code, label: "Code", wrap: "`" },
  { icon: Link2, label: "Link", wrap: "[", wrapEnd: "](https://)" },
] as const;

export function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");

  function applyAction(action: (typeof toolbarActions)[number]) {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);

    let next: string;
    let cursorStart: number;
    let cursorEnd: number;

    if ("wrap" in action) {
      const before = action.wrap;
      const after = "wrapEnd" in action ? action.wrapEnd : action.wrap;
      next = value.slice(0, start) + before + selected + after + value.slice(end);
      cursorStart = start + before.length;
      cursorEnd = cursorStart + selected.length;
    } else {
      next = value.slice(0, start) + action.prefix + selected + value.slice(end);
      cursorStart = cursorEnd = start + action.prefix.length + selected.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-2 py-1.5">
        <div className="flex items-center gap-0.5">
          {toolbarActions.map((action) => (
            <button
              key={action.label}
              type="button"
              title={action.label}
              onClick={() => applyAction(action)}
              disabled={mode === "preview"}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-surface hover:text-foreground disabled:opacity-40"
            >
              <action.icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-md bg-background/60 p-0.5">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
              mode === "write" ? "bg-surface text-foreground" : "text-muted-foreground",
            )}
          >
            <Pencil className="h-3 w-3" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
              mode === "preview" ? "bg-surface text-foreground" : "text-muted-foreground",
            )}
          >
            <Eye className="h-3 w-3" />
            Preview
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={16}
          placeholder="Write your post in Markdown..."
          className="w-full resize-y bg-background px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      ) : (
        <div className="prose prose-invert max-w-none bg-background px-4 py-3 text-sm">
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
