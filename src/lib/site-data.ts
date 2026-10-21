// Central content used by the services, work and blog list + detail pages.
// Blog and case-study copy is intentionally short placeholder content —
// real long-form content will be authored and pulled in from Sanity.

export type Tone = "cool" | "heat";

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  tone: Tone;
  tagline: string;
  description: string;
  features: string[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceItem[] = [
  {
    slug: "website",
    title: "HVAC Website Design",
    shortTitle: "Website Design",
    tone: "cool",
    tagline: "Fast, mobile-first sites built to turn visitors into booked jobs.",
    description:
      "Fast, mobile-first sites designed specifically for how homeowners and property managers search for and choose an HVAC company, not a recycled template with your logo dropped in.",
    features: [
      "Custom Design for Your Brand",
      "Mobile-First Build",
      "Service-Area Landing Pages",
      "Speed-Optimised Build",
    ],
    faqs: [
      {
        question: "How long does a new website take?",
        answer:
          "Most Foundation sites launch in about 30 days from kickoff. Larger builds like Growth and Complete take 30 to 45 days, and we confirm your exact timeline in your proposal. Timing also depends on how quickly we get your content and approvals back.",
      },
      {
        question: "Will it work on mobile?",
        answer:
          "Every site is built mobile-first, since the majority of HVAC searches happen on a phone.",
      },
      {
        question: "Do you write the content too?",
        answer:
          "Yes. Every package includes copywriting from our in-house HVAC content writer. Foundation covers your core pages, and Growth and Complete cover every page, plus 5 launch blog posts. You review and approve everything before launch.",
      },
    ],
  },
  {
    slug: "seo",
    title: "Local SEO for HVAC",
    shortTitle: "Local SEO",
    tone: "cool",
    tagline: "Own the map pack for every service you offer, in every town you cover.",
    description:
      "Local SEO built specifically around how homeowners and businesses search for HVAC services, not generic SEO advice recycled from a different industry.",
    features: [
      "Google Business Profile Optimisation",
      "Service-Area Landing Pages",
      "Local Citation Building",
      "Technical SEO Audits",
    ],
    faqs: [
      {
        question: "How long until we see rankings improve?",
        answer:
          "Most clients see meaningful movement within 3 to 6 months. We'll give you an honest month-by-month outlook, not a guaranteed timeline nobody can promise.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No agency honestly can. What we guarantee is the work: technical fixes, content, and citations done properly and on schedule.",
      },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads Management",
    shortTitle: "Google Ads",
    tone: "heat",
    tagline: "High-intent search campaigns built around cost-per-booked-job, not clicks.",
    description:
      "We manage Google Ads campaigns built around seasonal demand spikes, service-specific keywords, and most importantly, cost per booked job, not vanity click metrics.",
    features: [
      "Campaigns Built Around Your Services",
      "Call Tracking on Every Campaign",
      "Aggressive Negative Keywords",
      "Seasonal Budget Shifts",
    ],
    faqs: [
      {
        question: "What's a typical starting budget?",
        answer:
          "Our Google Ads management starts at $400/mo, plus your ad spend, which you pay directly to Google. How much ad spend makes sense varies by market and competition, so we'll give you a realistic number on the strategy call once we know your service area.",
      },
      {
        question: "Do you charge a management fee on top of ad spend?",
        answer:
          "Yes. Our management fee starts at $400/mo and is separate from your ad spend, which you pay directly to Google. This is standard across the industry, and we're upfront about it before you commit to anything.",
      },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads (Facebook & Instagram)",
    shortTitle: "Meta Ads",
    tone: "heat",
    tagline: "Get seen before homeowners even know they need you.",
    description:
      "Targeted Facebook and Instagram campaigns that put your HVAC business in front of homeowners and property managers in your area, before they've typed a single word into Google.",
    features: [
      "Search-Intent-Led Campaigns",
      "Custom Creative for Your Brand",
      "Retargeting Visitors Who Didn't Call",
      "Lookalike Audiences",
    ],
    faqs: [
      {
        question: "Does Meta advertising work for HVAC?",
        answer:
          "Yes, but it plays a different role than Google Ads. Meta builds awareness before someone is actively searching, and keeps you in front of people who already visited your site. It pairs well with search ads rather than replacing them.",
      },
    ],
  },
  {
    slug: "maintenance",
    title: "Website Care & Maintenance",
    shortTitle: "Maintenance",
    tone: "cool",
    tagline: "Ongoing updates, monitoring, and support so your site never lets you down.",
    description:
      "A website is never really \u201cdone,\u201d ongoing updates, monitoring, and support so it keeps working for you long after launch, instead of quietly degrading.",
    features: [
      "Uptime & Security Monitoring",
      "Regular Backups",
      "Core Web Vitals Monitoring",
      "Software & Plugin Updates",
    ],
    faqs: [
      {
        question: "Is maintenance required after you build my site?",
        answer:
          "Not required, but recommended. Most sites that skip maintenance see slow performance and security issues creep in within a year.",
      },
    ],
  },
];

export type WorkService = "website" | "seo" | "google-ads" | "meta-ads" | "maintenance";

export const workServiceLabels: Record<WorkService, string> = {
  website: "Website Design",
  seo: "Local SEO",
  "google-ads": "Google Ads",
  "meta-ads": "Meta Ads",
  maintenance: "Website Maintenance",
};

export interface WorkItem {
  slug: string;
  name: string;
  tone: Tone;
  location: string;
  services: WorkService[];
  badge: string;
  category?: string;
  result?: string;
  summary?: string;
  metrics?: { label: string; value: string }[];
  challenge?: string;
  approach?: string[];
  outcome?: string;
}

// NOTE: /work now loads live data from the Supabase `case_studies` table
// (see src/lib/supabase.ts → WorkItemRow). This array is no longer read by
// any route — it's kept only as seed/reference data matching the shape and
// content of the work-page blueprint, in case the table needs re-seeding.
export const workItems: WorkItem[] = [
  {
    slug: "midlands-hvac-co",
    name: "Midlands HVAC Co.",
    tone: "cool",
    location: "Birmingham, West Midlands",
    services: ["website", "seo"],
    badge: "+300% enquiries",
    category: "Residential heating & cooling",
    result: "300% increase in organic enquiries",
    summary:
      "A full website rebuild and local SEO campaign for a residential heating and cooling company covering the Midlands.",
    metrics: [
      { label: "Organic enquiries", value: "+300%" },
      { label: "Timeframe", value: "6 months" },
      { label: "Service towns targeted", value: "14" },
    ],
    challenge:
      "Midlands HVAC Co. had an outdated site that didn't work on mobile and ranked nowhere for their core service towns.",
    approach: [
      "Rebuilt the site mobile-first with service-area landing pages for all 14 towns covered",
      "Ran a technical SEO audit and fixed Core Web Vitals issues holding the old site back",
      "Set up call tracking so the team could see exactly which pages generated enquiries",
    ],
    outcome:
      "Within six months, organic enquiries were up 300% and the business ranked on page one for its highest-value service terms.",
  },
  {
    slug: "yorkshire-boiler-specialists",
    name: "Yorkshire Boiler Specialists",
    tone: "heat",
    location: "Leeds, Yorkshire",
    services: ["seo"],
    badge: "Page 1 in 4mo",
    category: "Boiler installation & repair",
    result: "First page Google in 4 months",
    summary:
      "A local SEO and content strategy that took a boiler specialist from page three to page one for their core repair and install terms.",
    metrics: [
      { label: "Time to page one", value: "4 months" },
      { label: "Keywords ranked", value: "60+" },
      { label: "Google Business calls", value: "+180%" },
    ],
    challenge:
      "The business had strong reviews but almost no visibility online — most jobs came from word of mouth alone.",
    approach: [
      "Optimized and actively managed their Google Business Profile",
      "Built out fixed-price boiler installation pages with clear survey booking CTAs",
      "Ran a local citation clean-up to fix inconsistent business listings",
    ],
    outcome:
      "The business now ranks on page one for its core boiler repair and installation terms, with Google Business calls up 180%.",
  },
  {
    slug: "london-ac-installer",
    name: "London AC Installer",
    tone: "cool",
    location: "London",
    services: ["website", "google-ads"],
    badge: "40 quotes/30d",
    category: "Commercial & residential AC",
    result: "40 quote requests in 30 days",
    summary:
      "A new website paired with a Google Ads launch to generate commercial and residential AC quote requests fast in a competitive market.",
    metrics: [
      { label: "Quote requests", value: "40 in 30 days" },
      { label: "Cost per lead", value: "-35%" },
      { label: "Launch to first lead", value: "9 days" },
    ],
    challenge:
      "A newer installer needed to generate quote volume quickly in one of the most competitive HVAC markets in the country.",
    approach: [
      "Designed a site with a fast inline quote request form on every service page",
      "Launched Google Ads campaigns split by commercial vs. residential intent",
      "Built dedicated landing pages matched to each ad group to lift Quality Score",
    ],
    outcome:
      "40 quote requests landed in the first 30 days of the campaign, at a cost per lead 35% below the client's previous agency.",
  },
  {
    slug: "home-counties-heating",
    name: "Home Counties Heating",
    tone: "heat",
    location: "St Albans, Home Counties",
    services: ["website", "meta-ads"],
    badge: "+284% calls",
  },
  {
    slug: "coastal-cooling",
    name: "Coastal Cooling Ltd.",
    tone: "cool",
    location: "Brighton, South Coast",
    services: ["website"],
    badge: "4% → 19% booking rate",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hvac-website-must-haves",
    title: "7 Things Every HVAC Website Needs to Book More Jobs",
    excerpt:
      "From click-to-call placement to service-area pages, here's what separates HVAC websites that convert from ones that just sit there.",
    category: "Website Design",
    date: "2026-02-10",
    readTime: "6 min read",
  },
  {
    slug: "local-seo-checklist-for-hvac-companies",
    title: "The Local SEO Checklist Every HVAC Company Should Run Through",
    excerpt:
      "A practical, no-fluff checklist for showing up in the map pack for the boiler repair and AC install terms that actually bring in jobs.",
    category: "SEO",
    date: "2026-01-22",
    readTime: "8 min read",
  },
  {
    slug: "google-ads-budget-for-hvac",
    title: "How Much Should an HVAC Company Spend on Google Ads?",
    excerpt:
      "A breakdown of how to think about Google Ads budget by service area, season and cost-per-booked-job rather than cost-per-click.",
    category: "Paid Ads",
    date: "2026-01-05",
    readTime: "5 min read",
  },
];

export const SITE_URL = "https://muxair.com";