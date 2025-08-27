<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'
import api from '@/axios' // ✅ Обязательно добавьте импорт

const store = useStore()
const router = useRouter()
const error = ref('')

const orderData = ref({
  name: '',
  currency: '',
  number: '',
  country: '',
  postalCode: '',
})

const card = computed(() => store.state.card)

const Send = async () => {
  try {
    // 1. Формируем cartItemQuantities как объект
    const cartItemQuantities = {}

    // Группируем товары по ID и считаем количество
    card.value.forEach((item) => {
      const productId = item.parentId
      cartItemQuantities[productId] = (cartItemQuantities[productId] || 0) + 1
    })

    // 2. Проверяем, есть ли товары в корзине
    if (Object.keys(cartItemQuantities).length === 0) {
      error.value = 'Ваша корзина пуста'
      return
    }

    // 3. Проверяем обязательные поля
    if (
      !orderData.value.name ||
      !orderData.value.number ||
      !orderData.value.country ||
      !orderData.value.postalCode
    ) {
      error.value = 'Заполните все обязательные поля'
      return
    }

    // 4. Формируем правильный payload
    const orderPayload = {
      cartItemQuantities, // ✅ Объект вида { "1": 2, "2": 1 }
      currency: orderData.value.currency || 'RUB',
      fullName: orderData.value.name,
      phoneNumber: orderData.value.number,
      country: orderData.value.country,
      postalCode: orderData.value.postalCode,
    }

    // 5. Отправляем запрос
    await api.post('https://localhost:7018/orders', orderPayload)

    // 6. Очищаем корзину после успешного заказа
    store.commit('setCard', [])

    console.log('Заказ успешно отправлен')
    router.push('/')
  } catch (err) {
    console.error('Ошибка при оформлении заказа:', err)

    if (err.response) {
      const status = err.response.status
      const data = err.response.data

      if (status === 400) {
        error.value = data.message || 'Проверьте правильность заполнения формы'
      } else if (status === 404) {
        error.value = data.message || 'Товары не найдены'
      } else if (status === 500) {
        error.value = data.message || 'Сервер временно недоступен'
      } else {
        error.value = 'Непредвиденная ошибка при оформлении заказа'
      }
    } else {
      error.value = 'Ошибка соединения с сервером'
    }
  }
}

onMounted(async () => {
  await store.dispatch('fetchCard')
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
        v-model="orderData.name"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="Иван"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Номер телефона</span>
      <input
        v-model="orderData.number"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="8 800 555 35 35"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Страна</span>
      <input
        v-model="orderData.country"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="Чувашия"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Код региона</span>
      <input
        v-model="orderData.postalCode"
        type="text"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        placeholder="777-777"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Валюта (опционально)</span>
      <select
        v-model="orderData.currency"
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
      >
        <option value="RUB">Рубли (RUB)</option>
        <option value="USD">Доллары (USD)</option>
        <option value="EUR">Евро (EUR)</option>
      </select>
    </div>

    <button
      @click="Send()"
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Заказать
    </button>
  </div>
</template>
