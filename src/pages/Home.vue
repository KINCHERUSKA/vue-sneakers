<script setup>
import { useStore } from 'vuex'
import { onBeforeMount, ref, watch } from 'vue'

import CardList from '../components/CardListItems/CardL.vue'
import Delivery from '../components/MainPage/Delivery.vue'
import Action from '../components/MainPage/Action.vue'
import HeaderMain from '../components/MainPage/HeaderMain.vue'

const store = useStore()

const addToFavorite = (item) => {
  store.dispatch('addToFavorite', item)
}
const addTocard = (item) => {
  store.dispatch('addToCard', item)
}

const isLoading = ref(true)

onBeforeMount(async () => {
  try {
    await Promise.all([store.dispatch('fetchPopular'), store.dispatch('fetchNew')])
    store.dispatch('fetchFavorites')
    isLoading.value = false
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
    isLoading.value = false
    // Обработка ошибки
  }
})
</script>

<template>
  <HeaderMain class="w-screen" />
  <!-- Описание бренда -->
  <div class="flex w-full justify-between items-center">
    <img src="/sneakers/9c79bce5f9246f9783d0494819cdff9d.jpg" class="mr-[170px]" alt="" />
    <div>
      <img src="/cil_double-quote-sans-left.svg" alt="" />
      <p class="font-regular text-2xl">
        21 — бренд с духом уличной культуры, для людей, которые хотят жить в мире, узнавать разные
        культуры, быть свободными от предрассудков и носить то, что раскрывает их как личность и
        отражает их жизненные ценности.
      </p>
    </div>
  </div>

  <!-- Линия перехода -->
  <div class="bg-black w-screen flex justify-start px-[200px] py-4">
    <span class="text-white font-bold text-5xl mr-[40px]">НОВИНКИ</span>
    <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
      >NEW</span
    >
  </div>

  <div v-if="isLoading" class="text-center py-12">
    <div class="spinner border-t-2 border-black w-8 h-8 rounded-full animate-spin mx-auto"></div>
  </div>
  <CardList
    v-else
    :items="$store.state.newItems"
    :context="'main'"
    @add-to-favorite="addToFavorite"
    @add-to-card="addTocard"
  />

  <!-- Линия перехода -->
  <div class="bg-black w-screen flex justify-start px-[200px] py-4">
    <span class="text-white font-bold text-5xl mr-[40px]">ПОПУЛЯРНОЕ</span>
    <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
      >POPULAR</span
    >
  </div>

  <div v-if="isLoading" class="text-center py-12">
    <div class="spinner border-t-2 border-black w-8 h-8 rounded-full animate-spin mx-auto"></div>
  </div>
  <CardList
    v-else
    :context="'main'"
    :items="$store.state.popularItems"
    @add-to-favorite="addToFavorite"
    @add-to-card="addTocard"
  />
  <Action />

  <Delivery />
</template>
