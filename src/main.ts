import './assets/main.css'
import './style/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import vant from 'vant'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia().use(persist)).use(router).use(vant).mount('#app')
