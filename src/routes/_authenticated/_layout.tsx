import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { sessionQueryOptions } from '@/hooks/use-auth'
import { userWorkspacesQueryOptions } from '@/hooks/use-workspace-hook'

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
            // ensureQueryData ensures data is available before rendering
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


    return (
        <SidebarProvider className='bg-neutral-50'>
            <AppSidebar />
            <SidebarInset className='m-4 bg-neutral-50 rounded-2xl gap-3'>
                <header className="flex px-4 rounded-2xl h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white">
                    <div className="flex items-center gap-2 ">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>


                <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>

    )
}


