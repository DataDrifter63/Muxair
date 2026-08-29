import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>Coming soon.</p>
    </div>
  );
}