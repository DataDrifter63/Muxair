import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-data";

const title = "Terms of Service | Muxair";
const description =
  "The terms that apply when you use the Muxair website and our web design and digital marketing services for HVAC companies.";

export const Route = createFileRoute("/terms")({
  component: Page,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/terms` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${SITE_URL}/terms` },
          ],
        }),
      },
    ],
  }),
});

// DEMO CONTENT — replace with the client's approved text before launch.
const sections: { heading: string; text: string }[] = [
  { heading: "1. Acceptance of Terms", text: "This is demo text. By accessing or using this website you agree to these Terms of Service. If you do not agree, please do not use the site." },
  { heading: "2. Our Services", text: "This is demo text. Muxair provides web design and digital marketing services for HVAC companies. The scope, timelines and fees of each project are set out in a separate written proposal or agreement." },
  { heading: "3. Payments", text: "This is demo text. Payment terms, deposits and refund conditions are defined in the proposal or agreement for each project." },
  { heading: "4. Intellectual Property", text: "This is demo text. Unless agreed otherwise in writing, the content of this website belongs to Muxair. Ownership of project deliverables transfers according to the project agreement." },
  { heading: "5. Limitation of Liability", text: "This is demo text. To the extent permitted by law, Muxair is not liable for indirect or consequential losses arising from use of this website or its services." },
  { heading: "6. Changes and Contact", text: "This is demo text. We may update these terms from time to time. Questions can be sent through the form on our Contact page." },
];

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: [date]</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
