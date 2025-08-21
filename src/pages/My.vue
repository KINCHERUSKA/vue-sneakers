<script setup>
import CardL from '@/components/CardListItems/CardL.vue'
</script>

<template>
  <div class="grid py-[45px] grid-cols-4 grid-rows-4 w-full gap-8 font-regular">
    <div class="row-span-4 flex flex-col px-6 py-8 gap-6 bg-black text-white text-lg max-h-max">
      <div class="flex gap-4 items-center">
        <img src="/profile.svg" alt="" class="h-6 w-6" />
        <span class="font-bold text-xl">Тут должно быть фио</span>
        <img src="/arrow-right.svg" alt="" class="h-4 w-4" />
      </div>
      <div class="flex justify-between gap-4">
        <div class="flex flex-col bg-white text-black p-3 cursor-pointer justify-center">
          <div class="flex gap-3 items-center">
            <p class="text-nowrap">21 скидка</p>
            <img src="/arrow-right.svg" alt="" />
          </div>
          <span class="font-bold text-xl">до 30%</span>
        </div>
        <div class="flex flex-col bg-white text-black p-3 cursor-pointer">
          <p>Оплата при получении</p>
          <span class="font-bold text-xl">до 100 ₽</span>
        </div>
      </div>
      <div class="gap-1 flex flex-col">
        <span>Финансы</span>
        <div class="flex w-full bg-white text-black gap-3 p-3 items-center">
          <img src="/cart.svg" alt="" />
          <p>Способы оплаты</p>
        </div>
        <div class="flex w-full bg-white text-black gap-3 p-3 items-center">
          <img src="/Magazine.svg" alt="" />
          <p>Реквезиты</p>
        </div>
      </div>

      <div class="gap-1 flex flex-col">
        <span>Управление</span>
        <div class="flex w-full bg-white text-black gap-3 p-3 items-center">
          <img src="/icons8-шестерня.svg" alt="" class="h-6 w-6" />
          <p>Настройки</p>
        </div>
        <div class="flex w-full bg-white text-black gap-3 p-3 items-center">
          <img src="/free-icon-monitor-1250704.png" alt="" class="w-4 h-4" />
          <p>Ваши устройства</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center border border-black p-4 border-4">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Избранное</span>
        <p>Пока пусто</p>
      </div>
      <img src="/heart.svg" alt="" class="w-12 h-12" />
    </div>
    <div class="flex justify-between items-center border border-black p-4 border-4">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Покупки</span>
        <p>Смотреть</p>
      </div>
      <img src="/Magazine.svg" alt="" class="w-12 h-12" />
    </div>
    <div class="flex justify-between items-center border border-black p-4 border-4">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Ждут оценки</span>
        <p>4 товара</p>
      </div>
      <img src="/Vector (4).svg" alt="" class="w-12 h-12" />
    </div>
    <div class="col-span-3 flex gap-4 flex-col p-4 border border-black border-4">
      <span class="text-xl font-bold">Сервис и помощь</span>
      <div class="flex justify-between gap-4">
        <div class="max-h-max flex gap-3 bg-black text-white items-center px-6 py-4 w-full">
          <img src="/Vector (4).svg" alt="" class="h-4 w-4" />
          <span>Написать в поддержку</span>
        </div>
        <div class="flex gap-3 bg-black text-white items-center px-6 max-h-max py-4 w-full">
          <img src="/icons8-return-50.png" alt="" class="h-5 w-5" />
          <span>Вернуть товар</span>
        </div>
        <div class="flex gap-3 bg-black text-white items-center px-6 max-h-max py-4 w-full">
          <img src="/icons8-вопросы-ответы-50.png" alt="" class="h-5 w-5" />
          <span>Частые вопросы</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col border border-black border-4 col-span-3 p-4 g-4">
      <span class="font-bold text-xl">Возможно, вас заинтересует</span>
      <div>
        <CardL />
      </div>
    </div>
  </div>
</template>
