import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/meta-ads')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Services/meta-ads"!</div>
}
