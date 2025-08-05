<script setup>
import Header from './components/Header.vue'
import CardList from './components/CardL.vue'
</script>

<template>
  <Header />
  <div class="gap-[80px] px-[200px] py-[85px] font-raleway flex flex-col items-center">
    <div class="flex w-full justify-between items-center">
      <img src="/sneakers/9c79bce5f9246f9783d0494819cdff9d.jpg" class="mr-[170px]" alt="" />
      <div>
        <img src="/cil_double-quote-sans-left.svg" alt="" />
        <p class="font-regular text-2xl">
          21 — бренд с духом уличной культуры, для людей, которые хотят жить в мире, узнавать разные
          культуры, быть свободными от предрассудков и носить то, что раскрывает их как личность и
          отражает их жизненные ценности.
        </p>
      </div>
    </div>
    <div class="bg-black w-screen -mx-[200px] flex justify-start px-[200px] py-4">
      <span class="text-white font-bold text-5xl mr-[40px]">НОВИНКИ</span>
      <span class="text-5xl text-transparent" style="-webkit-text-stroke: 1px white">NEW</span>
    </div>
    <CardList />
  </div>
</template>
