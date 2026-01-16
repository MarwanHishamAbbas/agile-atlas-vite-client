import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(auth)/login"!
        <Button>Hello</Button>
    </div>
}
