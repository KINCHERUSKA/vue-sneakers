<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardL.vue'
import Delivery from './components/Delivery.vue'
import Footer from './components/Footer.vue'
import Action from './components/Action.vue'

const itemsNew = ref([])
const itemsPop = ref([])

onMounted(async () => {
  try {
    const { data: newItems } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/new_sale')
    itemsNew.value = newItems

    const { data: popularItems } = await axios.get(
      'https://e0c9bc90f123d6dd.mokky.dev/popular_sale',
    )
    itemsPop.value = popularItems
  } catch (err) {
    console.log(err)
  }
})

const items2 = [
  {
    id: 2,
    name: 'Running Shoes',
    description: 'Легкие кроссовки для бега',
    price: 120,
    currency: 1,
    imageUrl: '/sneakers/sneakers-2.jpg',
  },
  {
    id: 3,
    name: 'Classic Jeans',
    description: 'Джинсы классического кроя',
    price: 80,
    currency: 1,
    imageUrl: '/sneakers/sneakers-3.jpg',
  },
  {
    id: 4,
    name: 'Winter Jacket',
    description: 'Теплая зимняя куртка',
    price: 200,
    currency: 1,
    imageUrl: '/sneakers/sneakers-4.jpg',
  },
  {
    id: 5,
    name: 'Baseball Cap',
    description: 'Стильная бейсболка',
    price: 25,
    currency: 1,
    imageUrl: '/sneakers/sneakers-5.jpg',
  },
]
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
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >NEW</span
      >
    </div>

    <CardList :items="itemsNew" />

    <div class="bg-black w-screen -mx-[200px] flex justify-start px-[200px] py-4">
      <span class="text-white font-bold text-5xl mr-[40px]">ПОПУЛЯРНОЕ</span>
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >POPULAR</span
      >
    </div>
    <CardList :items="itemsPop" />

    <Action />

    <Delivery />
  </div>

  <Footer />
</template>
