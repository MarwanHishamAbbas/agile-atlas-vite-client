import { createFileRoute, getRouteApi, redirect } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import WorkspaceMembersWidget from '@/components/workspace/workspace-members'
import { Spinner } from '@/components/ui/spinner'


export const Route = createFileRoute('/_authenticated/$workspace_id/_layout/dashboard')({
    component: RouteComponent,
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
                <Button > <Plus /> Invite Teammate</Button>
            </div>
        </div>
    )
}
