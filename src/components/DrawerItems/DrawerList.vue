<script setup>
import { useStore } from 'vuex'
import DrawerItem from './DrawerItem.vue'

const store = useStore()

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCard'])
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
      :on-click-favorite="() => emit('addToFavorite', item)"
      :on-click-remove="() => emit('addToCard', item)"
    />
  </div>
</template>
