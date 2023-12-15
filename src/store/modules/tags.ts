import { defineStore } from 'pinia'

export type TagItem = {
  title: string
  name: string
  path: string
}

export const useTagsState = defineStore({
  id: 'tags',
  state: (): { list: TagItem[] } => ({
    list: []
  }),
  getters: {
    names: state => state.list.map(_ => _.name)
  },
  actions: {
    addTag(tag: TagItem) {
      if (this.list.find(_ => _.name === tag.name)) return
      this.list.push({ title: tag.title, name: tag.name, path: tag.path })
    },

    closeTag(tag: TagItem): TagItem | void {
      if (this.list.length === 1) return;
      const idx = this.list.indexOf(tag)
      if (idx === -1) return
      this.list.splice(idx, 1)
      return this.list[idx % this.list.length]
    },

    closeOther(currName: string) {
      if (this.list.length === 1) return;
      const rest = this.list.filter(_ => _.name === currName)
      if (!rest.length) return;
      this.list = rest
    },

    closeAll() {
      this.list = []
    }
  }
})
