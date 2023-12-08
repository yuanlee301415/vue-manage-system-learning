import { ROOT_ROUTE, HOME_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import TABLE_ROUTE from '@/router/routes/modules/table'
import TABS_ROUTE from "@/router/routes/modules/tabs";
import FORM_ROUTE from "@/router/routes/modules/form";
// import ABOUT_ROUTE from '@/router/routes/modules/about'
// import TEST_ROUTE from '@/router/routes/modules/test'
// import NESTED_ROUTE from '@/router/routes/modules/nested'

export const basicRoutes = [
  ROOT_ROUTE,
  HOME_ROUTE,
  TABLE_ROUTE,
  TABS_ROUTE,
  FORM_ROUTE,
  // ABOUT_ROUTE,
  // TEST_ROUTE,
  // NESTED_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
