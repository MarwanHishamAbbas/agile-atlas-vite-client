import { sessionQueryOptions } from '@/hooks/use-auth'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({

    beforeLoad: async ({ context }) => {
        const { queryClient } = context

        const cachedSession = queryClient.getQueryData(sessionQueryOptions.queryKey)
        if (cachedSession) {
            try {
                // Ensure we have a valid session
                await queryClient.ensureQueryData(sessionQueryOptions)
            } catch (error) {
                // Session doesn't exist or refresh failed
                throw redirect({
                    to: '/dashboard',

                })
            }
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className='flex items-center justify-between p-2 h-screen'>
            <div className='flex-1/2 h-full bg-neutral-100 rounded-2xl max-lg:hidden p-20 space-y-10 overflow-hidden relative'>
                <img src="/logo.svg" alt="" className='' />
                <div className='space-y-4'>
                    <h3>Boost Your Productivity</h3>
                    <p className='p-lg text-neutral-500'>Streamline your workflow and stay focused on what matters.</p>
                </div>
                <img src="/auth.png" alt="" className='scale-150 translate-y-1/4 translate-x-1/4' />
            </div>
            <div className='flex-1/2 '>
                <Outlet />
            </div>
        </main>
    )
}