<script setup></script>

<template>
  <!-- class="relative font-raleway text-white px-[200px] py-[85px] h-[880px] flex flex-col items-center relative bg-black" -->
  <header class="bg-black w-full px-[200px] py-[40px]">
    <nav class="grid grid-cols-5 items-center text-white grid-rows-1">
      <router-link
        to="/catalog"
        class="font-medium text-2xl text-center hover:-translate-y-2 transition-transform cursor-pointer"
      >
        КАТАЛОГ</router-link
      >
      <router-link
        to="/favorites"
        class="font-medium text-2xl text-center hover:-translate-y-2 transition-transform"
      >
        ЗАКЛАДКИ</router-link
      >
      <router-link
        to="/"
        class="flex justify-center hover:-translate-y-2 transition-transform items-baseline"
        ><span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white">
          21
        </span></router-link
      >
      <router-link
        to="/drawer"
        class="font-medium text-2xl text-center hover:-translate-y-2 transition-transform"
      >
        КОРЗИНА
      </router-link>

      <router-link to="/auth/login" v-if="!$store.state.isLogged"
        ><div class="flex justify-center">
          <button class="hover:-translate-y-2 transition-transform">
            <img
              src="/arrow-next.svg"
              alt=""
              class="w-6 h-6 text-white filter brightness-0 invert"
            />
          </button></div
      ></router-link>
      <router-link to="/my" v-else
        ><div class="flex justify-center">
          <button class="hover:-translate-y-2 transition-transform">
            <img src="/profile.svg" alt="" class="w-6 h-6 text-white filter brightness-0 invert" />
          </button></div
      ></router-link>
    </nav>
  </header>
</template>
