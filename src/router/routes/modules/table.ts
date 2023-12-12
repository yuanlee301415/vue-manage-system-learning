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
      name: 'Common',
      component: () => import('@/views/table/Common.vue'),
      meta: {
        title: '常用表格'
      }
    },
    {
      path: 'import',
      name: 'Import',
      component: () => import('@/views/table/Import.vue'),
      meta: {
        title: '导入 Excel'
      }
    },
    {
      path: 'export',
      name: 'Export',
      component: () => import('@/views/table/Export.vue'),
      meta: {
        title: '导出 Excel'
      }
    }
  ]
}

export default TABLE_ROUTE
