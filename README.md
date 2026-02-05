# Agile Atlas Frontend

## CI/CD Workflow

```mermaid
graph TD
    A[Push or Pull Request] --> B{Branch?}
    B -->|main, master, development| C[Lint TS Workflow]
    B -->|main, master| D[Test Workflow]
    B -->|main, master, development| E[Type Check Workflow]

    C --> F[Checkout Code]
    F --> G[Setup Node.js & PNPM]
    G --> H[Install Dependencies]
    H --> I{Event Type?}
    I -->|Pull Request| J[Run ESLint with Reviewdog<br/>Annotate PR]
    I -->|Push| K[Run ESLint<br/>Fail on Errors]

    D --> L[Checkout Code]
    L --> M[Setup Node.js & PNPM]
    M --> N[Install Dependencies]
    N --> O[Run Jest Tests]
    O --> P{Event Type?}
    P -->|Pull Request| Q[Generate Coverage Report<br/>Comment on PR]
    P -->|Push| R[Tests Pass/Fail]

    E --> S[Checkout Code]
    S --> T[Setup Node.js & PNPM]
    T --> U[Install Dependencies]
    U --> V{Event Type?}
    V -->|Pull Request| W[Run TypeScript Check with Reviewdog<br/>Annotate PR]
    V -->|Push| X[Run TypeScript Check<br/>Fail on Errors]
```

### **Decision Tree:**

```
Does page NEED this data to render?
├─ YES → Use loader + useSuspenseQuery
└─ NO → Ask: When should it load?
    ├─ On user action (click/hover) → useQuery with enabled
    ├─ After other data loads → useQuery with dependent query
    ├─ Based on search/filter → useQuery with dynamic params
    └─ Real-time updates → useQuery with refetchInterval
```

**Use Suspense:**

```
✅ Route-level data (loaded in loader)
✅ Independent page sections (progressive loading)
✅ Cleaner code (no loading state boilerplate)
✅ Multiple components sharing same query
```

**Use useQuery + isLoading:**

```
✅ User-triggered (search, filters, tabs)
✅ Conditional fetching (enabled: boolean)
✅ Need explicit loading control
✅ Polling/refetching scenarios
```

## Optimized Data Fetching with Suspense

```tsx
// routes/_auth/dashboard.tsx

export const Route = createFileRoute('/_auth/dashboard')({
  loader: async ({ context }) => {
    const statsPromise = context.queryClient.ensureQueryData(statsQueryOptions)
    context.queryClient.prefetchQuery(tasksQueryOptions)
    context.queryClient.prefetchQuery(activityQueryOptions)
    context.queryClient.prefetchQuery(recentUsersQueryOptions)
    await statsPromise
  },
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsGrid />
      </Suspense>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <Suspense fallback={<TasksListSkeleton />}>
            <TasksList />
          </Suspense>
        </div>

        <div className="col-span-4">
          <Suspense fallback={<ActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <RecentUsers />
      </Suspense>
    </div>
  )
}
```

### Component Implementations

```tsx
function StatsGrid() {
  const { data: stats } = useSuspenseQuery(statsQueryOptions)
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total" value={stats.total} />
      <StatCard title="Active" value={stats.active} />
      <StatCard title="Pending" value={stats.pending} />
      <StatCard title="Completed" value={stats.completed} />
    </div>
  )
}
```

### Skeleton Loaders

```tsx
function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
      ))}
    </div>
  )
}
```

## Loading Timeline Comparison

| Without Suspense       | With Suspense                     |
| ---------------------- | --------------------------------- |
| 0-1500ms: Blank screen | 0ms: Stats skeleton               |
| 1500ms: Full dashboard | 200ms: Stats loaded               |
| User sees: Delay ❌    | 400ms: Tasks loaded               |
|                        | 600ms: Activity loaded            |
|                        | User sees: Progressive content ✅ |
