import type { AxiosResponse } from 'axios'
import type { Result } from '#/axios'

import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 20
})

// 添加响应拦截器
request.interceptors.response.use(
// @ts-ignore
  function (response: AxiosResponse<Result>): Result {
      const data = response.data
      if (data.code !== 0) {
          throw new Error(data.message ?? '系统异常')
      }
      return data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
