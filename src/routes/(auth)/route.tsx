import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
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
                <img src="/auth.png" alt="" className='absolute -bottom-1/2 left-1/4' />
            </div>
            <div className='flex-1/2 '>
                <Outlet />
            </div>
        </main>
    )
}
