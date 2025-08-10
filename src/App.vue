<script setup>
import { onMounted, ref, watch, provide } from 'vue'
import axios from 'axios'

import Header from './components/MainComponents/Header.vue'
import CardList from './components/CardListItems/CardL.vue'
import Delivery from './components/MainPage/Delivery.vue'
import Footer from './components/MainComponents/Footer.vue'
import Action from './components/MainPage/Action.vue'
import Drawer from './components/DrawerItems/Drawer.vue'

const items = ref([])
const newItems = ref([])
const popularItems = ref([])
const card = ref([])
const name = 'главная'

const drawerOpen = ref(true)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/sale')
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
    popularItems.value = getRandomItems(items.value, 4)
    newItems.value = getRandomItems(items.value, 4)
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      }
      item.isFavorite = true
      const { data } = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://e0c9bc90f123d6dd.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const addToCard = async (item) => {
  try {
    if (!item.isAdded) {
      card.value.push(item)
      item.isAdded = true
    } else {
      card.value.splice(card.value.indexOf(item), 1)
      item.isAdded = false
    }
  } catch (err) {
    console.log(err)
  }
}

//потом пофиксить чтоб два раза не вызывать
const getRandomItems = (array, count) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

provide('favoriteActions', addToFavorite)
provide('cardActions', { card, openDrawer, closeDrawer })
</script>

<template>
  <Header @open-drawer="openDrawer" />

  <div class="w-screen gap-20 px-[200px] py-[85px] font-raleway flex flex-col items-center">
    <Drawer v-if="drawerOpen" :name="name" />
    <!-- Описание бренда -->
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

    <!-- Линия перехода -->
    <div class="bg-black w-screen flex justify-start px-[200px] py-4">
      <span class="text-white font-bold text-5xl mr-[40px]">НОВИНКИ</span>
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >NEW</span
      >
    </div>

    <CardList :items="newItems" @addToFavorite="addToFavorite" @add-to-card="addToCard" />

    <!-- Линия перехода -->
    <div class="bg-black w-screen flex justify-start px-[200px] py-4">
      <span class="text-white font-bold text-5xl mr-[40px]">ПОПУЛЯРНОЕ</span>
      <span class="font-bold text-5xl text-transparent" style="-webkit-text-stroke: 1px white"
        >POPULAR</span
      >
    </div>

    <CardList :items="popularItems" @add-to-favorite="addToFavorite" @add-to-card="addToCard" />

    <Action />

    <Delivery />
  </div>

  <Footer />
</template>
