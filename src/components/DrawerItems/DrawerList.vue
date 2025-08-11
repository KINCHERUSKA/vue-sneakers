<script setup>
import { inject } from 'vue'
import DrawerItem from './DrawerItem.vue'

const cardActions = inject('cardActions')
const { card, removeFromCard } = cardActions || {}

const favoriteActions = inject('favoriteActions')

const emit = defineEmits(['addToFavorite', 'removeFromCard'])
</script>

<template>
  <div class="flex flex-col gap-8">
    <DrawerItem
      v-for="item in card"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :price="item.price"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :on-click-favorite="
        () => {
          favoriteActions(item)
          emit('addToFavorite', item)
        }
      "
      :on-click-remove="
        () => {
          removeFromCard(item)
          emit('removeFromCard', item)
        }
      "
    />
  </div>
</template>
