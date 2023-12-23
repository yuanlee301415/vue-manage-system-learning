import type {LoginParams} from "#/index";

import {defineStore} from 'pinia'
import {store} from '@/store'
import { useTagsState } from "@/store/modules/tags";
import User from '@/models/User'
import {getAuthUserApi, loginApi} from '@/api/rights'
import { setAuthToken, removeAuthToken } from "@/utils/auth";
import { usePermissionStateWithOut } from "@/store/modules/permission";

interface UserState {
    authUser: User
}

const permission = usePermissionStateWithOut()

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        authUser: new User()
    }),

    actions: {
        async getAuthUser() {
            const res = await getAuthUserApi()
            if (!res.data) {
                throw new Error('获取用户信息异常')
            }
            this.authUser = new User(res.data)
            return this.authUser
        },

        async logIn(data: LoginParams) {
            const res = await loginApi(data)
            const token = res.data?.access_token
            if (!token) {
                throw new Error('登录异常')
            }
            setAuthToken(res.data.access_token)
            permission.resetRoutes()
            return token
        },

        async logOut() {
            const tags = useTagsState()
            tags.closeAll()
            removeAuthToken()
            this.$reset()
        }
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
