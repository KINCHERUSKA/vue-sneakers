import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import api from './axios'

import App from './App.vue'
import Home from './pages/Home.vue'
import Drawer from './pages/Drawer.vue'
import Favorites from './pages/Favorites.vue'
import store from './store'
import My from './pages/My.vue'
import Registration from './pages/Registration.vue'
import LogIn from './pages/LogIn.vue'
import MainLayout from './Layouts/MainLayout.vue'
import AuthLayout from './Layouts/AuthLayout.vue'
import PostRegistration from './pages/PostRegistration.vue'
import ResetPassword from './pages/resetPassword.vue'
import Order from './pages/Order.vue'
import SetNewPassword from './pages/SetNewPassword.vue'
import Sneaker from './pages/Sneaker.vue'
import SetNewEmail from './pages/SetNewEmail.vue'
import EmailChange from './pages/EmailChange.vue'

const app = createApp(App)

app.config.globalProperties.$axios = api

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'drawer', name: 'Drawer', component: Drawer },
      { path: 'favorites', name: 'Favorites', component: Favorites },
      { path: 'my', name: 'lk', component: My },
      {
        path: '/catalog',
        name: 'Catalog',
        component: () => import('./pages/Catalog.vue'),
      },
      {
        path: '/catalog/:gender',
        name: 'CatalogGender',
        component: () => import('./components/CatalogItems/CatalogGender.vue'),
      },
      {
        path: 'Sneaker',
        name: 'Sneaker',
        component: Sneaker,
        props: (route) => ({
          id: Number(route.query.id),
        }),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'registration', name: 'registration', component: Registration },
      { path: 'login', name: 'login', component: LogIn },
      {
        path: 'pr',
        name: 'postregistration',
        component: PostRegistration,
        props: (route) => ({
          text: route.query.text || 'И все готово!',
        }),
      },
      { path: 'resetPassword', name: 'resetPassword', component: ResetPassword },
      { path: 'order', name: 'order', component: Order },
      { path: 'newPassword', name: 'newPassword', component: SetNewPassword },
      { path: 'newEmail', name: 'newEmail', component: SetNewEmail },
      { path: 'newEmailQuery', name: 'newEmailQuery', component: EmailChange },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

  // Если есть токен, обновляем заголовок
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Проверяем необходимость авторизации
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/auth/login')
  } else {
    next()
  }
})

app.use(router)
app.use(store)
app.use(autoAnimatePlugin)

app.mount('#app')
