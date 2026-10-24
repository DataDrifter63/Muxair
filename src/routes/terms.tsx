import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-data";
import { LegalPage } from "@/components/site/LegalPage";
import { termsOfService } from "@/lib/legal-content";

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
            {
              "@type": "ListItem",
              position: 2,
              name: "Terms of Service",
              item: `${SITE_URL}/terms`,
            },
          ],
        }),
      },
    ],
  }),
});

function Page() {
  return (
    <LegalPage
      doc={termsOfService}
      eyebrow="Legal"
      other={{ to: "/privacy-policy", label: "Read our Privacy Policy" }}
    />
  );
}
