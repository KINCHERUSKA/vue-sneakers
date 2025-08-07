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
        <li class="font-medium text-2xl cursor-pointer hover:-translate-y-2 transition">О НАС</li>
        <li class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white">
          21
        </li>
        <li class="font-medium text-2xl cursor-pointer hover:-translate-y-2 transition">КОРЗИНА</li>
        <li class="cursor-pointer hover:-translate-y-2 transition">
          <img src="/profile.svg" alt="" class="w-6 h-6 text-white filter brightness-0 invert" />
        </li>
      </ul>
    </header>
    <div class="text-center" style="margin-top: 265px">
      <p class="font-bold text-5xl mb-4">21 FOR CHUVASH</p>
      <p class="font-normal text-2xl">Дизайнерские кроссовки, вдохновлённая чувашской культурой</p>
    </div>
    <div
      class="-bottom-20 right-0 bg-black flex flex-col px-12 py-8 absolute size-fit text-2xl gap-[26px]"
    >
      <div class="flex gap-[10px]">
        <img src="/public/WhiteStrih.svg" alt="" />
        <span>отличное качество</span>
      </div>
      <div class="flex gap-[10px]">
        <img src="/public/WhiteStrih.svg" alt="" />
        <span>приятный материал</span>
      </div>
      <div class="flex gap-[10px]">
        <img src="/public/WhiteStrih.svg" alt="" />
        <span>доставка по всему миру</span>
      </div>
    </div>
  </div>
</template>
