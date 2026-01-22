import { createFileRoute, redirect } from '@tanstack/react-router'
import { userWorkspacesQueryOptions } from '@/hooks/use-workspace-hook'

export const Route = createFileRoute('/_authenticated/dashboard')({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context

    try {
      const { data } = await queryClient.ensureQueryData(userWorkspacesQueryOptions)
      if (data.length === 0) {
        throw redirect({ to: '/onboarding' })

      }

      // Already logged in, redirect to dashboard
      // throw redirect({ to: '/dashboard' })
    } catch (error) {
      // Not authenticated or redirect error
      if (error instanceof Response) {
        throw error // It's a redirect, re-throw it
      }
      // It's an auth error, continue to login page
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/dashboard"!</div>
}
