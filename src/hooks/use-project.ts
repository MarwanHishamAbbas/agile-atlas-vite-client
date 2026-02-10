import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/lib/axios-client'
import {
  createProjectFn,
  getProjectFn,
  getProjectsListFn,
  updateProjectFn,
} from '@/lib/api/project'

export const USER_PROJECTS_QUERY_KEY = ['user-projects'] as const

export const workspaceProjectsQueryOptions = (workspaceId: string) => ({
  queryKey: ['workspace-projects', workspaceId] as const,
  queryFn: () => getProjectsListFn({ workspace_id: workspaceId }),
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
})

export const getProjectQueryOptions = (
  workspaceId: string,
  projectId: string,
) => ({
  queryKey: ['project', workspaceId, projectId] as const,
  queryFn: () =>
    getProjectFn({ workspace_id: workspaceId, project_id: projectId }),
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
})

const useProject = () => {
  const queryClient = useQueryClient()
  const params = useParams({ strict: false }) // Get params from URL
  const { project_id, workspace_id } = params

  const currentProject = useQuery({
    ...getProjectQueryOptions(workspace_id || '', params.project_id || ''),
    enabled: !!workspace_id || !!params.project_id,
  })

  const createProject = useMutation({
    mutationFn: createProjectFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-projects', workspace_id],
      })
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.message)
    },
  })

  const updateProject = useMutation({
    mutationFn: updateProjectFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-projects', workspace_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['project', workspace_id, project_id],
      })
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.message)
    },
  })

  return {
    createProject,
    currentProject,
    updateProject,
  }
}

export default useProject
