import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
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