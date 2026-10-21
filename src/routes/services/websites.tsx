import { createFileRoute, redirect } from "@tanstack/react-router";

// The Website Design page used to live at /services/websites. Keep old links,
// bookmarks and Google's indexed URL working by redirecting to the new path.
export const Route = createFileRoute("/services/websites")({
  beforeLoad: () => {
    throw redirect({ to: "/services/website", statusCode: 301 });
  },
});
