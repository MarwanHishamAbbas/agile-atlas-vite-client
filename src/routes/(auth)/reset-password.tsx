import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute, redirect } from '@tanstack/react-router'
import useAuth from '@/hooks/use-auth'
import { useAppForm } from '@/hooks/use-form'
import { resetPasswordSchema } from '@/validators/auth'

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { code?: string } => {
    return {
      code: search.code as string,
    }
  },
  beforeLoad: ({ search }) => {
    if (!search.code) {
      throw redirect({
        to: '/forgot-password',
      })
    }
  },
})

function RouteComponent() {
  const { resetPassword } = useAuth()
  const navigate = Route.useNavigate()
  const { code } = Route.useSearch()

  if (!code) {
    navigate({ to: '/forgot-password' })
    return
  }

  const form = useAppForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: resetPasswordSchema,
    },
    onSubmit: async ({ value: values }) => {
      await resetPassword.mutateAsync({
        password: values.password,
        verificationCode: code,
      })
    },
  })

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <img src="/new-password.png" alt="" className="mx-auto" />
      <div className="space-y-2">
        <h3>Create a New Password</h3>
        <p className="label-sm text-neutral-400">
          Create a new password for your account.
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
        <form.AppField name="password">
          {(field) => (
            <field.TextField placeholder="Password" type="password" />
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.TextField placeholder="Confirm Password" type="password" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton
            isLoading={resetPassword.isPending}
            label="Reset"
            className="w-full"
          />
        </form.AppForm>
      </form>
    </div>
  )
}
