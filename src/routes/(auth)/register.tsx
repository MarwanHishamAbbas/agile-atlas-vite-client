

import { Button, buttonVariants } from '@/components/ui/button'
import { FieldSeparator } from '@/components/ui/separator'
import { useAppForm } from '@/hooks/use-form'
import { registerSchema } from '@/validators/auth'
import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/register')({
  component: LoginForm,
})

function LoginForm() {

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: registerSchema
    }
  })
  return (
    <main className='space-y-12'>
      <header className='text-center space-x-2'>
        <h3>Create your <span className='text-primary'>account</span></h3>
        <p className='p-sm text-neutral-500'>Create your account in just a few steps.</p>
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
          <form.AppField name="name" >
            {(field) => <field.TextField placeholder='Name' type='text' />}
          </form.AppField>
          <form.AppField name="email" >
            {(field) => <field.TextField placeholder='Email' type='email' />}
          </form.AppField>
          <form.AppField name="password" >
            {(field) => <field.TextField placeholder='Password' type='password' />}
          </form.AppField>
          <form.AppField name="confirmPassword" >
            {(field) => <field.TextField placeholder='Confirm Password' type='password' />}
          </form.AppField>

        </div>
        <form.AppForm>
          <form.SubscribeButton label="Continue" className='w-full' />
        </form.AppForm>
        <FieldSeparator label='or continue with' />
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
        <p className=' label-sm text-neutral-400'>Already have an account? <Link to='/login' className={buttonVariants({ variant: "link", className: 'text-primary' })}>Login</Link></p>
      </div>
    </main>
  )
}
