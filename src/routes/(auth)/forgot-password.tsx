import { buttonVariants } from '@/components/ui/button'
import useAuth from '@/hooks/use-auth'
import { useAppForm } from '@/hooks/use-form'
import { forgotPasswordSchema } from '@/validators/auth'
import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,


})

function RouteComponent() {

  const { forgotPassword } = useAuth()
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: forgotPasswordSchema
    },
    onSubmit: async ({ value: values }) => {
      await forgotPassword.mutateAsync(values);
    }
  })

  return !form.state.isSubmitted ? <div className='max-w-md mx-auto space-y-6 text-center'>
    <img src="/forgot-password.png" alt="" className='mx-auto' />
    <div className='space-y-2'>
      <h3>Forgot Your Password?</h3>
      <p className='label-sm text-neutral-400'>Kindly provide your email address to initiate a password reset request.</p>
    </div>
    <form
      className='max-w-sm mx-auto space-y-6'
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
      <form.AppField name="email" >
        {(field) => <field.TextField placeholder='Email' type='email' autoComplete='email' />}
      </form.AppField>
      <form.AppForm>
        <form.SubscribeButton isLoading={forgotPassword.isPending} label="Continue" className='w-full' />
      </form.AppForm>
      <Link to='/login' className={buttonVariants({ variant: "ghost", className: 'text-primary w-full' })}>Return to Login</Link>
    </form>

  </div> : <div className='max-w-sm mx-auto space-y-6 text-center'>
    <img src="/email-sent.png" alt="" className='mx-auto' />
    <div className='space-y-2'>
      <h3>Recovery Link Sent</h3>
      <p className='label-sm text-neutral-400'>We’ve sent a recovery link to your email at <strong className='text-neutral-900'>{form.getFieldValue('email')}</strong>.</p>
    </div>
    <div className='justify-center flex'>
      <p className=' label-sm text-neutral-400'>Didn't receive an email? <Link to='/register' className={buttonVariants({ variant: "link", className: 'text-primary underline underline-offset-4' })}>Resend recovery link</Link></p>
    </div>
    <Link to='/login' className={buttonVariants({ variant: "ghost", className: 'text-primary' })}>Return to Login</Link>
  </div>
}
