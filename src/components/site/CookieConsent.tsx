import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Cookie, X } from "lucide-react";
import { OPEN_SETTINGS_EVENT, applyConsent, getConsent, saveConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 flex-none rounded-full border transition-colors",
        checked ? "border-primary bg-primary" : "border-border bg-surface",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-all",
          checked ? "left-[1.35rem]" : "left-0.5 bg-muted-foreground",
        )}
      />
    </button>
  );
}

/** Cookie banner + settings panel. Re-opens from the footer's "Cookie Settings" link. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      setAnalytics(existing.analytics);
      setAdvertising(existing.advertising);
      applyConsent(existing);
    } else {
      const t = window.setTimeout(() => setOpen(true), 900);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const onOpen = () => {
      const c = getConsent();
      setAnalytics(!!c?.analytics);
      setAdvertising(!!c?.advertising);
      setCustomising(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const decide = (a: boolean, ad: boolean) => {
    setAnalytics(a);
    setAdvertising(ad);
    saveConsent({ analytics: a, advertising: ad });
    setOpen(false);
    setCustomising(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[24rem]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background/95 p-5 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-[60px]"
              aria-hidden
            />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-heat/30 bg-heat/10 text-heat">
                <Cookie className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base leading-tight">We value your privacy</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  Essential cookies keep the site working. With your OK we also use analytics and
                  advertising cookies to improve the site and measure our ads.{" "}
                  <Link to="/privacy-policy" className="font-medium text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
              {getConsent() ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setCustomising(false);
                  }}
                  aria-label="Close cookie settings"
                  className="-mr-1 -mt-1 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {customising ? (
              <ul className="relative mt-4 space-y-3 border-t border-border pt-4">
                <li className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">Essential</p>
                    <p className="text-xs text-muted-foreground">Always on. Needed for the site.</p>
                  </div>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Always on
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">Analytics</p>
                    <p className="text-xs text-muted-foreground">
                      Google Analytics: how the site is used.
                    </p>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
                </li>
                <li className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">Advertising</p>
                    <p className="text-xs text-muted-foreground">
                      Meta Pixel and Google Ads: measuring our ads.
                    </p>
                  </div>
                  <Toggle
                    checked={advertising}
                    onChange={setAdvertising}
                    label="Advertising cookies"
                  />
                </li>
              </ul>
            ) : null}

            <div className="relative mt-4 grid grid-cols-2 gap-2">
              {customising ? (
                <>
                  <button
                    type="button"
                    onClick={() => decide(analytics, advertising)}
                    className="rounded-full border border-border bg-surface/60 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
                  >
                    Save choices
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(true, true)}
                    className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Accept all
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => decide(false, false)}
                    className="rounded-full border border-border bg-surface/60 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
                  >
                    Reject non-essential
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(true, true)}
                    className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomising(true)}
                    className="col-span-2 text-center text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    Customise settings
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
