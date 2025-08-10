<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  size: String,
  isFavorite: Boolean,
})
</script>

<template>
  <hr class="w-full black border-solid border-1 border-black" />
  <div class="w-full justify-between flex items-start">
    <div class="grid w-full grid-flow-col grid-template-4 items-center gap-8">
      <!--     <img :src="imageUrl" class="" alt="Sneakers" /> -->
      <img src="\sneakers\sneakers-1.jpg" alt="" class="object-contain" />
      <div class="flex gap-8">
        <span class="">Sneakers</span>
        <span class="underline underline-offset-1">42</span>
      </div>
      <div class="flex flex-col gap-4 p-10 justify-center">
        <div class="flex gap-2 text-gray-400">
          <span>42</span>
          <span>руб</span>
        </div>
      </div>
      <div class="flex gap-2">
        <img
          @click="onClickFavorite"
          :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
          alt=""
          class="cursor-pointer"
        />
        <img src="\public\close.svg" alt="" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>
