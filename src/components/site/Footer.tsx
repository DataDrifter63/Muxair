import { Link } from "@tanstack/react-router";
import { openCookieSettings } from "@/lib/cookie-consent";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import logoLight from "@/assets/logo-black.webp";
import logoDark from "@/assets/logo-white.webp";

const pageLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Website Design", to: "/services/website" },
  { label: "Local SEO", to: "/services/seo" },
  { label: "Google Ads", to: "/services/google-ads" },
  { label: "Meta Ads", to: "/services/meta-ads" },
  { label: "Maintenance", to: "/services/maintenance" },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/muxair.hvac" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/muxair.hvac" },
];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand — 40% (centered on mobile, left on desktop) */}
          <div className="col-span-2 flex flex-col items-center text-center md:col-span-1 md:items-start md:text-left">
            <Link to="/" className="flex items-center">
              <img
                src={logoLight}
                alt="Muxair"
                width={320}
                height={84}
                className="h-9 w-auto dark:hidden"
              />
              <img
                src={logoDark}
                alt="Muxair"
                width={320}
                height={84}
                className="hidden h-9 w-auto dark:block"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Built exclusively for HVAC companies. Websites and marketing systems that book more
              jobs.
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
            <ul className="mt-4 space-y-1">
              {pageLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="inline-block py-1.5 sm:py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <ul className="mt-4 space-y-1">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="inline-block py-1.5 sm:py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — 20% (full row under the two link columns on mobile) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contact
            </h3>
            <p className="mt-2 text-xs text-muted-foreground/80 md:hidden">
              We respond within 1-2 business days
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground md:mt-5">
              <li>
                <a
                  href="mailto:hello@muxair.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  hello@muxair.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+447806982999"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  +44 7806 982999
                </a>
              </li>
              <li className="hidden text-xs text-muted-foreground/80 md:list-item">
                We respond within 1-2 business days
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

        <div className="mt-12 flex flex-col items-center gap-1 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:mt-14 sm:flex-row sm:justify-between sm:gap-3 sm:pt-7 sm:text-left">
          <p className="order-2 sm:order-1">© 2026 Muxair</p>
          <ul className="order-1 flex flex-wrap items-center justify-center gap-x-5 sm:order-2">
            <li>
              <Link
                to="/privacy-policy"
                className="inline-block py-2 transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="inline-block py-2 transition-colors hover:text-primary">
                Terms
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openCookieSettings}
                className="inline-block py-2 transition-colors hover:text-primary"
              >
                Cookie Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
