import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
import { useCounterStore } from '../stores/counter'
import type { Data } from '../types/requert'
import { showToast } from 'vant'
import router from '../router'

const http = axios.create({
  baseURL: '/dev-api',
  timeout: 10000
})
const store = useCounterStore()

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user?.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code !== 10000) {
      showToast(response.data.message)
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    if (error.response.status == 401) {
      store.delUser()
      router.push(`/login?${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return http.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
