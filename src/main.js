/* eslint-disable no-undef */
import { createApp } from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import router from './router'
// eslint-disable-next-line no-unused-vars
import { createPinia } from 'pinia'
import '@/assets/css/main.css'



const app = createApp(App)
if (import.meta.env.MODE === 'development') {
  import('vue-devtools-kit').then((devtools) => {
    devtools.init();
  });
}
app.mount('#app')
