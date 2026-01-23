import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute, redirect } from '@tanstack/react-router'
import useWorkspace, { userWorkspacesQueryOptions } from '@/hooks/use-workspace-hook'
import { useAppForm } from '@/hooks/use-form'
import { workspaceNameSchema } from '@/validators/workspace'

export const Route = createFileRoute('/_authenticated/onboarding')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient } = context

    try {
      const { data } = await queryClient.fetchQuery(
        userWorkspacesQueryOptions,
      )
      if (data.length > 0) {
        throw redirect({ to: '/dashboard' })
      }

    } catch (error) {

      if (error instanceof Response) {
        throw error
      }

    }
  },
})

function RouteComponent() {
  const { createWorkspace } = useWorkspace()
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: workspaceNameSchema,
    },
    onSubmit: async ({ value: values }) => {
      await createWorkspace.mutateAsync(values)
      // After creating, navigate to dashboard or something
      navigate({ to: '/dashboard' })
    },
  })

  return (
    <div className="grid min-h-dvh  place-content-center bg-neutral-50">
      <div className="max-w-md mx-auto space-y-8 text-center bg-white p-8 rounded-2xl">
        <div className="space-y-2">
          <h3>Let’s create your Workspace</h3>
          <p className="label-sm text-neutral-400">
            A chill spot to team up on projects, no matter where your crew is
            hanging out.
          </p>
        </div>
        <form
          className="max-w-sm mx-auto space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.AppField name="name">
            {(field) => <field.TextField placeholder="Name your workspace" />}
          </form.AppField>
          <form.AppForm>
            <form.SubscribeButton
              isLoading={createWorkspace.isPending}
              label="Create Workspace"
              className="w-full"
            />
          </form.AppForm>
        </form>
      </div>
    </div>
  )
}
