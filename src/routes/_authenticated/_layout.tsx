import { Outlet, createFileRoute, redirect, useLocation, useParams } from '@tanstack/react-router'

import { Bell, Calendar1Icon, Home, MessageCircle, Settings } from 'lucide-react'
import { AppSidebar } from "@/components/app-sidebar"


import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { sessionQueryOptions } from '@/hooks/use-auth'
import { userWorkspacesQueryOptions } from '@/hooks/use-workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/_authenticated/_layout')({
    beforeLoad: async ({ context }) => {
        const { queryClient } = context



        const { data } = await queryClient.ensureQueryData(userWorkspacesQueryOptions)
        if (data.length === 0) {
            throw redirect({ to: '/onboarding' })
        } else {
            return
        }
    },
    loader: async ({ context }) => {
        const { queryClient } = context
        try {
            await queryClient.prefetchQuery(userWorkspacesQueryOptions)

        } catch (error) {
            throw redirect({
                to: '/login',
            })
        }
    },

    component: AuthLayout,

})

function AuthLayout() {

    const { workspace_id } = useParams({ strict: false })
    const { pathname } = useLocation()

    const navMenu = [
        {
            name: "Home",
            url: `/workspaces/${workspace_id}/dashboard`,
            icon: <Home className='size-4 stroke-neutral-500' />,
        },
        {
            name: "Message",
            url: `/workspaces/${workspace_id}/messages`,
            icon: <MessageCircle className='size-4 stroke-neutral-500' />,
        },
        {
            name: "Calendar",
            url: `/workspaces/${workspace_id}/calender`,
            icon: <Calendar1Icon className='size-4 stroke-neutral-500' />,
        },
    ]

    const currentUrl = navMenu.find((item) => item.url === pathname)


    return (
        <SidebarProvider className='bg-neutral-50'>
            <AppSidebar />
            <SidebarInset className='m-4 bg-neutral-50 rounded-2xl gap-3'>
                <header className="flex px-4 rounded-2xl h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white w-full">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-2 justify-between w-full">
                        <div className='flex items-center gap-2 text-neutral-500'>


                            {currentUrl?.icon}

                            <p className='p-md font-medium'>{currentUrl?.name}</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <Input placeholder='Search' className='flex-1 min-w-96' />
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




