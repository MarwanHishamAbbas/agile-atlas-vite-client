import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { Bell, Settings } from 'lucide-react'
import { AppSidebar } from "@/components/app-sidebar"


import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { currentWorkspaceQueryOptions, userWorkspacesQueryOptions, workspaceMembersQueryOptions } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { workspaceProjectsQueryOptions } from '@/hooks/use-project'


export const Route = createFileRoute('/_authenticated/$workspace_id/_layout')({

    beforeLoad: async ({ context, params }) => {
        const { queryClient } = context
        const { data } = await queryClient.ensureQueryData(userWorkspacesQueryOptions)
        const { workspace_id } = params as { workspace_id: string }
        if (workspace_id === 'uuid') {
            throw redirect({ to: ".", params: { workspace_id: data.lastSelectedWorkspaceId } })
        }

        if (data.workspaces.length === 0) {
            throw redirect({ to: '/onboarding' })
        } else {
            return
        }
    },
    loader: async ({ params, context }) => {
        const { queryClient } = context
        await queryClient.ensureQueryData(currentWorkspaceQueryOptions(params.workspace_id))
        queryClient.prefetchQuery(workspaceMembersQueryOptions(params.workspace_id))
        queryClient.prefetchQuery(workspaceProjectsQueryOptions(params.workspace_id))

    },

    component: Layout,


})

function Layout() {




    return (
        <SidebarProvider className='bg-neutral-50'>
            <AppSidebar />
            <SidebarInset className='m-4 bg-neutral-50 rounded-2xl gap-3'>
                <header className="flex px-4 rounded-2xl h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white w-full">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-2 justify-between w-full ">

                        <div className='flex items-center gap-2 ml-auto'>
                            <Input placeholder='Search' className='flex-1 min-w-96 h-10 rounded-xl' />
                            <Button variant={"outline"} size={"icon-lg"}>
                                <Bell />
                            </Button>
                            <Button variant={"outline"} size={"icon-lg"}>
                                <Settings />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min p-4">
                    <Outlet />
                </div>

            </SidebarInset>
        </SidebarProvider>

    )
}




