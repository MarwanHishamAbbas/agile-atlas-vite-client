import { createFileRoute, redirect } from '@tanstack/react-router'
import { userWorkspacesQueryOptions } from '@/hooks/use-workspace-hook'


export const Route = createFileRoute('/_authenticated/')({
  component: App,

})

function App() {
  return (
    <h1>Homepage</h1>
  )
}
