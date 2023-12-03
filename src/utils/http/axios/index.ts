import type {AxiosResponse} from 'axios'
import type {Result} from '#/axios'

import axios from 'axios'
import {ElNotification} from "element-plus";

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
            ElNotification.error({
                message: data.message,
                showClose: false
            })
        }
        return data
    },
    function (error) {
        // console.log('response>error:\n', error)
        ElNotification.error({
            message: error.response.data.message,
            showClose: false
        })
        return Promise.reject(error)
    }
)

export default request
