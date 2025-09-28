import axios from 'axios'
import { getBackendUrl } from '@shared/utils/env'
import { tokenManager } from './auth/tokenManager'

const axiosClient = axios.create({
  baseURL: `${getBackendUrl()}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(async (config) => {
  const token = await tokenManager.ensureValidAccessToken()
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      tokenManager.clear()
      try {
        window.location.href = '/signin'
      } catch {}
    }
    return Promise.reject(error)
  }
)

export default axiosClient
