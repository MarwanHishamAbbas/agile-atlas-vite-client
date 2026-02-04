export interface Project {
  id: string
  workspace_id: string
  name: string
  description: string | null
  created_by: string
  created_at: Date
  updated_at: Date
  archived_at: Date | null
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
