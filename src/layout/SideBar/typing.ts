import type { RouteMeta } from 'vue-router'

export class MenuItem {
  index!: string
  meta!: RouteMeta
  children?: MenuItem[]
}
