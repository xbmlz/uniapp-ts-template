import { createSSRApp } from 'vue'
// https://vkuviewdoc.fsq.pub/
import uView from './uni_modules/vk-uview-ui'
import App from './App.vue'
import store from './store'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uView)
  return {
    app,
  }
}
