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
                    "id": 0,
                    "name": "Admin",
                    "money": 9999999,
                    "address": "广东省东莞市长安镇",
                    "state": 1,
                    "date": 1675180800000,
                    "avatar": "/logos/alipay.png",
                    "desc": "暂无"
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
