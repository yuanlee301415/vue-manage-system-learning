import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const TABS_ROUTE: RouteRecordRaw = {
  path: '/tabs',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'Tabs',
      component: () => import('@/views/tabs/index.vue'),
      meta: {
        title: 'Tabs 选项卡',
        icon: 'DocumentCopy'
      }
    }
  ]
}

export default TABS_ROUTE
