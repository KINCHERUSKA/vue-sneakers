<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import CardL from '@/components/CardListItems/CardL.vue'

const route = useRoute()
const gender = route.params.gender
const category = route.params.category
const items = ref([])
const loading = ref(true)
const error = ref(null)

const getItems = async () => {
  try {
    // Формируем безопасный URL
    const safePath = `${gender}/${category}`
    const { data } = await axios.get(
      `https://localhost:7018/catalog/${encodeURIComponent(safePath)}`,
    )

    // Добавляем флаги для корзины и избранного
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
    }))
  } catch (err) {
    error.value = 'Не удалось загрузить товары'
    console.error('Ошибка загрузки товаров:', err)
  } finally {
    loading.value = false
  }
}

onMounted(getItems)
</script>

<template>
  <div class="bg-black min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Хлебные крошки -->
      <div class="text-gray-400 mb-4">
        <router-link to="/catalog" class="hover:underline">Каталог</router-link>
        →
        <router-link :to="`/catalog/${gender}`" class="hover:underline">
          {{ gender === 'male' ? 'Мужские категории' : 'Женские категории' }}
        </router-link>
        →
        <span class="text-white">{{ category }}</span>
      </div>

      <!-- Заголовок -->
      <h1 class="text-3xl font-bold text-white mb-8">
        {{ category }} ({{ gender === 'male' ? 'мужская' : 'женская' }} обувь)
      </h1>

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

      <!-- Товары -->
      <div
        v-else-if="items.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-20"
      >
        <CardL
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :title="item.name"
          :product-images="item.productImages"
          :is-favorite="item.isFavorite"
          :is-added="item.isAdded"
          @add-to-favorite="addToFavorite"
          @add-to-card="addToCard"
        />
      </div>

      <!-- Нет товаров -->
      <div v-else class="text-center py-12 text-gray-500">
        Товары в этой категории пока не добавлены
      </div>

      <!-- Назад к подкатегориям -->
      <div class="mt-8 text-center">
        <router-link :to="`/catalog/${gender}`" class="text-white hover:underline">
          &larr; Вернуться к подкатегориям
        </router-link>
      </div>
    </div>
  </div>
</template>
