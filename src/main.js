import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import Home from './pages/Home.vue'
import Drawer from './pages/Drawer.vue'
import Favorites from './pages/Favorites.vue'
import store from './store'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/drawer', name: 'Drawer', component: Drawer },
  { path: '/favorites', name: 'Favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(store)
app.use(autoAnimatePlugin)

app.mount('#app')
