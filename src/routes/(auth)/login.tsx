import LoginForm from '@/components/auth/login-form'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/login')({
    component: LoginForm,
})


