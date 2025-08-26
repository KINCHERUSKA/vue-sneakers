<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()

onMounted(async () => {
  await store.dispatch('tokenChek')
  /*  await store.dispatch('fetchFavorites')
  await store.dispatch('fetchCard') */
})
</script>

<template>
  <router-view />
</template>
