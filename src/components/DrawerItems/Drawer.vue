<script setup>
import { computed, inject } from 'vue'
import DrawerList from './DrawerList.vue'

const localName = 'корзина'

defineProps({
  name: String,
  totalPrice: Number,
  card: Array,
  vatPrice: Number,
  absolutePrice: Number,
})

const emit = defineEmits(['addToFavorite', 'addToCard', 'CreateOrder'])
</script>

<template>
  <div v-if="card.length > 0" class="grid grid-cols-3 gap-8 font-regular text-2xl w-full">
    <span class="col-span-2"> {{ name + ' / ' }}{{ localName }} </span>

    <DrawerList class="col-span-2" />

    <div class="flex flex-col justify-start items-center w-full gap-8">
      <div
        class="cursor-pointer bg-black w-full flex items-center justify-center hover:shadow-2xl hover:z-10 hover:-translate-y-2 transition"
      >
        <span @click="() => emit('CreateOrder')" class="mx-16 my-6 text-white"
          >Перейти к оформлению</span
        >
      </div>
      <span class="text-gray-400 text-lg text-center"
        >Доступные способы и время доставки можно выбрать при оформлении заказа</span
      >
      <hr class="w-full black border-solid border-1 border-grey" />
      <div class="flex flex-col gap-4 w-full">
        <div class="w-full flex justify-between">
          <span class="font-bold">Ваша корзина</span>
          <span class="text-lg text-gray-400">{{ card.length }} ед. товара</span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Товары </span>
          <span class="">{{ totalPrice }} </span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Скидка</span>
          <span class="">{{ vatPrice }} ₽ </span>
        </div>
        <div class="w-full text-lg flex justify-between">
          <span>Итого</span>
          <span class="font-bold text-2xl">{{ absolutePrice }} </span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="card.length === 0" class="flex flex-col gap-8 items-center">
    <span class="text-4xl">Здесь пусто!</span>
    <div
      class="cursor-pointer bg-black w-full flex items-center justify-center hover:shadow-2xl hover:z-10 hover:-translate-y-2 transition"
    >
      <span class="mx-16 my-6 text-white">вернуться на главную страницу</span>
    </div>
  </div>
</template>
