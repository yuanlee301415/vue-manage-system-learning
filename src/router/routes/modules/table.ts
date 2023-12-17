import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/router/constant'

const TABLE_ROUTE: RouteRecordRaw = {
  path: '/table',
  component: LAYOUT,
  redirect: '/table/common',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'Grid'
  },
  children: [
    {
      path: 'common',
      name: 'TableCommon',
      component: () => import('@/views/table/common.vue'),
      meta: {
        title: '常用表格'
      }
    },
    {
      path: 'import',
      name: 'TableImport',
      component: () => import('@/views/table/import.vue'),
      meta: {
        title: '导入 Excel'
      }
    },
    {
      path: 'export',
      name: 'TableExport',
      component: () => import('@/views/table/export.vue'),
      meta: {
        title: '导出 Excel'
      }
    }
  ]
}

export default TABLE_ROUTE
