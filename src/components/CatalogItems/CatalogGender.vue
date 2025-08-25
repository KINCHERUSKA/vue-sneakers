<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'
import CardL from '../CardListItems/CardL.vue'

const route = useRoute()
const store = useStore()

const gender = route.params.gender // 'male' или 'female'

const isDefaultView = computed(() => !selectedCategory.value)

const categories = ref([])
const loading = ref(true)
const loadingItems = ref(true)
const error = ref(null)
const items = ref([])
const zero = ref(false)
const selectedCategory = ref(null)

const getCategories = async () => {
  try {
    const { data } = await axios.get('https://localhost:7018/catalog')

    const genderCategory = data.find((cat) => cat.name.toLowerCase() === gender.toLowerCase())

    if (genderCategory) {
      categories.value = genderCategory.children

      loadingItems.value = false
    } else {
      error.value = 'Категория не найдена'
    }
  } catch (err) {
    error.value = 'Ошибка загрузки категорий'
    console.error('Ошибка загрузки категорий:', err)
  } finally {
    loading.value = false
  }
}

const getSubCategory = async (subname) => {
  selectedCategory.value = subname
  loadingItems.value = true
  zero.value = false
  items.value = []
  try {
    const safePath = `${gender}/${subname}`
    const { data } = await axios.get(
      `https://localhost:7018/catalog/${encodeURIComponent(safePath)}`,
    )
    items.value = data
    if (items.value.length <= 0) {
      zero.value = true
    }
  } catch (err) {
    error.value = 'Не удалось загрузить товары'
    console.error('Ошибка загрузки товаров:', err)
  } finally {
    loadingItems.value = false
  }
}

const addToFavorite = (item) => {
  store.dispatch('addToFavorite', item)
}
const addTocard = (item) => {
  store.dispatch('addToCard', item)
}

onMounted(getCategories)
</script>

<template>
  <div class="min-h-screen p-8 flex w-full gap-16">
    <div class="bg-black flex flex-col gap-4 px-12 py-4 font-bold">
      <!-- Назад к выбору пола -->
      <div class="mt-8 text-center font-normal">
        <router-link to="/catalog" class="text-white flex items-baseline gap-2">
          <img src="/arrow-right.svg" alt="" class="scale-x-[-1] w-3 h-3" />
          <span class="text-xl">назад</span>
        </router-link>
      </div>

      <!-- Индикатор загрузки -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="spinner border-t-2 border-white w-8 h-8 rounded-full animate-spin mx-auto"
        ></div>
      </div>

      <!-- Ошибка -->
      <div v-else-if="error" class="text-center py-12 text-red-500">
        {{ error }}
      </div>

      <div v-else-if="categories.length < 0" class="text-center py-12 text-gray-500">
        Подкатегории не найдены
      </div>

      <div v-else class="flex flex-col gap-6">
        <h2 class="text-xl text-white cursor-pointer" @click="selectedCategory = null">Новинки</h2>

        <div v-for="subcat in categories" :key="subcat.name">
          <h2
            class="text-xl font-semibold text-white cursor-pointer"
            @click="getSubCategory(subcat.name)"
          >
            {{ subcat.name }}
          </h2>
        </div>
      </div>
    </div>

    <div class="w-3/4">
      <!-- Заголовок -->
      <div class="mb-6 flex justify-between items-center gap-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{
            isDefaultView
              ? 'Новинки'
              : `${selectedCategory} (${gender === 'male' ? 'мужская обувь' : 'женская обувь'})`
          }}
        </h1>

        <div class="w-full flex items-center gap-4">
          <input
            type="text"
            class="px-4 border-black border border-2 w-full py-2 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Что будем искать?"
          />
        </div>

        <!-- Индикатор загрузки -->
        <div v-if="loading.items" class="flex items-center text-gray-500">
          <div
            class="spinner border-t-2 border-gray-500 w-4 h-4 rounded-full animate-spin mr-2"
          ></div>
          Загрузка...
        </div>
      </div>

      <!-- Содержимое с анимацией -->
      <transition name="fade" mode="out-in">
        <!-- Ошибка -->
        <div
          v-if="error && !loading.items"
          class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        >
          <div class="text-red-500 mb-2">⚠️</div>
          <p class="text-gray-700">{{ error }}</p>
          <button
            @click="isDefaultView ? store.dispatch('fetchNew') : loadItems(selectedCategory)"
            class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Повторить попытку
          </button>
        </div>

        <!-- Нет товаров -->
        <div
          v-else-if="!loading.items && items.length === 0 && !isDefaultView"
          class="bg-white border border-black p-12 text-center"
        >
          <div class="text-4xl mb-4">🛍️</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Товаров не найдено</h2>
          <p class="text-gray-600 mb-6">В категории "{{ selectedCategory }}" пока нет товаров.</p>
        </div>

        <!-- Товары -->
        <div v-else key="products" class="w-full">
          <CardL
            :key="isDefaultView ? 'newItems' : selectedCategory"
            :items="isDefaultView ? $store.state.newItems : items"
            @add-to-favorite="addToFavorite"
            @add-to-card="addTocard"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Анимация переходов */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Стилизация спиннера */
.spinner {
  border-width: 2px;
  border-top-color: currentColor;
  border-right-color: transparent;
}
</style>
