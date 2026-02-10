import { revalidateLogic } from '@tanstack/react-form'


import { PenLine, Share } from 'lucide-react';
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { Button, buttonVariants } from '../ui/button';
import type { FC } from 'react';
import { useAppForm } from '@/hooks/use-form'

import { createProjectSchema } from '@/validators/project';
import useProject from '@/hooks/use-project';

type ProjectTitleFormProps = {
    name: string
}

const ProjectTitleForm: FC<ProjectTitleFormProps> = ({ name }) => {
    const { updateProject } = useProject()
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)
    const { project_id } = useParams({ from: "/_authenticated/$workspace_id/_layout/projects/$project_id" })



    const form = useAppForm({
        defaultValues: {
            name: name,
        },
        validationLogic: revalidateLogic(),
        validators: {
            onSubmit: createProjectSchema.pick({ name: true }),

        },
        onSubmit: async ({ value: values }) => {
            await updateProject.mutateAsync({ ...values, project_id })
            setIsEditingTitle(false)
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
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Button disabled variant={'secondary'} size={'icon-lg'}>{name.split('')[0]}</Button>
                        {isEditingTitle ?
                            <>
                                <form.AppField name="name">
                                    {(field) => <field.TextField placeholder="Add a title" />}
                                </form.AppField>
                                <form.AppForm>
                                    <form.SubscribeButton
                                        label='Save'
                                        className={buttonVariants({ size: "lg", })}
                                        isLoading={updateProject.isPending}
                                    />
                                </form.AppForm>
                            </>
                            : <>
                                <h4>{name}</h4>
                                <Button onClick={() => setIsEditingTitle(true)} variant={'ghost'} size={"icon-lg"}><PenLine /> </Button></>}

                    </div>
                    <Button variant={'outline'}><Share className='size-3.5' /> Share</Button>
                </div>




            </form>
        </div>

    )
}

export default ProjectTitleForm