import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const LINKS = [
  {
    to: "/services/website",
    label: "HVAC Website Design",
    blurb: "Custom, mobile-first sites built to book jobs.",
  },
  {
    to: "/services/seo",
    label: "Local SEO for HVAC",
    blurb: "Get found on Google Maps and local search.",
  },
  {
    to: "/services/google-ads",
    label: "Google Ads Management",
    blurb: "Seasonal campaigns focused on booked jobs.",
  },
  { to: "/pricing", label: "Pricing", blurb: "Transparent packages, no hidden fees." },
  { to: "/work", label: "Case Studies", blurb: "Results we've delivered for HVAC companies." },
  {
    to: "/blog",
    label: "HVAC Marketing Blog",
    blurb: "Practical tips for heating and cooling owners.",
  },
] as const;

/** Contextual internal links — shown on pages that otherwise link out only via nav/footer. */
export function RelatedLinks({ exclude }: { exclude?: string }) {
  const items = LINKS.filter((l) => l.to !== exclude);
  return (
    <section aria-label="Explore more" className="py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="font-display text-2xl">Explore more</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group block rounded-2xl border border-border p-5 transition-colors hover:border-primary"
              >
                <span className="flex items-center justify-between font-semibold">
                  {l.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{l.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
