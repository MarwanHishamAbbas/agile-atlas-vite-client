import z from 'zod'

export const workspaceNameSchema = z.object({
  name: z.string().trim().min(1, 'Workspace name is required'),
})
