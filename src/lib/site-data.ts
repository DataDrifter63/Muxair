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
    slug: "websites",
    title: "HVAC Website Design",
    shortTitle: "Websites",
    tone: "cool",
    tagline: "Fast, mobile-first sites built to turn visitors into booked jobs.",
    description:
      "Your website is the first impression most homeowners get of your business. We design and build fast, mobile-first sites engineered around quote forms, service-area pages and emergency call-outs — not generic templates.",
    features: [
      "Custom design for your brand, not a recycled template",
      "Mobile-first build tested for one-thumb navigation",
      "Service-area landing pages that target every town you cover",
      "Speed-optimized for Core Web Vitals and fast 3G load times",
      "Built-in quote forms, click-to-call and booking widgets",
      "Analytics and call tracking wired up from day one",
    ],
    faqs: [
      {
        question: "How long does a new website take?",
        answer:
          "Most HVAC websites are designed, built and launched within 30 days, following the process outlined on our Process page.",
      },
      {
        question: "Will it work on mobile?",
        answer:
          "Yes — every site is designed mobile-first, since most emergency HVAC searches happen on a phone.",
      },
      {
        question: "Do you write the content too?",
        answer:
          "We can. We handle copywriting for every page, written specifically around how homeowners search for heating and cooling help.",
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
      "We run local SEO campaigns built specifically around HVAC search behaviour — seasonal demand, service-area targeting and the exact phrases homeowners use when their furnace dies at 11pm.",
    features: [
      "Google Business Profile optimization and review strategy",
      "Service-area and service-specific landing pages",
      "Local citation building and NAP consistency clean-up",
      "Technical SEO audits and Core Web Vitals fixes",
      "Seasonal content calendar built around your demand curve",
      "Monthly ranking and traffic reporting",
    ],
    faqs: [
      {
        question: "How long until we see rankings improve?",
        answer:
          "Most clients see movement in local pack rankings within 3–4 months, with compounding gains after that as authority builds.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No agency can honestly guarantee a #1 ranking — we're transparent about that. What we do guarantee is a documented, HVAC-specific strategy and monthly reporting on progress.",
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
      "We manage Google Ads campaigns built around seasonal demand spikes, service-specific keywords and — most importantly — cost per booked job, not vanity click metrics.",
    features: [
      "Campaign structure built around your services and service areas",
      "Call tracking so you know exactly which ads book jobs",
      "Negative keyword lists to cut wasted spend fast",
      "Seasonal budget shifts around heating and cooling peaks",
      "Landing pages matched to each ad group",
      "Transparent monthly spend and performance reporting",
    ],
    faqs: [
      {
        question: "What's a typical starting budget?",
        answer:
          "It depends on your market size, but most HVAC companies start seeing a solid lead flow from a few thousand pounds a month in ad spend — we'll recommend a number based on your service areas during the strategy call.",
      },
      {
        question: "Do you charge a management fee on top of ad spend?",
        answer:
          "Yes, a flat management fee separate from your ad budget — full pricing is on the Pricing page.",
      },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads (Facebook & Instagram)",
    shortTitle: "Meta Ads",
    tone: "heat",
    tagline: "Offer-led creative that fills quiet months with installs and service plans.",
    description:
      "Search ads capture demand — Meta ads create it. We build offer-led Facebook and Instagram campaigns to fill your quiet months with installs, maintenance plans and system upgrades.",
    features: [
      "Seasonal offer campaigns (tune-ups, financing, upgrades)",
      "Custom creative built around your brand and service area",
      "Retargeting for people who visited your site but didn't call",
      "Lookalike audiences based on your best existing customers",
      "Lead-form ads for low-friction quote requests",
      "Monthly performance reporting tied to booked jobs",
    ],
    faqs: [
      {
        question: "Does Meta advertising work for HVAC?",
        answer:
          "It works best for demand generation — maintenance plans, financing offers and system upgrades — rather than emergency repair, where search intent is stronger.",
      },
    ],
  },
  {
    slug: "maintenance",
    title: "Website Care & Maintenance",
    shortTitle: "Maintenance",
    tone: "cool",
    tagline: "Ongoing updates, monitoring and support so your site stays fast and secure.",
    description:
      "A website is never really 'done.' We handle ongoing updates, uptime and security monitoring, seasonal content refreshes and small edits, so your site keeps performing after launch.",
    features: [
      "Uptime and security monitoring",
      "Regular backups and update management",
      "Core Web Vitals monitoring",
      "Seasonal content and offer updates",
      "Small design and copy edits included",
      "Priority support response times",
    ],
    faqs: [
      {
        question: "Is maintenance required after you build my site?",
        answer:
          "It's optional, but recommended — most clients keep it so their site stays fast, secure and current without hiring an in-house webmaster.",
      },
    ],
  },
];

export interface WorkItem {
  slug: string;
  name: string;
  tone: Tone;
  category: string;
  result: string;
  summary: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
}

export const workItems: WorkItem[] = [
  {
    slug: "midlands-hvac-co",
    name: "Midlands HVAC Co.",
    tone: "cool",
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

export const SITE_URL = "https://www.ductworkstudio.com";
