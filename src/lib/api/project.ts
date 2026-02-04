import API from '../axios-client'
import type { CreateProjectDTO, Project, ProjectList } from '@/@types/project'

import type { AxiosResponse } from 'axios'

export const createProjectFn = async (
  data: CreateProjectDTO,
): Promise<AxiosResponse<{ message: string; createdProject: Project }>> => {
  return await API.post(`/project/${data.workspace_id}/create`, data)
}

export const getProjectsList = async (data: {
  workspace_id: string
}): Promise<AxiosResponse<Array<ProjectList>>> => {
  return await API.get(`/project/${data.workspace_id}`)
}
