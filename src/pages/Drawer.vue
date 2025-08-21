<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import DrawerList from '../components/DrawerItems/DrawerList.vue'

const store = useStore()
const router = useRouter()

const items = computed(() => store.state.items)
const card = computed(() => store.state.card)

const cardItems = ref([])

const fetchCardItems = () => {
  cardItems.value = card.value
    .map((order) => {
      const product = items.value.find((item) => item.id === order.parentId)
      return product ? { ...product, orderId: order.id } : null
    })
    .filter(Boolean)
}

const addToFavorite = (item) => {
  store.dispatch('addToFavorite', item)
}
const addTocard = (item) => {
  store.dispatch('addToCard', item)
}

const totalPrice = computed(() => cardItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const absolutePrice = computed(() => totalPrice.value - vatPrice.value)

const CreateOrder = async () => {
  if (store.state.isLogged) {
    router.push('/auth/order')
  } else {
    router.push('/auth/login')
  }
}

onMounted(async () => {
  fetchCardItems()
})

watch((cardItems) => {
  fetchCardItems()
})
</script>

<template>
  <div
    v-if="cardItems.length > 0"
    class="grid grid-cols-3 gap-8 font-regular text-2xl w-full h-full py-[85px]"
  >
    <DrawerList
      class="col-span-2"
      :items="cardItems"
      @add-to-favorite="addToFavorite"
      @add-to-card="addTocard"
    />

    <div class="flex flex-col justify-start items-center w-full gap-8">
      <div
        class="cursor-pointer bg-black w-full flex items-center justify-center hover:shadow-2xl hover:z-10 hover:-translate-y-2 transition"
      >
        <span @click="CreateOrder()" class="mx-16 my-6 text-white">Перейти к оформлению</span>
      </div>
      <span class="text-gray-400 text-lg text-center"
        >Доступные способы и время доставки можно выбрать при оформлении заказа</span
      >
      <hr class="w-full black border-solid border-1 border-grey" />
      <div class="flex flex-col gap-4 w-full">
        <div class="w-full flex justify-between">
          <span class="font-bold">Ваша корзина</span>
          <span class="text-lg text-gray-400">{{ cardItems.length }} ед. товара</span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Товары </span>
          <span class="">{{ totalPrice }} </span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Скидка</span>
          <span class="">{{ vatPrice }} ₽ </span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Итого</span>
          <span class="font-bold text-2xl">{{ absolutePrice }} </span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col gap-8 items-center min-h-[70vh] justify-center py-[85px]">
    <span class="text-4xl">Здесь пусто!</span>
    <router-link to="/">
      <div
        class="cursor-pointer bg-black w-full flex items-center justify-center hover:shadow-2xl hover:z-10 hover:-translate-y-2 transition"
      >
        <span class="mx-16 my-6 text-white">вернуться на главную страницу</span>
      </div>
    </router-link>
  </div>
</template>
