<script setup>
import HeaderMain from '../MainPage/HeaderMain.vue'
</script>

<template>
  <div
    class="relative font-raleway text-white px-[200px] py-[85px] h-[880px] flex flex-col items-center relative"
    style="
      background: url('/sneakers/sneakers-top.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <header class="flex w-full">
      <ul class="flex justify-between w-full items-baseline">
        <li class="font-medium text-2xl cursor-pointer hover:-translate-y-2 transition">КАТАЛОГ</li>
        <router-link to="/favorites">
          <li class="font-medium text-2xl cursor-pointer hover:-translate-y-2 transition">
            ЗАКЛАДКИ
          </li></router-link
        >

        <router-link to="/"
          ><li class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white">
            21
          </li></router-link
        >
        <router-link to="/drawer">
          <li class="font-medium text-2xl cursor-pointer hover:-translate-y-2 transition">
            КОРЗИНА
          </li>
        </router-link>

        <li class="cursor-pointer hover:-translate-y-2 transition">
          <img src="/profile.svg" alt="" class="w-6 h-6 text-white filter brightness-0 invert" />
        </li>
      </ul>
    </header>

    <HeaderMain />
  </div>
</template>
