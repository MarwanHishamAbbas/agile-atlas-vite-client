import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { currentWorkspaceQueryOptions } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/_layout/workspaces/$workspace_id/dashboard')({
    component: RouteComponent,
    beforeLoad: async ({ params, context }) => {
        const { queryClient } = context
        try {
            await queryClient.ensureQueryData(currentWorkspaceQueryOptions(params.workspace_id))
        } catch (error) {
            throw Error(error as any)
        }
    },
    loader: ({ params }) => {
        // console.log(params.workspace_id)
    },
    notFoundComponent: () => {
        return (
            <h1>Not Marwan</h1>
        )
    }

})

function RouteComponent() {
    const { session } = getRouteApi('/_authenticated').useLoaderData()

    return (

        <div className='flex items-center justify-between max-lg:flex-col max-lg:gap-2'>
            <div className='space-y-2'>
                <h4>Good Morning, {session.name}!</h4>
                <p className='p-sm text-neutral-400'>Let’s kick off the day and get all your stuff done!</p>
            </div>
            <Button size={'sm'}> <Plus /> Invite Teammate</Button>
        </div>
    )
}
