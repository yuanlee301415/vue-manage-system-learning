import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const ABOUT_ROUTE: RouteRecordRaw = {
  path: '/about',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'About',
      component: () => import('@/views/About.vue'),
      meta: {
        title: '关于'
      }
    }
  ]
}

export default ABOUT_ROUTE
