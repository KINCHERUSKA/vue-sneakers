<script setup>
import { onMounted } from 'vue'
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
</script>

<template>
  <Header />
  <div class="w-screen gap-20 px-[200px] font-raleway flex flex-col items-center">
    <router-view></router-view>
  </div>
  <Footer />
</template>
