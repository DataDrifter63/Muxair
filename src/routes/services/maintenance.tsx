import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/maintenance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Services/maintenance"!</div>
}
