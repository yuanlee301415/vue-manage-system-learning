import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'
import { Role } from '@/enums/role'

const USER_ROUTE: RouteRecordRaw = {
  path: '/user',
  component: LAYOUT,
  meta: {
    roles: [Role.USER]
  },
  children: [
    {
      path: '',
      name: 'UserCenter',
      component: () => import('@/views/user.vue'),
      meta: {
        title: '个人中心',
        icon: 'User',
        roles: [Role.USER]
      }
    }
  ]
}

export default USER_ROUTE
