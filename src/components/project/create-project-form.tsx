import { revalidateLogic } from '@tanstack/react-form'
import { useNavigate, useParams } from '@tanstack/react-router'

import { Button, buttonVariants } from '../ui/button';
import type { FC } from 'react';
import type { CreateProjectInput } from '@/validators/project';
import { useAppForm } from '@/hooks/use-form'

import { createProjectSchema } from '@/validators/project';
import useProject from '@/hooks/use-project';

type CreateProjectFromProps = {
    setCreateProjectOpen?: (isOpen: boolean) => void
}

const CreateProjectFrom: FC<CreateProjectFromProps> = ({ setCreateProjectOpen }) => {
    const { createProject } = useProject()
    const { workspace_id } = useParams({ strict: false, })
    const navigate = useNavigate()

    const form = useAppForm({
        defaultValues: {
            name: '',
            description: '',
        } as CreateProjectInput,
        validationLogic: revalidateLogic(),
        validators: {
            onSubmit: createProjectSchema,

        },
        onSubmit: async ({ value: values }) => {
            const { data } = await createProject.mutateAsync({ ...values, workspace_id })

            // After creating, navigate to dashboard or something
            navigate({ to: '/$workspace_id/projects/$project_id', params: { workspace_id: workspace_id ?? "", project_id: data.createdProject.id } })
            setCreateProjectOpen?.(false)
        },
    })

    return (
        <div className=" space-y-8 bg-white">
            <form
                className=" space-y-10"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <form.AppField name="name">
                    {(field) => <field.TextField label='Title' placeholder="Add a title" />}
                </form.AppField>
                <form.AppField name="description">
                    {(field) => <field.TextArea rows={10} label='Description (Optional)' placeholder="Add description" />}
                </form.AppField>
                <div className='space-x-2 text-right'>
                    <Button type='button' onClick={() => setCreateProjectOpen?.(false)} size={"sm"} variant={'outline'}>Discard</Button>
                    <form.AppForm>
                        <form.SubscribeButton
                            className={buttonVariants({ size: "sm" })}
                            isLoading={createProject.isPending}
                            label="Continue"
                        />
                    </form.AppForm>
                </div>
            </form>
        </div>

    )
}

export default CreateProjectFrom