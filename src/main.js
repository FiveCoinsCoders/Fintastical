/* eslint-disable no-undef */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/main.css' 

if (process.env.NODE_ENV === 'test') {

  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
