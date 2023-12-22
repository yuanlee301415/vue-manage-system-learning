import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT, EXCEPTION_404 } from '@/router/constant'

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

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  component: () => import('@/views/redirect.vue')
}

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  component: LAYOUT,
  children: [
    {
      path: '',
      component: EXCEPTION_404
    }
  ]
}
