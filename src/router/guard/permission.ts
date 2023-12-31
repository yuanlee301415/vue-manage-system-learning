import type { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { getAuthToken } from '@/utils/auth'
import { LOGIN_ROUTE, REDIRECT_ROUTE, EXCEPTION_404_ROUTE } from '@/router/routes/basic'
import { usePermissionStateWithOut } from '@/store/modules/permission'

const whiteList = [LOGIN_ROUTE.path, REDIRECT_ROUTE.path, EXCEPTION_404_ROUTE.path]
const permissionState = usePermissionStateWithOut()

// 权限
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to, from) => {
    const authToken = getAuthToken()

    if (!authToken) {
      if (whiteList.includes(to.path)) return true
      await userStore.logOut()
      return { path: LOGIN_ROUTE.path, query: { redirect: to.path } }
    }

    if (to.path === LOGIN_ROUTE.path) return from.path ?? '/'

    if (userStore.authUser.username) return true

    try {
      const user = await userStore.getAuthUser()
      permissionState.generateRoutes(user?.roles)
    } catch (e) {
      console.error('createPermissionGuard>error:')
      console.log(e)
      await userStore.logOut()
      return { path: LOGIN_ROUTE.path, query: { redirect: to.path } }
    }

    /**
     * 强制跳转
     */
    return { ...to, replace: true }
  })
}
