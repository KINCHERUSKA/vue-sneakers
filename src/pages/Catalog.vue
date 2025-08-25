<template>
  <div class="flex w-full justify-between gap-16">
    <router-link to="/catalog/male" class="w-full">
      <!-- потом заменить постеры -->
      <div
        class="bg-bottom bg-cover cursor-pointer my-20 h-[780px] gap-2 bg-[url(../public/Posters/cat2.png)] flex flex-col items-center justify-center text-white hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition"
      >
        <h2 class="text-3xl font-bold">Мужская обувь</h2>
      </div>
    </router-link>
    <router-link to="/catalog/female" class="w-full">
      <div
        class="bg-bottom bg-cover cursor-pointer my-20 h-[780px] gap-2 bg-[url(../public/Posters/cat1.png)] flex flex-col items-center justify-center text-white hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition"
      >
        <h2 class="text-3xl font-bold">Женская обувь</h2>
      </div>
    </router-link>
  </div>
</template>
