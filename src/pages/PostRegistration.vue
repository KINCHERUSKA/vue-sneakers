<script setup>
const props = defineProps({
  text: String,
})
</script>

<template>
  <div
    class="flex flex-col bg-black font-raleway text-white items-start px-20 py-20 gap-6 min-w-[40%] relative"
    v-auto-animate
  >
    <span
      class="font-bold text-6xl text-transparent text-center w-full"
      style="-webkit-text-stroke: 1px white"
      >Бу-бу-буп</span
    >
    <p class="font-bold text-xl text-center w-full">{{ text }}</p>
    <router-link to="/auth/login" class="w-full">
      <button
        class="font-bold text-2xl flex justify-center w-full border border-white py-2 transition-all duration-300 hover:text-black hover:border-black hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Войти
      </button>
    </router-link>
  </div>
</template>
