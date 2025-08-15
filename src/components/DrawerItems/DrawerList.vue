<script setup>
import { useStore } from 'vuex'
import DrawerItem from './DrawerItem.vue'

const store = useStore()

defineProps({
  items: Array,
})

const addToFavorite = (item) => {
  store.dispatch('addToFavorite', item)
}
const addToCard = (item) => {
  store.dispatch('addToCard', item)
}
</script>

<template>
  <div class="flex flex-col gap-8" v-auto-animate>
    <DrawerItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :price="item.price"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :on-click-favorite="() => addToFavorite(item)"
      :on-click-remove="() => addToCard(item)"
    />
  </div>
</template>
