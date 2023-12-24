import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

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

export const EXCEPTION_404_ROUTE: RouteRecordRaw = {
  path: '/404',
  component: () => import('@/views/404.vue')
}

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  component: () => import('@/views/login.vue')
}

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  redirect: '/404'
}
