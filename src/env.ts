import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',

  client: {
    VITE_API_BASE_URL: z.string().min(1),
    VITE_APP_MODE: z.string().default(import.meta.env.MODE || 'development'),
  },

  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})

// Export mode directly
export const mode = import.meta.env.MODE || 'development'
