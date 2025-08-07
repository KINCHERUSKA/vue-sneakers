<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Добавлено!')
}

const onClickFavorite = () => {
  alert('Сохранено!')
}

defineProps({
  items: Array,
})
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-20"
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :is-favorite="false"
      :is-added="false"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>
