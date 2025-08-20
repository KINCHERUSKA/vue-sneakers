<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const name = 'главная'
const store = useStore()

const ChekUser = () => {
  const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
  if (savedUser) {
    store.commit('setLog', true)
  } else {
    store.commit('setLog', false)
  }
}

//onMounted(ChekUser())

onMounted(async () => {
  await store.dispatch('fetchItems')
  await store.dispatch('fetchFavorites')
  await store.dispatch('fetchCard')
  await store.dispatch('fetchHomePage')
})
</script>

<template>
  <router-view />
</template>
