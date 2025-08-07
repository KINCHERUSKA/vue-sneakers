<script setup></script>

<template>
  <div class="bg-black w-screen -mx-[200px] flex justify-start px-[200px] py-4 items-center">
    <span class="font-bold text-white font-bold text-5xl mr-[40px]">ОПЛАТА</span>
    <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
      >PAYMENT</span
    >
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-[40px] items-start">
    <div class="flex w-full flex-col gap-[20px]">
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px black"
        >ПОКУПКА</span
      >
      <p class="font-regular text-2xl">
        Исследуйте весь наш сайт. Добавьте понравившиеся товары в корзину.
      </p>
    </div>

    <div class="flex w-full flex-col gap-[20px]">
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px black"
        >ОПЛАТА</span
      >
      <p class="font-regular text-2xl">
        Произведите оплату на сайте удобным для вас способом.<br />Если возникли проблемы,
        обратитесь на нашу почту.
      </p>
    </div>
    <div
      class="bg-bottom bg-cover cursor-pointer my-20 w-[668px] h-[780px] gap-2 bg-[url(/public/Posters/1.jpg)] flex flex-col items-center justify-center text-white hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition"
    >
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >21</span
      >
      <h2 class="text-3xl font-bold">Программа лояльности</h2>
      <h4 class="text-center">Зарабатывайте баллы и получайте преимущества</h4>
      <div class="bg-white cursor-pointer">
        <h4 class="mx-24 my-2 text-black font-bold">Вступить в клуб</h4>
      </div>
    </div>
    <div
      class="bg-bottom bg-cover cursor-pointer my-20 w-[668px] h-[780px] gap-2 bg-[url(/public/Posters/2.jpg)] flex flex-col items-center justify-center text-white hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition"
    >
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >21</span
      >
      <h2 class="text-3xl font-bold">Скидка -10%</h2>
      <h4 class="text-center">За подписку на наши новости</h4>
      <div class="bg-white cursor-pointer">
        <h4 class="mx-24 my-2 text-black font-bold">Подписаться</h4>
      </div>
    </div>
  </div>
</template>
