<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const props = defineProps({
  id: Number,
})

const store = useStore()

const loading = ref(true)
const error = ref(null)

const sneakerData = ref(null)
const currentImage = ref('')

const sizes = ref([
  { value: 36, available: false },
  { value: 37, available: false },
  { value: 38, available: false },
  { value: 39, available: false },
  { value: 40, available: false },
  { value: 41, available: false },
  { value: 42, available: false },
  { value: 43, available: false },
  { value: 44, available: false },
])

const setSize = () => {
  sizes.value = sizes.value.map((size) => ({
    ...size,
    available: Math.random() > 0.3,
  }))
}

const count = ref(1)

const getSneaker = async () => {
  try {
    loading.value = true

    const { data } = await axios.get(`https://localhost:7018/products/${props.id}`)
    sneakerData.value = data

    console.log(sneakerData.value)

    if (sneakerData.value.promotionalPrice > sneakerData.value.price) {
      sneakerData.value.promotionalPrice = null
    }

    setCurrentImage()
    setSize()
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response

      if (status === 404) {
        error.value = 'Товар не найден'
      } else if (status === 500) {
        error.value = 'Сервер временно недоступен'
      } else {
        error.value = data.message || 'Ошибка при загрузке товара'
      }
    } else {
      error.value = 'Нет подключения к серверу'
    }
  } finally {
    loading.value = false
  }
}

const setCurrentImage = () => {
  if (!sneakerData.value?.productImages?.length) return

  const mainImage = sneakerData.value.productImages.find((img) => img.isMain)
  currentImage.value = `https://localhost:7018/${mainImage.url}`
}

const selectImage = (imageUrl) => {
  currentImage.value = `https://localhost:7018/${imageUrl}`
}

const addToFavorite = () => {
  store.dispatch('addToFavorite', sneakerData.value)
}

onMounted(getSneaker)
</script>

<template>
  <div v-if="loading" class="text-center py-12">
    <div class="spinner border-t-2 border-black w-8 h-8 rounded-full animate-spin mx-auto"></div>
  </div>

  <!-- Ошибка -->
  <div v-else-if="error" class="text-center py-12 text-red-500">
    {{ error }}
    <button @click="getSneaker" class="mt-4 px-4 py-2 bg-black text-white rounded">
      Повторить
    </button>
  </div>
  <div v-else class="flex w-full py-[85px] gap-8 font-raleway" v-auto-animate>
    <!-- Колонка с миниатюрами -->
    <div class="flex space-x-2 overflow-x-auto mt-4 flex-col min-w-max">
      <img
        v-for="(image, index) in sneakerData.productImages"
        :key="index"
        :src="'https://localhost:7018/' + image.url"
        :class="{
          'border-2 border-black': currentImage === 'https://localhost:7018/' + image.url,
          'cursor-pointer hover:opacity-75': true,
        }"
        class="w-16 h-16 object-cover rounded"
        @click="selectImage(image.url)"
        :alt="`Миниатюра ${index + 1}`"
      />
    </div>

    <!-- Основное изображение -->
    <div class="min-w-[500px]">
      <img
        :src="currentImage || '/no-image.jpg'"
        class="w-full h-auto object-cover"
        :alt="sneakerData.name"
      />
    </div>

    <!-- Основная информация + правая панель в одном столбце -->
    <div class="flex flex-col gap-6 w-full">
      <!-- Заголовок растянут на всю ширину -->
      <div class="flex justify-between items-center bg-black text-white px-5 py-2 w-full">
        <span class="text-2xl font-bold">{{ sneakerData.name }}</span>
        <img
          @click="addToFavorite()"
          :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
          alt=""
          class="cursor-pointer transition p-1 w-6 h-6"
        />
      </div>

      <!-- Правая панель (цена и кнопки) сразу под заголовком -->
      <div class="flex flex-col border-black border border-2 p-6 w-full">
        <div class="p-4 flex items-center gap-3">
          <span
            v-if="sneakerData.promotionalPrice"
            class="text-white text-4xl font-bold bg-red-600 px-4 py-2"
            >{{ sneakerData.promotionalPrice }}</span
          >
          <div class="flex items-baseline gap-1">
            <span
              :class="{
                'text-2xl line-through text-gray-500': sneakerData.promotionalPrice,
                'text-4xl font-bold ': !sneakerData.promotionalPrice,
              }"
              >{{ sneakerData.price }}</span
            >
            <span class="ml-2">{{ sneakerData.currency }}</span>
          </div>
        </div>

        <div class="flex items-center w-full gap-3">
          <div class="flex justify-center h-fit cursor-pointer">
            <div
              @click="onClickAdd"
              class="border border-black px-3 lg:px-6 py-1 whitespace-nowrap"
            >
              <span class="text-2xl">{{ isAdded ? 'добавлено' : 'в корзину' }}</span>
            </div>
          </div>
          <div class="flex bg-black text-white w-full justify-evenly p-2">
            <span
              class="text-2xl cursor-pointer"
              @click="
                () => {
                  if (count - 1 < 0) {
                    count = 0
                  } else {
                    count--
                  }
                }
              "
              >-</span
            >
            <span class="text-2xl">{{ count }}</span>
            <span
              class="text-2xl cursor-pointer"
              @click="
                () => {
                  count++
                }
              "
              >+</span
            >
          </div>
        </div>
      </div>

      <!-- Остальная информация о товаре -->
      <div class="flex flex-col gap-6 w-full">
        <div>
          <p class="text-lg font-medium mb-2">Размер</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in sizes"
              :key="size.value"
              @click="selectedSize = size.value"
              class="w-10 h-10 border flex items-center justify-center transition-colors duration-300"
              :class="{
                'bg-black text-white': selectedSize === size.value,
                'border-black': size.available,
                'border-dashed border-gray-400 opacity-50 cursor-not-allowed': !size.available,
              }"
              :disabled="!size.available"
            >
              {{ size.value }}
            </button>
          </div>
        </div>

        <div>
          <p class="text-xl font-bold">Остаток на складе</p>
          <span class="text-lg">{{ sneakerData.stockQuantity }} шт.</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xl font-bold mb-2">О товаре</span>
          <p class="overflow-y-auto max-h-[200px]">{{ sneakerData.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
