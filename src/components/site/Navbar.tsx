import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Wind, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/site-data";
import { MagneticButton } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";

// "Services" carries a submenu built from the central services list, so every
// inner service page (/services/websites, /services/seo, ...) is one tap/click
// away from any page on the site.
const links = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { scrollY } = useScroll();
  const servicesRef = useRef<HTMLLIElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Close mobile menu + any open submenus whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  // Close the desktop dropdown on outside click / Escape, so it behaves like
  // a normal menu instead of staying open forever on touch devices.
  useEffect(() => {
    if (!desktopServicesOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopServicesOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [desktopServicesOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
          aria-label="Main"
        >
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface">
              <Wind className="h-4.5 w-4.5 text-primary" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-lg bg-primary/15 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              MUXAIR<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) =>
              l.children ? (
                <li key={l.label} ref={servicesRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDesktopServicesOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={desktopServicesOpen}
                    className={cn(
                      "flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
                      (desktopServicesOpen || pathname.startsWith(l.href)) &&
                        "bg-surface text-foreground",
                    )}
                  >
                    {l.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        desktopServicesOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {desktopServicesOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl"
                      >
                        <Link
                          to={l.href}
                          onClick={() => setDesktopServicesOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                        >
                          All Services
                        </Link>
                        <div className="my-1 border-t border-border" />
                        {l.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setDesktopServicesOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            activeProps={{ className: "bg-surface text-foreground" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    activeProps={{ className: "bg-surface text-foreground" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <MagneticButton href="/contact">Get a Free Strategy Call</MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/60 text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-h-[70vh] max-w-7xl flex-col gap-1 overflow-y-auto px-5 py-4">
              {links.map((l, i) =>
                l.children ? (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      {l.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pl-3"
                        >
                          <Link
                            to={l.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                          >
                            All Services
                          </Link>
                          {l.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                              activeProps={{ className: "bg-surface text-foreground" }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                ) : (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                      activeProps={{ className: "bg-surface text-foreground" }}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ),
              )}
              <li className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Get a Free Strategy Call
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
