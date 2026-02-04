import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/lib/axios-client'
import { createProjectFn, getProjectsList } from '@/lib/api/project'

export const USER_PROJECTS_QUERY_KEY = ['user-projects'] as const

export const workspaceProjectsQueryOptions = (workspaceId: string) => ({
  queryKey: ['workspace-projects', workspaceId] as const,
  queryFn: () => getProjectsList({ workspace_id: workspaceId }),
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
})

const useProject = () => {
  const queryClient = useQueryClient()
  const params = useParams({ strict: false }) // Get params from URL
  const workspaceId = params.workspace_id as string

  // // Get current workspace (from URL param)
  // const currentWorkspace = useQuery({
  //   ...currentWorkspaceQueryOptions(workspaceId || ''),
  //   enabled: !!workspaceId, // Only fetch if workspaceId exists in URL
  // })

  const createProject = useMutation({
    mutationFn: createProjectFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-projects', workspaceId],
      })
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.message)
    },
  })

  return {
    createProject,
  }
}

export default useProject
