/**
 * Cookie consent: stores the visitor's choice and only loads analytics / advertising
 * scripts after they accept. Essential cookies are always on.
 *
 * To turn the trackers on, set these env vars at build time (leave empty to load nothing):
 *   VITE_GA_MEASUREMENT_ID   e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   VITE_META_PIXEL_ID       e.g. 123456789012345 (Meta Pixel)
 */
export interface CookieConsent {
  analytics: boolean;
  advertising: boolean;
  /** Version of the choice screen, so we can ask again if the categories ever change. */
  v: 1;
}

const KEY = "muxair_cookie_consent";
export const CONSENT_EVENT = "muxair:cookie-consent";
export const OPEN_SETTINGS_EVENT = "muxair:open-cookie-settings";

export function getConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (parsed.v !== 1) return null;
    return { analytics: !!parsed.analytics, advertising: !!parsed.advertising, v: 1 };
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; advertising: boolean }): void {
  const value: CookieConsent = { ...choice, v: 1 };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: the choice only lasts for this visit */
  }
  applyConsent(value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Lets any link or button (e.g. in the footer) re-open the cookie settings panel. */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

const GA_ID = (import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined)?.trim();
const PIXEL_ID = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined)?.trim();

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
  _fbq?: unknown;
  [k: string]: unknown;
};

function addScript(src: string, id: string): void {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Loads (or switches off) the trackers to match the visitor's choice. */
export function applyConsent(c: CookieConsent | null): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Win;

  if (GA_ID) {
    if (c?.analytics) {
      w[`ga-disable-${GA_ID}`] = false;
      if (!w.gtag) {
        w.dataLayer = w.dataLayer ?? [];
        // gtag.js only understands an `arguments` object in the dataLayer, NOT a plain
        // array (rest params), so this must stay a classic `function` using `arguments`.
        w.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          (w.dataLayer as unknown[]).push(arguments);
        };
        w.gtag("js", new Date());
        addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, "ga4-script");
        w.gtag("config", GA_ID, { anonymize_ip: true });
      }
    } else {
      w[`ga-disable-${GA_ID}`] = true;
    }
  }

  if (PIXEL_ID && c?.advertising && !w.fbq) {
    const queue: unknown[] = [];
    const fbq = function fbq(...args: unknown[]) {
      queue.push(args);
    } as unknown as NonNullable<Win["fbq"]>;
    fbq.queue = queue;
    fbq.loaded = true;
    w.fbq = fbq;
    addScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }
}
