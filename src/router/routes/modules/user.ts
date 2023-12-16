import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const USER_ROUTE: RouteRecordRaw = {
  path: '/user',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'User',
      component: () => import('@/views/user.vue'),
      meta: {
        title: '个人中心',
        icon: 'User'
      }
    }
  ]
}

export default USER_ROUTE
