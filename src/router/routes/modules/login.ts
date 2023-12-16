import type { RouteRecordRaw } from 'vue-router'

const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  component: () => import('@/views/login.vue')
}

export default LOGIN_ROUTE
