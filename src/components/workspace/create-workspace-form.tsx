import { revalidateLogic } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react';
import { useAppForm } from '@/hooks/use-form'
import useWorkspace from '@/hooks/use-workspace'
import { workspaceNameSchema } from '@/validators/workspace'

type CreateWorkspaceFormProps = {
    setCreateWorkspaceOpen?: (isOpen: boolean) => void
}

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ setCreateWorkspaceOpen }) => {
    const { createWorkspace } = useWorkspace()
    const navigate = useNavigate()

    const form = useAppForm({
        defaultValues: {
            name: '',
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: workspaceNameSchema,
        },
        onSubmit: async ({ value: values }) => {
            const { data } = await createWorkspace.mutateAsync(values)

            console.log(data)
            // After creating, navigate to dashboard or something
            navigate({ to: '/workspaces/$workspace_id/dashboard', params: { workspace_id: data.createdWorkspace.id } })
            setCreateWorkspaceOpen?.(false)
        },
    })

    return (
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

    )
}

export default CreateWorkspaceForm