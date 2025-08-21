<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import axios from 'axios'
import ErrorMassege from '@/components/errorMassege.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const passwordInputType = ref('password')
const passwordValue = ref('')
const emailValue = ref('')
const rememberMe = ref('')
const error = ref('')

const store = useStore()

const sendData = async () => {
  if (!emailValue.value || !passwordValue.value) {
    error.value = 'Заполните все поля'
    return
  } else {
    try {
      const response = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/users', {
        user: emailValue.value,
        password: passwordValue.value,
        rememberMe: rememberMe.value,
      })

      store.commit('setLog', true)

      router.push('/')
    } catch (err) {
      if (err.response) {
        const status = err.response.status
        const data = err.response.data

        if (status === 401) {
          error.value = data.message || 'Неверный email или пароль'
        } else if (status === 404) {
          error.value = data.message || 'Аккаунт не существует'
        } else if (status === 403) {
          error.value = data.message || 'Аккаунт заблокирован. Обратитесь в поддержку'
        } else if (status === 500) {
          error.value = data.message || 'Сервер временно недоступен'
        } else {
          error.value = 'Непредвиденная ошибка'
        }
      }
    }
  }
}

const onClickShowPass = () => {
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div
    class="flex flex-col bg-black font-raleway text-white items-start px-20 py-20 gap-6 min-w-[40%] items-center"
    v-auto-animate
  >
    <router-link to="/" class="flex justify-center w-full">
      <span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white"
        >21</span
      >
    </router-link>

    <ErrorMassege :error="error" @clear="error = ''" />

    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Почта</span>
      <input
        v-model="emailValue"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>

    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Пароль</span>
      <input
        v-model="passwordValue"
        :type="passwordInputType"
        placeholder="Что то серкетное"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      />
      <transition name="fade">
        <div
          v-if="passwordValue.length > 0"
          class="flex items-center mt-1 transition-all duration-300"
        >
          <input
            class="mr-2 w-4 h-4 cursor-pointer"
            type="checkbox"
            id="opt-in"
            @change="onClickShowPass"
          />
          <label for="opt-in" class="cursor-pointer select-none">Показать пароль</label>
        </div>
      </transition>
    </div>

    <router-link to="/auth/resetPassword" class="w-full">
      <span>Восстановить пароль</span>
    </router-link>
    <div class="flex items-center w-full">
      <input
        v-model="rememberMe"
        class="mr-2 w-4 h-4 cursor-pointer"
        type="checkbox"
        id="rem"
        @change="onClickShowPass"
      />
      <label for="rem" class="cursor-pointer select-none">Запомнить меня</label>
    </div>

    <button
      @click="sendData()"
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Войти
    </button>

    <div class="flex gap-4 justify-between w-full">
      <img src="/public/icons8-google-30.png" alt="" class="w-6 h-6 cursor-pointer" />
      <img src="/public/Inst-icon.svg" alt="" class="w-6 h-6 cursor-pointer" />
      <img src="/public/Facebook-icon.svg" alt="" class="w-6 h-6 cursor-pointer" />
      <img src="/public/github-mark-white.svg" alt="" class="w-6 h-6 cursor-pointer" />
    </div>

    <div class="w-full gap-2 flex flex-col">
      <span class="text-lg w-full text-center">Хей, впервые тут?</span>

      <router-link to="/auth/registration">
        <button
          class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Регистрация
        </button>
      </router-link>
    </div>
  </div>
</template>

<style setup>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
