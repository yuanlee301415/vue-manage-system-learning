import type { AxiosResponse } from 'axios'
import type { Result } from '#/axios'

import axios from 'axios'
import { ElNotification } from 'element-plus'
import { getAuthToken } from '@/utils/auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 20
})

const whiteList = [/rights\/login/]

export default request

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (whiteList.some((_) => _.test(config.url!))) return config
    config.headers.Authorization = 'Bearer ' + getAuthToken()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  // @ts-ignore
  function (response: AxiosResponse<Result>): Result {
    const data = response.data
    if (data.code !== 0) {
      ElNotification.error({
        message: data.message,
        showClose: false
      })
    }
    return data
  },
  function (error) {
    console.log('response>error:\n')
    console.dir(error)
    if (error.response && error.response.status !== 401) {
      ElNotification.error({
        message: error.response.data.message,
        showClose: false
      })
    }
    return Promise.reject(error)
  }
)
