import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { sessionQueryOptions } from '@/hooks/use-auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context

    try {
      // Ensure session exists (will auto-refresh if needed via axios interceptor)
      await queryClient.ensureQueryData(sessionQueryOptions)

      // Session exists! User is authenticated, continue to route
    } catch (error) {
      // Session doesn't exist or refresh failed
      // Redirect to login with return URL
      throw redirect({
        to: '/login',
      })
    }
  },
  loader: async ({ context }) => {
    const { queryClient } = context
    try {
      // ensureQueryData ensures data is available before rendering
      const { data } = await queryClient.ensureQueryData(sessionQueryOptions)
      return { session: data.session }
    } catch (error) {
      throw redirect({
        to: '/login',
      })
    }
  },

  component: AuthLayout,
})

function AuthLayout() {


  return (
    <Outlet />

  )
}


