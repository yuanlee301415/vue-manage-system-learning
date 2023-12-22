import type { Result } from '#/axios'
import type {LoginParams, LoginResult} from '#/index'

import User from '@/models/User'
import request from '@/utils/http/axios'
import { HttpMethod } from '@/enums'

export function loginApi({ username, password}: LoginParams): Promise<LoginResult> {
    return request({
        url: `rights/login`,
        method: HttpMethod.POST,
        data: {
            username, password
        }
    })
}

export function getAuthUserApi(): Promise<Result<User>> {
    return request({
        url: `rights/authUser`
    })
}
