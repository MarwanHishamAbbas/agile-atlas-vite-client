import API from '../axios-client'
import type {
  CreateProjectDTO,
  GetProjectRequest,
  Project,
  ProjectList,
  ProjectWithWorkspace,
} from '@/@types/project'

import type { AxiosResponse } from 'axios'

export const createProjectFn = async (
  data: CreateProjectDTO,
): Promise<AxiosResponse<{ message: string; createdProject: Project }>> => {
  return await API.post(`/project/${data.workspace_id}/create`, data)
}

export const updateProjectFn = async (data: {
  project_id: string
  name: string
}): Promise<AxiosResponse<{ message: string }>> => {
  return await API.put(`/project/${data.project_id}`, data)
}

export const getProjectsListFn = async (data: {
  workspace_id: string
}): Promise<AxiosResponse<Array<ProjectList>>> => {
  return await API.get(`/project/${data.workspace_id}`)
}

export const getProjectFn = async (
  data: GetProjectRequest,
): Promise<AxiosResponse<ProjectWithWorkspace>> => {
  return await API.get(`/project/${data.workspace_id}/${data.project_id}`)
}
