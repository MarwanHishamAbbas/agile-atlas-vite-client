
import useAuth from '@/hooks/use-auth'

import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'


export const Route = createFileRoute('/(auth)/confirm-email')({

    validateSearch: (search: Record<string, unknown>): { code?: string } => {
        return {
            code: search.code as string
        }
    },
    beforeLoad: async ({ search }) => {
        if (!search.code) {
            throw redirect({
                to: '/register',
            })
        }
    },
    component: RouteComponent


})


function RouteComponent() {

    const { code } = Route.useSearch()
    const navigate = Route.useNavigate()
    if (!code) {
        navigate({ to: "/register" })
        return
    }

    const { confirmEmail } = useAuth()

    useEffect(() => {


        confirmEmail.mutateAsync({ code: code })

    }, [])

    return <></>
}

