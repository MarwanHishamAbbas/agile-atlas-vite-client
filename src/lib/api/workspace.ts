import API from '../axios-client'

import type { AxiosResponse } from 'axios'

interface Member {
  name: string
  email: string
  joined_at: string
  role: 'OWNER' | 'MEMBER' | 'ADMIN'
}

interface Workspace {
  id: string
  name: string
  owner_id: string
  color: string
  created_at: string
  updated_at: string
  owner_name: string
  user_role: 'OWNER' | 'MEMBER' | 'ADMIN'
  members: Array<Member>
}

interface UserWorkspacesResponse extends Array<Workspace> {}

export const getUserWorkspacesFn = async (): Promise<
  AxiosResponse<UserWorkspacesResponse>
> => {
  return await API.get('/workspace/')
}

export const createWorkspaceFn = async (data: {
  name: string
}): Promise<AxiosResponse<Workspace>> => {
  return await API.post('/workspace/create', data)
}
