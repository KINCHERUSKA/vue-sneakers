<script setup>
import axios from 'axios'
import { ref } from 'vue'
import PostRegistration from './PostRegistration.vue'
import ErrorMassege from '@/components/errorMassege.vue'

const error = ref('')

const emailRecover = ref('')
const isPosted = ref(false)

const sendEmail = async () => {
  if (!emailRecover.value) {
    error.value = 'Заполните все поля'
    return
  } else {
    try {
      const response = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/passwordReset', {
        email: emailRecover.value,
      })
      isPosted.value = true
    } catch (err) {
      if (err.response) {
        const status = err.response.status
        const data = err.response.data

        if (status === 400) {
          error.value = data.message || 'Введите коррекнтый пароль'
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
</script>

<template>
  <div
    v-if="!isPosted"
    class="flex flex-col bg-black font-raleway text-white items-center px-20 py-20 gap-6 min-w-[40%]"
    v-auto-animate
  >
    <div class="flex items-baseline gap-4 w-full">
      <router-link to="/auth/login">
        <img src="/arrow-right.svg" alt="" class="scale-x-[-1] w-4 h-4" />
      </router-link>
      <span class="font-bold text-xl w-full">Почта</span>
    </div>

    <ErrorMassege :error="error" @clear="error = ''" />

    <input
      v-model="emailRecover"
      placeholder="ivan.ivanov@pochta.ru"
      class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
    />

    <button
      @click="sendEmail()"
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Восстановить
    </button>
  </div>
  <div v-else>
    <PostRegistration />
  </div>
</template>
