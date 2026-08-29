import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/google-ads')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Services/google-ads"!</div>
}
