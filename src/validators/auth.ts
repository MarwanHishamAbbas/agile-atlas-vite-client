import z from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),

    email: z.email().trim(),
    password: z.string().trim().min(1, {
      message: 'Password is required',
    }),
    confirmPassword: z.string().trim().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(6, {
    message: 'Password is required',
  }),
  remember: z.boolean(),
})

export const forgotPasswordSchema = z.object({
  email: z.email().trim(),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(1, {
      message: 'Password is required',
    }),
    confirmPassword: z.string().trim().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
