import z from 'zod'

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'First Name is required'),
    lastName: z.string().trim().min(1, 'Last Name is required'),
    phoneNumber: z.string().min(1).regex(/^\d+$/, {
      message: 'Phone number must contain only digits',
    }),

    email: z.email().trim().min(1, {
      message: 'Email is required',
    }),
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
  email: z.email().trim().min(1, {
    message: 'Email is required',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required',
  }),
})
