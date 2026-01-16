import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
    component: RouteComponent,
})

function RouteComponent() {
    return (

        <main className='flex items-center justify-between'>
            <div className='flex-1/2 h-full bg-primary text-red-600'>
                left
            </div>
            <div className='flex-1/2'>

                <Outlet />
            </div>
        </main>
    )
}
