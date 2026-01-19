import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

// Create a fresh QueryClient for each test
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry in tests
        gcTime: Infinity, // Don't garbage collect
      },
      mutations: {
        retry: false,
      },
    },
  })
}

// ============================================================================
// WRAPPER COMPONENT - Provides all necessary context
// ============================================================================
interface WrapperProps {
  children: ReactNode
  queryClient?: QueryClient
  initialRoute?: string
}

function TestWrapper({
  children,
  queryClient,
  initialRoute = '/',
}: WrapperProps) {
  const testQueryClient = queryClient || createTestQueryClient()
  // Create a simple router for testing
  const rootRoute = createRootRoute({
    component: () => <>{children}</>,
  })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <>{children}</>,
  })

  const routeTree = rootRoute.addChildren([indexRoute])
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialRoute],
    }),
  })

  return (
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
  initialRoute?: string
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions,
) {
  const { queryClient, initialRoute, ...renderOptions } = options || {}

  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <TestWrapper queryClient={queryClient} initialRoute={initialRoute}>
          {children}
        </TestWrapper>
      ),
      ...renderOptions,
    }),
    // Return the query client so tests can interact with it
    queryClient: queryClient || createTestQueryClient(),
  }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
