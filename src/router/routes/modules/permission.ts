import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const PERMISSION_ROUTE: RouteRecordRaw = {
  path: '/permission',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission.vue'),
      meta: {
        title: '权限管理',
        icon: 'Warning'
      }
    }
  ]
}

export default PERMISSION_ROUTE
