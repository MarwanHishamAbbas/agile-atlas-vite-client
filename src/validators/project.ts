import z from 'zod'

// Create Project
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(255, 'Project name must be less than 255 characters')
    .trim(),
  description: z.string().max(2000, 'Description too long').optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
