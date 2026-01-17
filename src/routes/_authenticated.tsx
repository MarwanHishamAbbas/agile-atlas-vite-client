
import { Button } from '@/components/ui/button'
import useAuth, { SESSION_QUERY_KEY, sessionQueryOptions } from '@/hooks/use-auth'
import { getUserSessionQueryFn } from '@/lib/api'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context, location }) => {
        const { queryClient } = context

        try {
            // Ensure we have a valid session
            await queryClient.ensureQueryData({
                queryKey: SESSION_QUERY_KEY,
                queryFn: getUserSessionQueryFn,
            })
        } catch (error) {
            // Session doesn't exist or refresh failed
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.pathname,
                },
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
                search: { redirect: window.location.pathname },
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
            <h3>{session.email}</h3>
            <Button
                disabled={logout.isPending}
                onClick={() => logout.mutateAsync()}
                variant={'destructive'}>
                Logout
            </Button>
            {/* You can add common layout elements here like navbar, sidebar etc */}
            <Outlet />
        </div>
    )
}