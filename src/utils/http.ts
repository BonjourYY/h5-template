import axios from 'axios'
import { clearToken, getToken } from './token'

// Create Axios Instance
const HTTP = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// Request Interceptor
HTTP.interceptors.request.use(
  (config) => {
    // 如果Token存在，则添加到请求头
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
HTTP.interceptors.response.use(
  // 2XX Status Code
  (response) => {
    return response
  },
  // 4XX, 5XX Status Code
  (error) => {
    if (error.status === 401) {
      clearToken()
    }
    return Promise.reject(error)
  },
)
