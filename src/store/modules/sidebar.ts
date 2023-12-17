import { defineStore } from 'pinia'
import { store } from '@/store'

type SidebarState = {
  collapsed: boolean
}

export const useSidebarState = defineStore({
  id: 'sidebar',
  state: (): SidebarState => ({
    collapsed: window.localStorage.getItem('sidebar') === 'true'
  }),
  actions: {
    collapse() {
      this.collapsed = !this.collapsed
      window.localStorage.setItem('sidebar', JSON.stringify(this.collapsed))
    }
  }
})

