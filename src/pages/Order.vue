<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const orderData = ref({
  Name: '',
  Currency: '',
  Number: '',
  Country: '',
  PostalCode: '',
})
</script>

<template>
  <div
    class="flex flex-col bg-black font-raleway text-white items-start px-20 py-20 gap-6 min-w-[40%] items-center"
    v-auto-animate
  >
    <div class="gap-4 flex flex-col">
      <router-link to="/" class="flex justify-center w-full">
        <span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white"
          >21</span
        >
      </router-link>
      <span class="text-xl">Давайте скорее оформим!</span>
    </div>

    <!--     <ErrorMassege :error="error" @clear="error = ''" /> -->

    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Ваше имя</span>
      <input
        v-model="orderData.Name"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Номер телефона</span>
      <input
        v-model="orderData.Number"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Страна</span>
      <input
        v-model="orderData.Country"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Код региона</span>
      <input
        v-model="orderData.PostalCode"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Валюта</span>
      <input
        v-model="orderData.Currency"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="ivan.ivanov@pochta.ru"
      />
    </div>
  </div>
</template>
