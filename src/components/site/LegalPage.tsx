import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cookie } from "lucide-react";
import { Reveal } from "./primitives";
import { openCookieSettings } from "@/lib/cookie-consent";
import { slugifyHeading } from "@/lib/markdown-headings";
import type { LegalDoc } from "@/lib/legal-content";

/** Turns the email address and the ICO site in the text into real links. */
function linkify(text: string): ReactNode {
  const parts = text.split(/(hello@muxair\.com|ico\.org\.uk)/g);
  return parts.map((part, i) => {
    if (part === "hello@muxair.com") {
      return (
        <a
          key={i}
          href="mailto:hello@muxair.com"
          className="font-medium text-primary hover:underline"
        >
          {part}
        </a>
      );
    }
    if (part === "ico.org.uk") {
      return (
        <a
          key={i}
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function LegalPage({
  doc,
  eyebrow,
  other,
  showCookieSettings = false,
}: {
  doc: LegalDoc;
  eyebrow: string;
  other: { to: "/privacy-policy" | "/terms"; label: string };
  showCookieSettings?: boolean;
}) {
  return (
    <main className="relative overflow-hidden pb-24 pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-tech opacity-30 [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {doc.updated}</p>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {doc.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border bg-surface/30 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                On this page
              </p>
              <ul className="mt-3 space-y-0.5 border-l border-border">
                {doc.sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slugifyHeading(s.heading)}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[13px] leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md sm:p-10">
              <div className="space-y-10">
                {doc.sections.map((s) => (
                  <section key={s.heading} id={slugifyHeading(s.heading)} className="scroll-mt-28">
                    <h2 className="font-display text-xl sm:text-2xl">{s.heading}</h2>
                    <div className="mt-3 space-y-4">
                      {s.blocks.map((b, i) =>
                        "p" in b ? (
                          <p key={i} className="leading-relaxed text-muted-foreground">
                            {linkify(b.p)}
                          </p>
                        ) : (
                          <ul key={i} className="space-y-2.5">
                            {b.ul.map((li) => (
                              <li
                                key={li}
                                className="flex items-start gap-3 leading-relaxed text-muted-foreground"
                              >
                                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                                <span>{linkify(li)}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                      {showCookieSettings && s.heading.endsWith("Cookies") ? (
                        <button
                          type="button"
                          onClick={openCookieSettings}
                          className="inline-flex items-center gap-2 rounded-full border border-heat/40 bg-heat/10 px-4 py-2 text-sm font-semibold text-heat transition-colors hover:bg-heat/20"
                        >
                          <Cookie className="h-4 w-4" />
                          Open cookie settings
                        </button>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/30 p-6 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                Questions? Email{" "}
                <a
                  href="mailto:hello@muxair.com"
                  className="font-medium text-primary hover:underline"
                >
                  hello@muxair.com
                </a>
                .
              </p>
              <Link
                to={other.to}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                {other.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
