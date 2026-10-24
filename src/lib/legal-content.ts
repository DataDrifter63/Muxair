/** Text of the Privacy Policy and Terms of Service (supplied by the client, 23/10/2026). */
export type LegalBlock = { p: string } | { ul: string[] };
export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}
export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  updated: "23/10/2026",
  intro:
    "This explains how Muxair collects, uses, and protects personal information when you visit our website, contact us, work with us, or hear from us about our services. We build websites and run marketing for HVAC companies in the UK and the US.",
  sections: [
    {
      heading: "1. Who we are",
      blocks: [
        {
          p: "Muxair builds websites and runs marketing for HVAC companies. You can reach us at hello@muxair.com.",
        },
      ],
    },
    {
      heading: "2. What we collect",
      blocks: [
        {
          p: "Details you give us through our forms: your name, business name, email, phone number (if you give one), service area, and what you need from us.",
        },
        {
          p: "If you become a client: project details, access you grant to your website and ad accounts, billing details, and our emails and calls with you.",
        },
        {
          p: "Website usage: pages viewed, device and browser, and approximate location. We collect this using Google Analytics (GA4) and Google Search Console.",
        },
        {
          p: "Public business details: such as company websites, Google Business Profiles, and business contact details, when we contact HVAC businesses about our services (see section 4).",
        },
      ],
    },
    {
      heading: "3. How we use it",
      blocks: [
        {
          ul: [
            "To reply to your inquiry and arrange a call",
            "To deliver our services and invoice you",
            "To contact HVAC businesses about our services by email and phone (you can opt out any time)",
            "To understand how our website is used and improve it",
            "To measure and run our own advertising on Google and Meta",
            "To send updates you've agreed to",
          ],
        },
        { p: "We do not make automated decisions that significantly affect you." },
      ],
    },
    {
      heading: "4. Cold emails and calls",
      blocks: [
        {
          p: "We contact HVAC businesses by email and phone to introduce our services. We choose businesses based on publicly available information, such as their website or Google Business Profile, and we only contact you about services relevant to your business.",
        },
        {
          p: "We rely on our legitimate interest in promoting our services to other businesses. Where the law requires your consent first (for example, for some sole traders and partnerships in the UK), we ask for it before emailing you. We check UK numbers against the Telephone Preference Service (TPS) and Corporate TPS, and we respect do-not-call requirements in the US.",
        },
        {
          p: "Every marketing email includes a way to opt out. You can also tell us at any time by emailing hello@muxair.com or saying so on a call. We'll stop contacting you and keep only a minimal record of your opt-out so we don't contact you again.",
        },
      ],
    },
    {
      heading: "5. Cookies",
      blocks: [
        {
          p: "Essential cookies are always on. Analytics cookies (Google Analytics) and advertising cookies (Meta Pixel, Google Ads) are only set if you accept them. You can change your choice any time with the cookie settings option on our website.",
        },
      ],
    },
    {
      heading: "6. Who we share it with",
      blocks: [
        { p: "We do not sell your personal information. We share it only with:" },
        {
          ul: [
            "Providers that help us run Muxair, such as hosting, email, calling, payments, and analytics",
            "Google and Meta, if you accept the related cookies",
            "Our team and contractors, who keep it confidential",
            "Authorities, where the law requires it",
          ],
        },
      ],
    },
    {
      heading: "7. International transfers",
      blocks: [
        {
          p: "Our team works remotely, so your information may be processed in the UK, the US, and other countries, with safeguards where required.",
        },
      ],
    },
    {
      heading: "8. How long we keep it",
      blocks: [
        {
          ul: [
            "Inquiries that don't lead to a project: up to 12 months",
            "Client records: for our relationship plus 6 years, for tax and accounting",
            "Marketing and outreach contacts: until you unsubscribe or opt out, after which we keep only a minimal record of your opt-out",
            "Analytics data: up to 14 months",
          ],
        },
      ],
    },
    {
      heading: "9. Your rights",
      blocks: [
        {
          p: "You can ask to see, correct, or delete the information we hold about you, object to how we use it, withdraw consent, or opt out of marketing. Email hello@muxair.com and we'll respond within one month.",
        },
        { p: "UK: you can complain to the Information Commissioner's Office (ico.org.uk)." },
        {
          p: "US: residents of some states, such as California, have extra rights to know, correct, and delete their information. We don't sell personal information. You can opt out of advertising cookies at any time through our cookie settings.",
        },
      ],
    },
    {
      heading: "10. Security",
      blocks: [
        {
          p: "We use reasonable measures to protect your information, such as access controls and encrypted connections. No system is perfectly secure. If a breach affects you, we'll tell you where the law requires.",
        },
      ],
    },
    {
      heading: "11. Children",
      blocks: [
        {
          p: "Our services are for businesses. We don't knowingly collect information from anyone under 18.",
        },
      ],
    },
    {
      heading: "12. Changes",
      blocks: [{ p: "We may update this policy. The date at the top shows the latest version." }],
    },
    { heading: "13. Contact", blocks: [{ p: "hello@muxair.com" }] },
  ],
};

export const termsOfService: LegalDoc = {
  title: "Terms of Service",
  updated: "23/10/2026",
  intro:
    "These terms apply when you use muxair.com or work with Muxair. By accepting a proposal or paying an invoice, you agree to them. If your written proposal conflicts with these terms, the proposal applies to that project.",
  sections: [
    {
      heading: "1. Our services",
      blocks: [
        {
          p: "We provide website design, local SEO, Google Ads management, Meta Ads management, and website maintenance for HVAC businesses. The exact scope of your project is in your written proposal. Anything not in it is out of scope and quoted separately.",
        },
      ],
    },
    {
      heading: "2. Quotes and pricing",
      blocks: [
        {
          p: "Quotes are fixed-price and valid for 30 days. Prices are in US dollars, and UK clients can be invoiced in pounds. Taxes are added where required. Prices on our website are starting prices. Your final price is the quote in your proposal.",
        },
      ],
    },
    {
      heading: "3. Payment",
      blocks: [
        {
          ul: [
            "Website projects: a 50% deposit before work starts, and the balance at launch. Larger projects may use milestone payments set out in the proposal.",
            "Monthly services: billed monthly in advance.",
            "Due date: invoices are due within 14 days. If one is overdue, we may pause work after written notice and hold back the website launch until it's paid.",
            "Ad spend: not part of our fees. You pay Google and Meta directly.",
          ],
        },
      ],
    },
    {
      heading: "4. Timelines",
      blocks: [
        {
          p: "Our timelines are estimates, not guaranteed dates. About 30 days for a Foundation website, 30 to 45 days for Growth and Complete, and 2 to 3 weeks for ad campaigns. They depend on you providing content, feedback, approvals, and account access promptly.",
        },
      ],
    },
    {
      heading: "5. Design approval and changes",
      blocks: [
        {
          p: "You approve the design before we build. Reasonable changes at the design stage are included. After approval, substantial changes may affect cost and timeline, and we'll agree them with you first. New pages or features beyond your proposal are quoted separately.",
        },
      ],
    },
    {
      heading: "6. 30-day launch warranty",
      blocks: [
        {
          p: "For 30 days after launch, we fix defects in our own build at no charge. This doesn't cover changes made by you or others, third-party plugin or hosting issues, new feature requests, or content changes. After that, ongoing care is covered by a Maintenance plan.",
        },
      ],
    },
    {
      heading: "7. Hosting and third-party costs",
      blocks: [
        {
          p: "We do not provide hosting. You buy hosting directly from a provider and the account stays in your name. We'll guide you to a reliable option. Domains, premium plugins, stock photography, and call tracking tools are paid by you directly or billed at cost. We aren't responsible for outages or policy changes at third-party services.",
        },
      ],
    },
    {
      heading: "8. Ad accounts",
      blocks: [
        {
          p: "Your ad accounts stay yours, and we need admin access to run campaigns. Google and Meta set their own rules and can reject ads or suspend accounts. We aren't responsible for those decisions, but we'll help you respond. You are responsible for the accuracy of what your business advertises. Landing pages beyond the first 3 (Google Ads) and ad creative beyond the first 4 (Meta Ads) are quoted before work starts.",
        },
      ],
    },
    {
      heading: "9. Minimums and cancellation",
      blocks: [
        {
          ul: [
            "SEO and ad management: 3-month minimum, then month to month. After that, cancel with 30 days' written notice. Email is fine.",
            "Maintenance: no minimum. Cancel any time, effective at the end of the billing month.",
            "Complete package: the first 3 months of SEO and ad management are included in the package price, then billed monthly at the standard rate. Stopping early doesn't reduce the package price.",
            "Cancelling a project: before work starts, your deposit is refunded in full. After work starts, the deposit is non-refundable and you pay for work completed to date.",
          ],
        },
      ],
    },
    {
      heading: "10. No guaranteed results",
      blocks: [
        {
          p: "We work to improve your visibility and leads, but we can't guarantee rankings, traffic, leads, calls, or revenue. Results depend on factors outside our control, such as search engine and ad platform changes, competition, seasonality, and how quickly you respond to leads.",
        },
      ],
    },
    {
      heading: "11. Ownership and portfolio",
      blocks: [
        {
          ul: [
            "Once you've paid in full, you own the final website design and the written content we made for you. Until then, we keep ownership.",
            "We keep our own tools, code, templates, and know-how. Third-party themes, plugins, fonts, and images stay under their own licenses.",
            "You confirm you have the right to use everything you give us.",
            "We may show your finished website in our portfolio. We'll ask for your written permission before publishing a named case study or testimonial.",
          ],
        },
      ],
    },
    {
      heading: "12. Your own legal pages",
      blocks: [
        {
          p: "We aren't a law firm and don't give legal advice. Your website's own privacy policy, cookie notice, and legal compliance are your responsibility unless your proposal says otherwise.",
        },
      ],
    },
    {
      heading: "13. Confidentiality",
      blocks: [
        {
          p: "Each side keeps the other's non-public business information confidential and uses it only for the project, unless disclosure is needed to deliver the services or required by law.",
        },
      ],
    },
    {
      heading: "14. Our responsibility to you",
      blocks: [
        {
          p: "We'll deliver the services with reasonable skill and care. Our total liability for any claim about a project or service is limited to the fees you paid for it in the 12 months before the claim. We aren't liable for indirect losses such as lost profits or lost business. Nothing here limits liability that can't legally be limited.",
        },
      ],
    },
    {
      heading: "15. Ending the agreement",
      blocks: [
        {
          p: "Either side may end an agreement in writing if the other seriously breaks it and doesn't fix it within 14 days of written notice. You then pay for work done up to the end date, and we hand over completed work once paid.",
        },
      ],
    },
    {
      heading: "16. Using this website",
      blocks: [
        {
          p: "The content on muxair.com belongs to Muxair. You may view it for your own business use, but please don't copy it or misuse the site.",
        },
      ],
    },
    {
      heading: "17. Governing law",
      blocks: [
        {
          p: "These terms are governed by the laws of England and Wales. If there's a disagreement, email hello@muxair.com first and we'll try to resolve it within 30 days.",
        },
      ],
    },
    {
      heading: "18. Changes",
      blocks: [
        {
          p: "We may update these terms. The version in effect when you accept a proposal applies to that project.",
        },
      ],
    },
    { heading: "19. Contact", blocks: [{ p: "hello@muxair.com" }] },
  ],
};
