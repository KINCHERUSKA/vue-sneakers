<script setup>
import { onMounted, provide } from 'vue'
import { useStore } from 'vuex'

import Header from './components/MainComponents/Header.vue'
import Footer from './components/MainComponents/Footer.vue'

const name = 'главная'
const store = useStore()

onMounted(async () => {
  await store.dispatch('fetchItems')
  await store.dispatch('fetchFavorites')
  await store.dispatch('fetchCard')
  await store.dispatch('fetchHomePage')
})

/* provide('favoriteActions', addToFavorite)
provide('cardActions', { card, addToCard, removeFromCard, onClickAdd }) */
</script>

<template>
  <Header @open-drawer="openDrawer" :name="name" :card="card" />
  <div class="w-screen gap-20 px-[200px] py-[85px] font-raleway flex flex-col items-center">
    <router-view></router-view>
  </div>
  <Footer />
</template>
