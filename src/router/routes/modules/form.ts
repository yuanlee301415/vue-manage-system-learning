import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const FORM_ROUTE: RouteRecordRaw = {
  path: '/form',
  component: LAYOUT,
  redirect: '/form/basic',
  meta: {
    title: '表单',
    icon: 'Edit'
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/form/Basic.vue'),
      meta: {
        title: '基本表单'
      }
    },
    {
      path: 'upload',
      name: 'Upload',
      meta: {
        title: '文件上传'
      },
      children: [
        {
          path: 'single',
          name: 'Single',
          component: () => import('@/views/form/upload/Single.vue'),
          meta: {
            title: '单文件上传'
          }
        },
        {
          path: 'multi',
          name: 'Multi',
          component: () => import('@/views/form/upload/Multi.vue'),
          meta: {
            title: '多文件上传'
          }
        },
      ]
    }
  ]
}

export default FORM_ROUTE
