import { createFileRoute, redirect } from '@tanstack/react-router'
import { userWorkspacesQueryOptions } from '@/hooks/use-workspace'
import CreateWorkspaceForm from '@/components/workspace/create-workspace-form'

export const Route = createFileRoute('/_authenticated/onboarding')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient } = context

    try {
      const { data } = await queryClient.fetchQuery(
        userWorkspacesQueryOptions,
      )
      if (data.length > 0) {
        throw redirect({ to: '/workspaces/$workspace_id/dashboard', params: { workspace_id: data[0].id } })
      }

    } catch (error) {

      if (error instanceof Response) {
        throw error
      }

    }
  },
})

function RouteComponent() {
  return (
    <div className="grid min-h-dvh  place-content-center bg-neutral-50">
      <CreateWorkspaceForm />
    </div>

  )
}
