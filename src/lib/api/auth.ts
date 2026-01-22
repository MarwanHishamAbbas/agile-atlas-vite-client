import API from '../axios-client'
import type { User } from '@/@types/auth'

import type { AxiosResponse } from 'axios'

// ============= Request Types =============
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface VerifyEmailRequest {
  code: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  password: string
  verificationCode: string
}

export interface VerifyMFARequest {
  code: string
  secretKey: string
}

export interface MFALoginRequest {
  code: string
  email: string
}

// ============= Response Types =============
export interface Session {
  message: string
  _id: string
  userId: string
  userAgent: string
  createdAt: string
  expiresAt: string
  isCurrent: boolean
}

export interface CurrentSessionResponse {
  message: string
  session: Omit<User, 'password'> & {
    expires_at: string
    enable_2fa: boolean
    email_notification: boolean
    two_factor_secret: string | null
  }
}

export interface SessionsResponse {
  message: string
  sessions: Array<Session>
}

export interface MFASetupResponse {
  message: string
  secret: string
  qrImageUrl: string
}

export interface LoginResponse {
  message: string
  mfaRequired: boolean
  user: {
    id: string
    email: string
    name: string
  }
}
export interface RegisterResponse {
  message: string
  user: { email: string; name: string; id: string }
}

// ============= Auth API =============
export const loginMutationFn = async (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  return API.post('/auth/login', data)
}

export const registerMutationFn = async (
  data: RegisterRequest,
): Promise<AxiosResponse<RegisterResponse>> => {
  return API.post('/auth/register', data)
}

export const verifyEmailMutationFn = async (
  data: VerifyEmailRequest,
): Promise<AxiosResponse<{ message: string }>> => {
  return API.post('/auth/verify-email', data)
}

export const forgotPasswordMutationFn = async (
  data: ForgotPasswordRequest,
): Promise<AxiosResponse<{ message: string; email: string }>> => {
  return API.post('/auth/forgot-password', data)
}

export const resetPasswordMutationFn = async (
  data: ResetPasswordRequest,
): Promise<AxiosResponse<{ message: string }>> => {
  return API.post('/auth/reset-password', data)
}

export const logoutMutationFn = async (): Promise<
  AxiosResponse<{ message: string }>
> => {
  return API.post('/auth/logout')
}

// // ============= MFA API =============
// export const mfaSetupQueryFn = async (): Promise<MFASetupResponse> => {
//   const response = await API.get<MFASetupResponse>("/mfa/setup");
//   return response.data;
// };

// export const verifyMFAMutationFn = async (
//   data: VerifyMFARequest
// ): Promise<AxiosResponse<ApiResponse>> => {
//   return API.post("/mfa/verify", data);
// };

// export const verifyMFALoginMutationFn = async (
//   data: MFALoginRequest
// ): Promise<AxiosResponse<ApiResponse>> => {
//   return API.post("/mfa/verify-login", data);
// };

// export const revokeMFAMutationFn = async (): Promise<
//   AxiosResponse<ApiResponse>
// > => {
//   return API.put("/mfa/revoke", {});
// };

// // ============= Session API =============
export const getUserSessionQueryFn = async (): Promise<
  AxiosResponse<CurrentSessionResponse>
> => {
  return await API.get('/session/')
}

// export const sessionsQueryFn = async (): Promise<SessionsResponse> => {
//   const response = await API.get<SessionsResponse>("/session/all");
//   return response.data;
// };

// export const sessionDelMutationFn = async (
//   id: string
// ): Promise<AxiosResponse<ApiResponse>> => {
//   return API.delete(`/session/${id}`);
// };
