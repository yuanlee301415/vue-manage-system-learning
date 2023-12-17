import type { Router } from "vue-router";

// 页面标题
export function titleGuard(router: Router) {
    router.afterEach(to => {
        const title = [import.meta.env.VITE_APP_TITLE]
        to.meta?.title && title.unshift(to.meta.title as string)
        document.title = title.join(' | ')
    })
}
