import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  forgotPasswordMutationFn,
  getUserSessionQueryFn,
  loginMutationFn,
  logoutMutationFn,
  registerMutationFn,
  resetPasswordMutationFn,
  verifyEmailMutationFn,
} from '@/lib/api'

export const SESSION_QUERY_KEY = ['current-session'] as const

export const sessionQueryOptions = {
  queryKey: SESSION_QUERY_KEY,
  queryFn: getUserSessionQueryFn,
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
}

const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Get current session
  const sessionQuery = useQuery(sessionQueryOptions)

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: async (response) => {
      if (response.data.mfaRequired) {
        // Handle MFA flow - you might want to set some state here
        // or navigate to MFA verification page
        // TODO
        return
      }
      toast.success(response.data.message)
      router.navigate({ to: '/dashboard' })

      // Invalidate and refetch session to get fresh user data
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY })
    },
    onError: (error) => {
      console.error('Login error:', error)
      toast.error(error.message || 'Something went wrong')
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: (response) => {
      toast.success(response.data.message, {
        description: `An email has been sent to ${response.data.user.email}`,
      })
      router.navigate({
        to: '/verify-email',
        search: (prev) => ({ ...prev, email: response.data.user.email }),
      })
    },
    onError: (error) => {
      console.error('Register error:', error)
      toast.error(error.message || 'Something went wrong')
    },
  })

  const confirmEmailMutation = useMutation({
    mutationFn: verifyEmailMutationFn,
    onSuccess: (response) => {
      toast.success(response.data.message, {
        description: 'Please login again',
      })

      router.navigate({
        to: '/login',
      })
    },
    onError: (error) => {
      console.error('Confirm Email error:', error)
      toast.error(error.message || 'Something went wrong')
      router.navigate({
        to: '/login',
      })
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordMutationFn,
    onSuccess: (response) => {
      toast.success(response.data.message)
      router.navigate({
        to: '/forgot-password',
      })
    },
    onError: (error) => {
      console.error('Forgot Password email sent error:', error)
      toast.error(error.message || 'Something went wrong')
    },
  })
  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordMutationFn,
    onSuccess: (response) => {
      toast.success(response.data.message)
      router.navigate({
        to: '/login',
      })
    },
    onError: (error) => {
      console.error('Forgot Password email sent error:', error)
      toast.error(error.message || 'Something went wrong')
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()

      // Navigate to login
      router.navigate({ to: '/login' })
    },
    onError: (error: any) => {
      // Even if logout fails on server, clear client state
      console.error('Logout error:', error)
      queryClient.clear()
      router.navigate({ to: '/login' })
    },
  })

  return {
    user: sessionQuery.data?.data.session,
    isAuthenticated: sessionQuery.isSuccess && !!sessionQuery.data,
    login: loginMutation,
    register: registerMutation,
    confirmEmail: confirmEmailMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
    logout: logoutMutation,
    refetchSession: sessionQuery.refetch,
  }
}

export default useAuth
