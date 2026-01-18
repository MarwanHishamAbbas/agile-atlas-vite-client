import { Button, buttonVariants } from '@/components/ui/button'
import { FieldSeparator } from '@/components/ui/separator'
import useAuth from '@/hooks/use-auth'
import { useAppForm } from '@/hooks/use-form'
import { loginSchema } from '@/validators/auth'
import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/login')({
    component: LoginForm,


})

function LoginForm() {

    const { login } = useAuth()
    const form = useAppForm({
        defaultValues: {
            email: "",
            password: "",
            remember: true
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: loginSchema
        },
        onSubmit: async ({ value: values }) => {
            await login.mutateAsync(values);
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
                    <form.AppField name="email" >
                        {(field) => <field.TextField placeholder='Email' type='email' autoComplete='email' />}
                    </form.AppField>
                    <form.AppField name="password" >
                        {(field) => <field.TextField placeholder='Password' type='password' />}
                    </form.AppField>
                    <div className='flex items-center justify-between'>

                        <form.AppField name="remember" >
                            {(field) => <field.Checkbox label='Remember me' />}
                        </form.AppField>
                        <Link to='/forgot-password' className={buttonVariants({ variant: "link", className: 'text-primary label-sm' })}>Forgot password?</Link>
                    </div>
                    <FieldSeparator label='or continue with' />

                </div>
                <form.AppForm>
                    <form.SubscribeButton isLoading={login.isPending} label="Login" className='w-full' />
                </form.AppForm>
                <div className='flex items-center justify-between gap-4'>
                    <Button
                        variant={'ghost'}
                        className='border border-border rounded-lg h-12 w-full flex items-center justify-center'>
                        <img src="/google.svg" className='' alt="" />
                    </Button>

                    <Button
                        variant={'ghost'}
                        className='border border-border rounded-lg h-12 w-full flex items-center justify-center'>
                        <img src="/apple.svg" className='' alt="" />
                    </Button>

                    <Button
                        variant={'ghost'}
                        className='border border-border rounded-lg h-12 w-full flex items-center justify-center'>
                        <img src="/facebook.svg" className='' alt="" />
                    </Button>


                </div>
            </form>
            <div className='justify-center flex'>
                <p className=' label-sm text-neutral-400'>Don’t have account? <Link to='/register' preload={false} className={buttonVariants({ variant: "link", className: 'text-primary' })}>Register</Link></p>
            </div>
        </main>
    )
}
