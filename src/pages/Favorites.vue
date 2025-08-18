<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

import CardList from '../components/CardListItems/CardL.vue'

const store = useStore()

const items = computed(() => store.state.items)
const favorites = computed(() => store.state.favorites)

const favoriteItems = ref([])

const fetchFavoreiteItems = () => {
  favoriteItems.value = favorites.value
    .map((fav) => {
      const product = items.value.find((item) => item.id === fav.parentId)
      return product ? { ...product, favId: fav.id } : null
    })
    .filter(Boolean)
}

const addToFavorite = (item) => {
  store.dispatch('addToFavorite', item)
}
const addTocard = (item) => {
  store.dispatch('addToCard', item)
}

onMounted(async () => {
  fetchFavoreiteItems()
})

watch((favoriteItems) => {
  fetchFavoreiteItems()
})
</script>

<template>
  <div v-if="favoriteItems.length > 0" class="min-h-[70vh] mt-20">
    <CardList :items="favoriteItems" @add-to-favorite="addToFavorite" @add-to-card="addTocard" />
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
