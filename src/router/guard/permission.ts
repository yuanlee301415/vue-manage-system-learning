import type { Router } from 'vue-router'

import { useUserStoreWithOut } from '@/store/modules/user'

// 权限
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    if (!userStore.getUserInfo?.username) {
      await userStore.getUserInfoAction()
    }
    next()
  })
}
