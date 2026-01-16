
import { useAppForm } from '@/hooks/use-form'
import { loginSchema } from '@/validators/auth'
import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/login')({
    component: LoginForm,
})

function LoginForm() {

    const form = useAppForm({
        defaultValues: {
            email: "",
            password: ""
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: loginSchema
        }
    })
    return (
        <main className='space-y-12'>
            <header className='text-center space-x-2'>
                <h3>Login to <span className='text-primary'>Sprintly</span></h3>
                <p className='p-sm text-neutral-500'>Enter your username and password to Login</p>
            </header>
            <form
                className='max-w-sm mx-auto space-y-6'
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div className='space-y-4'>
                    <form.AppField name="email"  >
                        {(field) => <field.TextField placeholder='Email' />}
                    </form.AppField>
                    <form.AppField name="password"   >
                        {(field) => <field.TextField placeholder='Password' />}
                    </form.AppField>
                </div>

                <form.AppForm >
                    <form.SubscribeButton label="Login" />
                </form.AppForm></form>
            <div>

            </div>
        </main>
    )
}
