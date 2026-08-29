import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone, Wind } from "lucide-react";

const pageLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Website Design", to: "/services/websites" },
  { label: "Local SEO", to: "/services/seo" },
  { label: "Google Ads", to: "/services/google-ads" },
  { label: "Meta Ads", to: "/services/meta-ads" },
  { label: "Maintenance", to: "/services/maintenance" },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand — 40% */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface">
                <Wind className="h-4.5 w-4.5 text-primary" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-extrabold">
                Ductwork<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Built exclusively for HVAC companies. Websites and marketing systems that book
              more jobs.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-heat/30 bg-heat/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-heat">
              <span className="h-1.5 w-1.5 rounded-full bg-heat" />
              Built for HVAC only
            </p>
          </div>

          {/* Pages — 20% */}
          <nav aria-label="Pages">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {pageLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services — 20% */}
          <nav aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — 20% */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@ductworkstudio.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  hello@ductworkstudio.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  +44 20 1234 5678
                </a>
              </li>
              <li className="text-xs text-muted-foreground/80">
                We respond within 1 business day
              </li>
            </ul>

            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Ductwork Studio Ltd &middot; Company No. 00000000 &middot; Registered in England &amp;
            Wales
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link to="/privacy-policy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-primary">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
