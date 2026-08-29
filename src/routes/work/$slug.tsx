import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/work/$slug")({
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useParams();
  return (
    <div>
      <h1>Case Study: {slug}</h1>
      <p>Coming soon.</p>
    </div>
  );
}