import {defineStore} from 'pinia'

import {store} from '@/store'
import User from '@/models/User'
import {getUserInfoApi} from '@/api/user'

interface UserState {
    userInfo: Nullable<User>
    token?: string
    lastUpdateTime?: number
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        userInfo:
            import.meta.env.VITE_PERMISSION && JSON.parse(import.meta.env.VITE_PERMISSION)
                ? null
                : new User({
                    "id": void 0 as unknown as string,
                    "username": "Admin",
                    "displayName": "超级管理员",
                    "email": "-",
                    "mobile": "-",
                    "password": "-",
                    "amount": 99999,
                    "address": "广东省东莞市长安镇",
                    "state": 1,
                    "avatar": "/logos/alipay.png",
                    "signature": "暂无"
                }),
        token: undefined,
        lastUpdateTime: undefined
    }),

    getters: {
        getUserInfo(): User {
            return this.userInfo ?? (Object.create(null) as User)
        }
    },

    actions: {
        setUserInfo(userInfo: User | null) {
            this.userInfo = userInfo
            this.lastUpdateTime = Date.now()
        },

        async getUserInfoAction() {
            const data = new User(await getUserInfoApi())
            console.log('getUserInfoAction>data:', data)
            this.setUserInfo(data)
            return data
        }
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
