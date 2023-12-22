import type { Router } from 'vue-router'

import { useUserStoreWithOut } from '@/store/modules/user'
import { getAuthToken } from "@/utils/auth";
import LOGIN_ROUTE from "@/router/routes/modules/login";
import {REDIRECT_ROUTE} from "@/router/routes/basic";

const whiteList = [LOGIN_ROUTE.path, REDIRECT_ROUTE.path]

// 权限
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async  (to, from, next) => {
    const authToken = getAuthToken()
    if (!authToken) {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        await userStore.logOut()
        next({ path: LOGIN_ROUTE.path, query: { redirect: to.path }})
      }
      return
    }
    if (to.path === LOGIN_ROUTE.path) {
      next(from.path ?? '/')
      return
    }

    if (userStore.authUser) {
      next()
      return
    }

    try {
      await userStore.getAuthUser()
    } catch (e) {
      await userStore.logOut()
      next({ path: LOGIN_ROUTE.path, query: { redirect: to.path }})
    }
    next()
  })
}

