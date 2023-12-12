import type { RouteRecordRaw } from 'vue-router'

import { PAGE_NOT_FOUND_NAME, LAYOUT, EXCEPTION_404 } from '@/router/constant'

export const ROOT_ROUTE: RouteRecordRaw = {
  path: '/',
  redirect: '/dashboard'
}

export const HOME_ROUTE: RouteRecordRaw = {
  path: '/dashboard',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: {
        title: '首页',
        icon: 'Odometer'
      }
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_404
    }
  ]
}
