import { createFileRoute, getRouteApi, redirect } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import { currentWorkspaceQueryOptions, userWorkspacesQueryOptions, workspaceMembersQueryOptions } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import WorkspaceMembersWidget from '@/components/workspace/workspace-members'
import { Spinner } from '@/components/ui/spinner'


export const Route = createFileRoute('/_authenticated/_layout/$workspace_id/dashboard')({
    component: RouteComponent,
    beforeLoad: async ({ context }) => {
        try {

        } catch (error) {
            const { data } = await context.queryClient.ensureQueryData(userWorkspacesQueryOptions)
            throw redirect({ to: '/$workspace_id/dashboard', params: { workspace_id: data[0].id } })
        }
    },
    loader: async ({ params, context }) => {
        const { queryClient } = context
        const { data } = await queryClient.ensureQueryData(currentWorkspaceQueryOptions(params.workspace_id))
        queryClient.prefetchQuery(workspaceMembersQueryOptions(params.workspace_id))
        return { currentWorkspace: data }
    },
    notFoundComponent: () => {
        return (
            <h1>Not Marwan</h1>
        )
    },

})

function RouteComponent() {
    const { session } = getRouteApi('/_authenticated').useLoaderData()
    const { workspace_id } = Route.useParams()

    return (

        <div className='flex items-center justify-between max-lg:flex-col max-lg:gap-2'>
            <div className='space-y-2'>
                <h4>Good Morning, {session.name.split(" ")[0]}!</h4>
                <p className='p-sm text-neutral-400'>Let’s kick off the day and get all your stuff done!</p>
            </div>
            <div className='flex items-center gap-2'>
                <Suspense fallback={<Spinner />}>

                    <WorkspaceMembersWidget params={workspace_id} />
                </Suspense>
                <Button size={'sm'}> <Plus /> Invite Teammate</Button>
            </div>
        </div>
    )
}
