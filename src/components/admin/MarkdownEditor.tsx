import { lazy, Suspense, useRef, useState } from "react";
import {
  Bold,
  Code,
  Columns2,
  Eye,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListChecks,
  Loader2,
  Megaphone,
  Pencil,
  Quote,
} from "lucide-react";
// The preview renderer is large, so it only loads when "Preview" is opened.
const MarkdownContent = lazy(() =>
  import("@/components/site/MarkdownContent").then((m) => ({ default: m.MarkdownContent })),
);
import { cn } from "@/lib/utils";
import { optimiseCloudinaryUrl, uploadImage } from "@/lib/cloudinary";

/**
 * A small, dependency-light Markdown editor: a plain textarea with a
 * formatting toolbar and a live-preview toggle.
 *
 * Replaces @uiw/react-md-editor, which touches the DOM at import time and
 * risked crashing on load in this SSR (TanStack Start) setup — that crash
 * is what made "New Post" unreliable. A plain textarea has no such risk and
 * needs no client-only mount guard.
 *
 * The three "block" buttons (CTA / Checklist / Compare) insert the custom
 * :::cta / :::checklist / :::compare syntax that MarkdownContent (used on
 * the public blog page) knows how to render — see that file for the full
 * syntax reference. Preview mode below renders through the same
 * MarkdownContent component the live site uses, so what you see here is
 * what visitors will actually see.
 */

type ToolbarAction =
  | { icon: typeof Bold; label: string; wrap: string; wrapEnd?: string }
  | { icon: typeof Bold; label: string; prefix: string }
  | { icon: typeof Bold; label: string; insert: string; selectText: string };

const textActions: ToolbarAction[] = [
  { icon: Bold, label: "Bold", wrap: "**" },
  { icon: Italic, label: "Italic", wrap: "_" },
  { icon: Heading2, label: "Heading", prefix: "## " },
  { icon: List, label: "List item", prefix: "- " },
  { icon: Quote, label: "Quote", prefix: "> " },
  { icon: Code, label: "Code", wrap: "`" },
  { icon: Link2, label: "Link", wrap: "[", wrapEnd: "](https://)" },
];

const blockActions: ToolbarAction[] = [
  {
    icon: Megaphone,
    label: "Insert CTA card",
    selectText: "Your headline",
    insert: `:::cta
title: Your headline
text: A sentence or two of supporting copy.
button: Get a Free Strategy Call
href: /contact
:::`,
  },
  {
    icon: ListChecks,
    label: "Insert checklist",
    selectText: "Group Name",
    insert: `:::checklist Group Name
01 | Item title | Item description
02 | Item title | Item description
:::`,
  },
  {
    icon: Columns2,
    label: "Insert comparison cards",
    selectText: "Card 1 Title",
    insert: `:::compare
Card 1 Title:
- point 1
- point 2

Card 2 Title:
- point 1
- point 2
:::`,
  },
];

export function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [pending, setPending] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // Uploads finish asynchronously, so they must edit the *latest* text, not the
  // `value` captured when the upload started.
  const valueRef = useRef(value);
  valueRef.current = value;

  function setText(next: string) {
    valueRef.current = next;
    onChange(next);
  }

  function insertAtCursor(text: string) {
    const el = textareaRef.current;
    const cur = valueRef.current;
    const start = el?.selectionStart ?? cur.length;
    const end = el?.selectionEnd ?? start;
    const lead = start > 0 && cur[start - 1] !== "\n" ? "\n\n" : "";
    setText(cur.slice(0, start) + lead + text + "\n\n" + cur.slice(end));
  }

  // Uploads each image to Cloudinary and drops a Markdown image at the cursor.
  // A temporary "Uploading..." placeholder is inserted straight away and swapped
  // for the real link when the upload finishes (or removed if it fails).
  async function uploadFiles(files: File[]) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) {
      setUploadError("Only image files can be uploaded here.");
      return;
    }
    setUploadError(null);

    for (const file of images) {
      const alt =
        file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/[[\]()]/g, "")
          .trim() || "Image";
      const id = Math.random().toString(36).slice(2, 8);
      const placeholder = `![Uploading ${alt}...](uploading-${id})`;

      insertAtCursor(placeholder);
      setPending((n) => n + 1);
      try {
        const url = await uploadImage(file);
        const finalMarkdown = `![${alt}](${optimiseCloudinaryUrl(url)})`;
        setText(valueRef.current.replace(placeholder, () => finalMarkdown));
      } catch (err) {
        setText(valueRef.current.replace(`${placeholder}\n\n`, "").replace(placeholder, ""));
        setUploadError(err instanceof Error ? err.message : "Image upload failed");
      } finally {
        setPending((n) => n - 1);
      }
    }
  }

  function applyAction(action: ToolbarAction) {
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
      const after = "wrapEnd" in action ? (action.wrapEnd ?? action.wrap) : action.wrap;
      next = value.slice(0, start) + before + selected + after + value.slice(end);
      cursorStart = start + before.length;
      cursorEnd = cursorStart + selected.length;
    } else if ("prefix" in action) {
      next = value.slice(0, start) + action.prefix + selected + value.slice(end);
      cursorStart = cursorEnd = start + action.prefix.length + selected.length;
    } else {
      // Block insert — pad with blank lines so it doesn't run into
      // whatever's above/below, then select the first placeholder inside
      // the template so typing immediately replaces it.
      const needsLeadingBlank = start > 0 && value[start - 1] !== "\n";
      const before = (needsLeadingBlank ? "\n\n" : "") + action.insert + "\n\n";
      next = value.slice(0, start) + before + value.slice(end);

      const insertOffset = start + (needsLeadingBlank ? 2 : 0);
      const placeholderIndex = action.insert.indexOf(action.selectText);
      cursorStart = insertOffset + placeholderIndex;
      cursorEnd = cursorStart + action.selectText.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 border-b border-border bg-surface/60 px-2 py-1.5">
        <div className="flex flex-wrap items-center gap-0.5">
          {textActions.map((action) => (
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

          <button
            type="button"
            title="Upload image (or paste / drag & drop into the editor)"
            onClick={() => fileInputRef.current?.click()}
            disabled={mode === "preview"}
            className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-surface hover:text-foreground disabled:opacity-40"
          >
            {pending > 0 ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              if (files.length) void uploadFiles(files);
            }}
          />

          <span className="mx-1 h-4 w-px bg-border" aria-hidden />

          {blockActions.map((action) => (
            <button
              key={action.label}
              type="button"
              title={action.label}
              onClick={() => applyAction(action)}
              disabled={mode === "preview"}
              className="flex h-7 w-7 items-center justify-center rounded text-primary transition-colors hover:bg-primary/10 disabled:opacity-40"
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
          onPaste={(e) => {
            const files = Array.from(e.clipboardData.files).filter((f) =>
              f.type.startsWith("image/"),
            );
            if (!files.length) return;
            e.preventDefault();
            void uploadFiles(files);
          }}
          onDragOver={(e) => {
            if (!Array.from(e.dataTransfer.types).includes("Files")) return;
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            setDragging(false);
            const files = Array.from(e.dataTransfer.files);
            if (!files.length) return;
            e.preventDefault();
            void uploadFiles(files);
          }}
          className={cn(
            "w-full resize-y bg-background px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground",
            dragging && "ring-2 ring-inset ring-primary/60",
          )}
        />
      ) : (
        <div className="bg-background px-4 py-3">
          {value.trim() ? (
            <Suspense fallback={<p className="text-sm text-muted-foreground">Loading preview…</p>}>
              <MarkdownContent content={value} />
            </Suspense>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
          )}
        </div>
      )}

      {pending > 0 || uploadError || mode === "write" ? (
        <div className="border-t border-border bg-surface/40 px-3 py-1.5 text-xs">
          {pending > 0 ? (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Uploading {pending} image{pending > 1 ? "s" : ""} to Cloudinary...
            </span>
          ) : uploadError ? (
            <span className="text-destructive">{uploadError}</span>
          ) : (
            <span className="text-muted-foreground">
              Tip: click the image button, paste a screenshot, or drag &amp; drop images into the
              editor, they upload to Cloudinary and the link is added automatically.
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}
