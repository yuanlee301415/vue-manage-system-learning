import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from '@/store'
import 'element-plus/dist/index.css'
import './assets/main.less'

function bootstrap() {
  const app = createApp(App)
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  setupRouter(app)
  setupStore(app)
  app.mount('#app')
}

bootstrap()
