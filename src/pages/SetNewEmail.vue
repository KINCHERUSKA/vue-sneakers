<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import PostRegistration from './PostRegistration.vue'
import ErrorMassege from '@/components/errorMassege.vue'

const error = ref('')

const emailRecover = ref('')
const newPassword = ref('')
const isPosted = ref(false)

const email = ref('')
const token = ref('')
const id = ref('')

const passwordRecover = async () => {
  if (!emailRecover.value) {
    error.value = 'Заполните все поля'
    return
  } else {
    try {
      const response = await axios.post('https://localhost:7018/auth/confirm-email-change', {
        email: email.value,
        token: token.value,
        id: id.value,
      })
      isPosted.value = true
    } catch (err) {
      if (err.response) {
        const status = err.response.status
        const data = err.response.data

        if (status === 400) {
          error.value = data.message || 'Введите корректные данные'
        } else if (status === 404) {
          error.value = data.message || 'Аккаунт не существует'
        } else if (status === 500) {
          error.value = data.message || 'Сервер временно недоступен'
        } else {
          error.value = 'Непредвиденная ошибка'
        }
      }
    }
  }
}

onMounted(() => {
  // Проверяем наличие параметров в URL
  if (route.query.email && route.query.token && route.email.id) {
    email.value = route.query.email
    token.value = route.query.token
    id.value = route.query.id
  } else {
    error.value = 'Некорректная ссылка для восстановления пароля'
  }
})
</script>

<template>
  <div
    v-if="!isPosted"
    class="flex flex-col bg-black font-raleway text-white items-center px-20 py-20 gap-6 min-w-[40%]"
    v-auto-animate
  >
    <router-link to="/" class="flex justify-center">
      <span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white"
        >21</span
      >
    </router-link>

    <ErrorMassege :error="error" @clear="error = ''" />
    <div class="flex items-baseline gap-4 w-full">
      <span class="font-bold text-xl w-full">Почта</span>
    </div>

    <input
      v-model="emailRecover"
      placeholder="ivan.ivanov@pochta.ru"
      class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
    />
    <div class="flex items-baseline gap-4 w-full">
      <span class="font-bold text-xl w-full">Новый пароль</span>
    </div>
    <input
      v-model="newPassword"
      placeholder="что то менее серкетное)"
      class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
    />

    <button
      @click="passwordRecover()"
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Восстановить
    </button>
  </div>
  <div v-else>
    <PostRegistration :text="'Все заменили'" />
  </div>
</template>
