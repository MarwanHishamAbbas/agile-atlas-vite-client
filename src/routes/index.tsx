import { Link, createFileRoute } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Landing page


    </div>
}
