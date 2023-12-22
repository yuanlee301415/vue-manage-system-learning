import type {LoginParams} from "#/index";

import {defineStore} from 'pinia'
import {store} from '@/store'
import { useTagsState } from "@/store/modules/tags";
import User from '@/models/User'
import {getAuthUserApi, loginApi} from '@/api/rights'
import { setAuthToken, removeAuthToken } from "@/utils/auth";

interface UserState {
    authUser: Nullable<User>
}


export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        authUser: null
    }),

    actions: {
        setAuthUser(data: User | null) {
            console.log('setAuthUser>data:', data)
            this.authUser = data
        },

        async getAuthUser() {
            const res = await getAuthUserApi()
            if (!res.data) {
                throw new Error('获取用户信息错误')
            }
            this.setAuthUser(new User(res.data))
        },

        async logIn(data: LoginParams) {
            const res = await loginApi(data)
            const token = res.data?.access_token
            if (!token) {
                throw '登录失败'
            }
            setAuthToken(res.data.access_token)
            return token
        },

        async logOut() {
            const tags = useTagsState()
            tags.closeAll()
            removeAuthToken()
            this.setAuthUser(null)
        }
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
