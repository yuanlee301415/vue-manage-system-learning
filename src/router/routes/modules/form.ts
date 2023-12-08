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
      component: () => import('@/views/form/Upload.vue'),
      meta: {
        title: '文件上传'
      }
    },
    {
      path: 'editor',
      name: 'Editor',
      redirect: '/form/editor/rich-text',
      meta: {
        title: '三级菜单'
      },
      children: [
        {
          path: 'rich-text',
          name: 'RichText',
          component: () => import('@/views/form/editor/RichText.vue'),
          meta: {
            title: '富文本编辑器'
          }
        },
        {
          path: 'markdown',
          name: 'Markdown',
          component: () => import('@/views/form/editor/Markdown.vue'),
          meta: {
            title: 'Markdown 编辑器'
          }
        },
      ]
    }
  ]
}

export default FORM_ROUTE
