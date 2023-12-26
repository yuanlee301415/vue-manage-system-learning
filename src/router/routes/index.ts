import { ROOT_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, EXCEPTION_404_ROUTE } from '@/router/routes/basic'
import TABLE_ROUTE from '@/router/routes/modules/table'
import TABS_ROUTE from '@/router/routes/modules/tabs'
import FORM_ROUTE from '@/router/routes/modules/form'
import PERMISSION_ROUTE from '@/router/routes/modules/permission'
import USER_ROUTE from '@/router/routes/modules/user'
// import ABOUT_ROUTE from '@/router/routes/modules/about'
// import TEST_ROUTE from '@/router/routes/modules/test'
// import NESTED_ROUTE from '@/router/routes/modules/nested'

export const basicRoutes = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  EXCEPTION_404_ROUTE,
  REDIRECT_ROUTE
]

export const asyncRoutes = [
  TABLE_ROUTE,
  TABS_ROUTE,
  FORM_ROUTE,
  USER_ROUTE,
  PERMISSION_ROUTE,
  // ABOUT_ROUTE,
  // TEST_ROUTE,
  // NESTED_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
]
