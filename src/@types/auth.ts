export interface User {
  id: string
  name: string
  email: string
  password: string
  is_email_verified: boolean
  created_at: Date
  updated_at: Date
  enable_2fa: boolean
  email_notification: boolean
  two_factor_secret: string | null
}

export interface UserPreferences {
  id: string
  user_id: string
  enable_2fa: boolean
  email_notification: boolean
  two_factor_secret: string | null
}

export interface Session {
  id: string
  user_id: string
  user_agent: string | null
  created_at: Date
  expires_at: Date
}

export type VerificationType = 'EMAIL_VERIFICATION' | 'PASSWORD_RESET'

export interface Verification {
  id: string
  user_id: string
  code: string
  type: VerificationType
  created_at: Date
  expires_at: Date
}
