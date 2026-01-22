import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createWorkspaceFn, getUserWorkspacesFn } from '@/lib/api/workspace'

export const USER_WORKSPACES_QUERY_KEY = ['user-workspaces'] as const

export const userWorkspacesQueryOptions = {
  queryKey: USER_WORKSPACES_QUERY_KEY,
  queryFn: getUserWorkspacesFn,
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
}

const useWorkspace = () => {
  const queryClient = useQueryClient()

  const userWorkspaces = useQuery({
    queryFn: getUserWorkspacesFn,
    queryKey: USER_WORKSPACES_QUERY_KEY,
  })

  const createWorkspace = useMutation({
    mutationFn: createWorkspaceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_WORKSPACES_QUERY_KEY })
    },
  })

  return {
    userWorkspaces: userWorkspaces,
    createWorkspace,
  }
}

export default useWorkspace
