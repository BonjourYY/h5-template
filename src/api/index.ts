// import { clearToken, getToken } from '@/utils/token'
// import { wxAuth } from '@/utils/wxAuth'
import axios from 'axios'
import { closeToast, showFailToast, showLoadingToast } from 'vant'

let pendingRequests = 0

// 显示加载指示器
function showLoading() {
  pendingRequests++
  // 当第一个请求发起时，显示 loading
  if (pendingRequests === 1) {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true, // 禁止背景点击
      duration: 0, // 持续显示，直到手动关闭
    })
  }
}

// 隐藏加载指示器
function hideLoading() {
  pendingRequests--
  // 当所有请求都结束后，关闭 loading
  if (pendingRequests === 0) {
    closeToast()
  }
}

// 创建 Axios 实例
const HTTP = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'CG-App-ID': '',
    'CG-Client-Type': '',
    'CG-Client-Version': '',
    'CG-Client-Build': '',
    'CG-Device-ID': '',
    'CG-Device-Model': '',
    'CG-Device-OS': '',
    'CG-Device-OS-Version': '',
    'CG-User-ID': '',
    'CG-Request-ID': '',
    'CG-Timestamp': '',
    'CG-API-Version': '',
    'CG-Signature': '',
    'CG-Nonce': '',
    'CG-Client-lD': '',
  },
})

// 请求拦截器
HTTP.interceptors.request.use(
  (config) => {
    showLoading()

    // const token = getToken()
    // if (token && config.headers) {
    //   config.headers.set('Authorization', `Bearer ${token}`)
    // }
    return config
  },
  (error) => {
    hideLoading()
    showFailToast('请求发送失败')
    return Promise.reject(error)
  },
)

// 响应拦截器
HTTP.interceptors.response.use(
  (response) => {
    hideLoading()
    const res = response.data
    return res
  },
  (error) => {
    hideLoading()
    if (error.response) {
      const status = error.response.status

      if (status === 500) {
        showFailToast('服务器错误')
        return
      }

      showFailToast({
        message: `${error.response.data.statusCode} ${error.response.data.message}`,
        wordBreak: 'break-word',
      })

      // 401 状态码特殊处理：清除登录信息并跳转到登录页
      if (status === 401) {
        // 这里需要引入清除 token 的方法
        clearToken()
        wxAuth()
      }
    } else if (error.request) {
      // 请求已发出但未收到响应
      showFailToast('网络连接失败，请检查网络')
    } else {
      // 请求配置发生错误
      showFailToast(error.message || '请求失败，请稍后重试')
    }
    return Promise.reject(error)
  },
)

export { HTTP }
