import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { SolutionSection } from "@/components/site/SolutionSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { WhyUsSection } from "@/components/site/WhyUsSection";
import { PortfolioSection } from "@/components/site/PortfolioSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { Results } from "@/components/site/Results";
import { CTASection } from "@/components/site/CTASection";

const SITE_URL = "https://muxair.com";

const title = "HVAC Website Design & Marketing Agency | Muxair";
const description =
  "Muxair builds high-converting websites and provides SEO and digital advertising for HVAC companies. Get more local enquiries and booked jobs. Request a free quote.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Muxair",
          url: SITE_URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Muxair",
          url: SITE_URL,
          logo: `${SITE_URL}/icon-512.png`,
          email: "hello@muxair.com",
          telephone: "+44 7806 982999",
          sameAs: ["https://www.instagram.com/muxair.hvac", "https://www.facebook.com/muxair.hvac"],
          image: `${SITE_URL}/og-image.png`,
          description,
          serviceType: [
            "HVAC web design agency",
            "Website design for HVAC companies",
            "HVAC digital marketing",
            "Heating and cooling website design",
          ],
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Canada" },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Results />
        <ServicesSection />
        <WhyUsSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
