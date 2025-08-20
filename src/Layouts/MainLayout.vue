<script setup>
import Header from '@/components/MainComponents/Header.vue'
import Footer from '@/components/MainComponents/Footer.vue'
</script>

<template>
  <div>
    <Header />
    <main class="w-screen gap-20 px-[200px] font-raleway flex flex-col items-center">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
