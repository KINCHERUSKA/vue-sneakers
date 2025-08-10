<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div
    class="cursor-pointer py-8 md:py-12 hover:-translate-y-2 transition relative font-raleway text-lg md:text-2xl font-normal flex flex-col items-center w-full gap-[10px] hover:shadow-2xl hover:z-10"
  >
    <img
      @click="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt=""
      class="z-20 absolute top-8 left-8 cursor-pointer transition"
    />
    <img :src="imageUrl" class="" alt="Sneakers" />
    <span class="text-wrap text-center w-full px-4 break-words">{{ title }}</span>
    <div
      @click="onClickAdd"
      class="border border-black px-3 md:px-4 lg:px-6 py-1 md:py-2 whitespace-nowrap w-fit"
    >
      <span>{{ isAdded ? 'добавлено' : 'в корзину' }}</span>
    </div>
  </div>
</template>
