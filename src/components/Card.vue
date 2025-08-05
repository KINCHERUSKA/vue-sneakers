<script setup>
defineProps({
  title: String,
  imageUrl: String,
})
</script>

<template>
  <div
    class="cursor-pointer py-8 md:py-12 hover:-translate-y-2 transition relative font-raleway text-lg md:text-2xl font-normal flex flex-col items-center w-full max-w-[400px] gap-[10px] hover:shadow-2xl hover:z-10"
  >
    <img src="/like-2.svg" alt="" class="z-20 absolute top-8 left-8 cursor-pointer transition" />
    <img :src="imageUrl" class="" alt="Sneakers" />
    <span class="text-wrap text-center w-[80%]">{{ title }}</span>
    <div class="border border-black px-3 md:px-4 lg:px-6 py-1 md:py-2 whitespace-nowrap w-fit">
      <span>в корзину</span>
    </div>
  </div>
</template>
