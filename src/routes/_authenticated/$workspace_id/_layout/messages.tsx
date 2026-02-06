import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/$workspace_id/_layout/messages',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            Hello "/_authenticated/_layout/workspaces/$workspace_id/messages"!
        </div>
    )
}
