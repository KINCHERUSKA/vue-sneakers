<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Добавлено!')
}

const onClickFavorite = () => {
  alert('Сохранено!')
}
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-20"
  >
    <Card
      :is-favorite="true"
      :is-added="true"
      title="Casual Sneakers"
      image-url="/sneakers/sneakers-1.jpg"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
    <Card
      :is-favorite="false"
      :is-added="false"
      title="Casual Sneakers"
      image-url="/sneakers/sneakers-2.jpg"
    />
    <Card />
    <Card />
  </div>
</template>
