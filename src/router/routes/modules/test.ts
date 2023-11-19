import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const TEST_ROUTE: RouteRecordRaw = {
  path: '/test',
  component: LAYOUT,
  redirect: '/test/a',
  meta: {
    title: 'Test'
  },
  children: [
    {
      path: 'a',
      name: 'TestA',
      component: () => import('@/views/test/A.vue'),
      meta: {
        title: 'TestA'
      }
    },
    {
      path: 'b',
      name: 'TestB',
      component: () => import('@/views/test/B.vue'),
      meta: {
        title: 'TestB'
      }
    }
  ]
}

export default TEST_ROUTE
