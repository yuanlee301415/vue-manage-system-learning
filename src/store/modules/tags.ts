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
      /**
       * 通过不定义路由的 `name`(eg. 404 页面)，使其不显示在快捷导航标签列表中
       */
      if (!tag.name) return;
      if (this.list.find(_ => _.name === tag.name)) return
      this.list.push({ title: tag.title, name: tag.name, path: tag.path })
    },

    /**
     * @return {TagItem} tag 下一个可用的标签
     */
    closeTag(tag: TagItem): TagItem | void {
      if (this.list.length === 1) return;
      const idx = this.list.indexOf(tag)
      if (idx === -1) return
      this.list.splice(idx, 1)
      return this.list[idx % this.list.length]
    },

    closeOther(currName: string) {
      if (this.list.length === 1) return;
      const curr = this.list.filter(_ => _.name === currName)
      if (!curr.length) return;
      this.list = curr
    },

    closeAll() {
      this.list = []
    }
  }
})
