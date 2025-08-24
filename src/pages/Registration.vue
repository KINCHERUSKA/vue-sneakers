<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import ErrorMassege from '@/components/errorMassege.vue'

const router = useRouter()
const error = ref('')
const passwordChek = ref('')

const regData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const chekPasswordLength = () => {
  if (regData.value.password.length < 8) {
    error.value = 'Пароль должен содержать не менее 8 символов'
    return
  }
}

const chekPasswords = () => {
  if (regData.value.password != passwordChek.value) {
    error.value = 'Пароли не совпадают'
    return
  }
}

const sendData = async () => {
  if (regData.value.password === '' || regData.value.email === '') {
    error.value = 'Заполните обязательные поля'
    return
  } else {
    try {
      const response = await axios.post('https://localhost:7018/users', {
        email: regData.value.email,
        password: regData.value.password,
        firstName: regData.value.firstName,
        lastName: regData.value.lastName,
      })

      router.push('/auth/pr')
    } catch (err) {
      /*       console.log(err.response) */
      if (err.response) {
        const status = err.response.status
        const data = err.response.data

        if (status === 400) {
          error.value = data.message || 'Ошибка при регистрации пользователя'
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
    class="flex flex-col bg-black font-raleway text-white items-center px-20 py-20 gap-6 min-w-[40%] relative"
    v-auto-animate
  >
    <router-link to="/auth/login">
      <img
        src="/arrow-right.svg"
        alt=""
        class="scale-x-[-1] w-4 h-4 absolute top-[16%] z-20 left-20"
      />
    </router-link>
    <router-link to="/" class="flex justify-center">
      <span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white"
        >21</span
      >
    </router-link>

    <ErrorMassege :error="error" @clear="error = ''" />

    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Имя</span>
      <input
        v-model="regData.firstName"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="Иван"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Фамилия</span>
      <input
        v-model="regData.lastName"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="Иванов"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Почта</span>
      <input
        v-model="regData.email"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Пароль</span>
      <input
        @focusout="chekPasswordLength()"
        v-model="regData.password"
        type="password"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="Что то секретное"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Повторите пароль</span>
      <input
        @focusout="chekPasswords()"
        v-model="passwordChek"
        type="password"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="И еще раз для надежности"
      />
    </div>

    <button
      @click="sendData()"
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Зарегистрироваться
    </button>
  </div>
</template>
