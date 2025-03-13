/* eslint-disable no-undef */
import { createApp } from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import router from './router'
// eslint-disable-next-line no-unused-vars
import { createPinia } from 'pinia'
<<<<<<< HEAD
import '@/assets/css/main.css'



=======
import '@/assets/css/main.css' 

if (process.env.NODE_ENV === 'test') {

  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

>>>>>>> 5a2ae2a (cambios en tdd)
const app = createApp(App)
if (import.meta.env.MODE === 'development') {
  import('vue-devtools-kit').then((devtools) => {
    devtools.init();
  });
}
app.mount('#app')
