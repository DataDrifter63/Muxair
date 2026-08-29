import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Page,
  head: () => ({
    meta: [{ title: "Privacy Policy | Ductwork Studio" }],
  }),
});

function Page() {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Coming soon.</p>
    </div>
  );
}