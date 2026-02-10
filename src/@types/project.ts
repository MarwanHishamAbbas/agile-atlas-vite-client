export interface Project {
  id: string
  workspace_id: string
  name: string
  description: string | null
  created_by: string
  created_at: Date
  updated_at: Date
}

export interface GetProjectRequest {
  workspace_id: string
  project_id: string
}

export interface ProjectWithWorkspace extends Omit<Project, 'workspace_id'> {
  workspace: {
    id: string
    name: string
  }
}

export interface CreateProjectDTO {
  workspace_id: string | undefined
  name: string
  description?: string | null
}

export interface ProjectList {
  id: string
  name: string
}
