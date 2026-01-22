import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAuth from '../use-auth'
import * as api from '@/lib/api/auth'

vi.mock('@/lib/api', () => ({
  loginMutationFn: vi.fn(),
  registerMutationFn: vi.fn(),
  logoutMutationFn: vi.fn(),
  verifyEmailMutationFn: vi.fn(),
  forgotPasswordMutationFn: vi.fn(),
  resetPasswordMutationFn: vi.fn(),
  getUserSessionQueryFn: vi.fn().mockResolvedValue({
    data: {
      message: 'Session retrieved',
      session: null, // Default: no user logged in
    },
  }),
}))

// Mock the router
const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useRouter: () => ({
      navigate: mockNavigate,
    }),
  }
})

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('useAuth Hook', () => {
  let queryClient: QueryClient

  // Create a fresh QueryClient before each test
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    vi.clearAllMocks()
  })

  // ============================================================================
  // WRAPPER WITH ROUTER + QUERY CLIENT
  // useAuth needs both Router and QueryClient context
  // ============================================================================
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  // ============================================================================
  // TEST 1: Hook returns correct API
  // ============================================================================
  it('should return all auth methods and state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toHaveProperty('user')
    expect(result.current).toHaveProperty('isAuthenticated')
    expect(result.current).toHaveProperty('login')
    expect(result.current).toHaveProperty('register')
    expect(result.current).toHaveProperty('confirmEmail')
    expect(result.current).toHaveProperty('forgotPassword')
    expect(result.current).toHaveProperty('resetPassword')
    expect(result.current).toHaveProperty('logout')
    expect(result.current).toHaveProperty('refetchSession')
  })

  it('should return null user and not authenticated by default', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeUndefined()
    expect(result.current.isAuthenticated).toBe(false)
  })

  // ============================================================================
  // LOGIN TESTS
  // ============================================================================
  describe('Login', () => {
    it('should call login API with correct credentials', async () => {
      const mockResponse = {
        data: {
          message: 'Login successful',
          mfaRequired: false,
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          },
        },
        headers: {},
        status: 200,
        statusText: 'OK',
        config: {} as any,
      }
      vi.mocked(api.loginMutationFn).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await result.current.login.mutateAsync({
        email: 'test@example.com',
        password: 'password123',
      })

      // Verify API was called with correct data
      expect(api.loginMutationFn).toHaveBeenCalled()
      const callArgs = vi.mocked(api.loginMutationFn).mock.calls[0]
      expect(callArgs[0]).toEqual({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
