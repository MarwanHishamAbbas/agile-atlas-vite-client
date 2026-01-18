import { buttonVariants } from '@/components/ui/button'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/verify-email')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { email?: string } => {
    return {
      email: search.email as string
    }

  },
  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({
        to: '/register',
      })
    }
  },
})

function RouteComponent() {
  const { email } = Route.useSearch()

  return <div className='max-w-md mx-auto space-y-6 text-center'>
    <img src="/inbox.png" alt="" className='mx-auto' />
    <div className='space-y-2'>
      <h3>We've sent you a <br /> verification to your email.</h3>
      <p className='label-sm text-neutral-400'>We've sent a six-digit code to {email} <br />
        Please enter it below.</p>
    </div>
    <div className='justify-center flex'>
      <p className=' label-sm text-neutral-400'>Didn't receive the code? <Link to='/register' className={buttonVariants({ variant: "link", className: 'text-primary underline underline-offset-4' })}>Send again</Link></p>
    </div>
  </div>
}
