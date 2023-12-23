import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'
import {Role} from "@/enums/role";

const PERMISSION_ROUTE: RouteRecordRaw = {
  path: '/permission',
  component: LAYOUT,
  meta: {
    roles: [Role.ADMIN]
  },
  children: [
    {
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission.vue'),
      meta: {
        title: '权限管理',
        icon: 'Warning',
        roles: [Role.ADMIN]
      }
    }
  ]
}

export default PERMISSION_ROUTE
