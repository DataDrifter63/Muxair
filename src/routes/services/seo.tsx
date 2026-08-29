import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/seo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Services/seo"!</div>
}
