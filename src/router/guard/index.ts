import type { Router } from 'vue-router'

import { createPermissionGuard } from '@/router/guard/permission'
import { titleGuard } from '@/router/guard/title'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
  titleGuard(router)
}
