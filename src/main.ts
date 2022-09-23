import { createSSRApp } from 'vue'
import uView from 'uview-ui'
import App from './App.vue'
import store from './store'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uView)
  return {
    app,
    store,
  }
}
