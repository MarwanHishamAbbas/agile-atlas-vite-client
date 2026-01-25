import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/lib/axios-client'
import {
  createWorkspaceFn,
  getCurrentWorkspaceFn,
  getUserWorkspacesFn,
} from '@/lib/api/workspace'

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

export const currentWorkspaceQueryOptions = (workspaceId: string) => ({
  queryKey: ['workspace', workspaceId] as const,
  queryFn: () => getCurrentWorkspaceFn({ workspaceId }),
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  enabled: !!workspaceId, // Only run if workspaceId exists
})

const useWorkspace = () => {
  const queryClient = useQueryClient()
  const params = useParams({ strict: false }) // Get params from URL
  const workspaceId = params.workspace_id as string | undefined

  const userWorkspaces = useQuery({
    queryFn: getUserWorkspacesFn,
    queryKey: USER_WORKSPACES_QUERY_KEY,
  })

  // Get current workspace (from URL param)
  const currentWorkspace = useQuery({
    ...currentWorkspaceQueryOptions(workspaceId || ''),
    enabled: !!workspaceId, // Only fetch if workspaceId exists in URL
  })

  const createWorkspace = useMutation({
    mutationFn: createWorkspaceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_WORKSPACES_QUERY_KEY })
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.message)
    },
  })

  return {
    userWorkspaces: userWorkspaces,
    createWorkspace,
    currentWorkspace,
  }
}

export default useWorkspace
