import { env } from '@/env'
import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

interface ApiErrorResponse {
  error_code: string
  message: string
  status_code: number
}

const createAxiosClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return client
}

const API = createAxiosClient(env.VITE_API_BASE_URL || '')
export const APIRefresh = createAxiosClient(env.VITE_API_BASE_URL || '')

// Separate refresh client - no interceptors to avoid infinite loops
APIRefresh.interceptors.response.use((response) => response)

// Track if we're currently refreshing to avoid multiple refresh calls
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If error is not 401 or request is already retried, reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error.response?.data || error)
    }

    if (isRefreshing) {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(() => {
          return API(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      // Attempt to refresh the token
      await APIRefresh.get('/auth/refresh')

      // Refresh successful, process queued requests
      processQueue(null, null)

      // Retry the original request
      return API(originalRequest)
    } catch (refreshError) {
      // Refresh failed, reject all queued requests
      processQueue(refreshError as AxiosError, null)

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default API
