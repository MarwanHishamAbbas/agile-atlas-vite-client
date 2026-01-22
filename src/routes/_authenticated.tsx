import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import useAuth, { sessionQueryOptions } from '@/hooks/use-auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context

    try {
      // Ensure session exists (will auto-refresh if needed via axios interceptor)
      await queryClient.ensureQueryData(sessionQueryOptions)

      // Session exists! User is authenticated, continue to route
    } catch (error) {
      // Session doesn't exist or refresh failed
      // Redirect to login with return URL
      throw redirect({
        to: '/login',
      })
    }
  },
  loader: async ({ context }) => {
    const { queryClient } = context
    try {
      // ensureQueryData ensures data is available before rendering
      const { data } = await queryClient.ensureQueryData(sessionQueryOptions)
      return { session: data.session }
    } catch (error) {
      throw redirect({
        to: '/login',
      })
    }
  },

  component: AuthLayout,
})

function AuthLayout() {
  const { session } = Route.useLoaderData()
  const { logout } = useAuth()

  return (
    <div>
      <Button
        disabled={logout.isPending}
        onClick={() => logout.mutateAsync()}
        variant={'destructive'}
      >
        Logout
      </Button>
      {/* You can add common layout elements here like navbar, sidebar etc */}
      <Outlet />
    </div>
  )
}
