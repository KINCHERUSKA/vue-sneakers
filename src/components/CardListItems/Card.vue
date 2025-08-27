<script setup>
import { onMounted, ref, watch, computed } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  productImages: Array,
  price: {
    type: Number,
    required: true,
  },
  promotionalPrice: {
    type: [Number, null],
    default: null,
  },
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  currency: String,
})

const imageUrl = ref('')

const setImage = () => {
  if (!props.productImages || props.productImages.length === 0) {
    imageUrl.value = '/no-image.jpg'
    return
  }

  const mainImage = props.productImages.find((img) => img.isMain)
  imageUrl.value = mainImage?.url || props.productImages[0].url
}

const hasPromoPrice = computed(() => {
  return (
    props.promotionalPrice !== null &&
    props.promotionalPrice > 0 &&
    props.promotionalPrice < props.price
  )
})

const getDiscountPercentage = computed(() => {
  return Math.round(100 - (props.promotionalPrice * 100) / props.price)
})

onMounted(setImage)
watch(() => props.productImages, setImage)
</script>

<template>
  <div
    class="relative grid justify-items-center cursor-pointer py-8 md:py-12 hover:-translate-y-2 transition font-raleway text-lg md:text-2xl font-normal gap-[10px] hover:shadow-2xl hover:z-10"
  >
    <!-- 1. КНОПКА ИЗБРАННОГО (самый верхний слой) -->
    <img
      @click.stop="onClickFavorite"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Избранное"
      class="z-20 absolute top-8 left-8 w-8 h- cursor-pointer transition-transform hover:scale-110"
    />

    <!-- 2. ССЫЛКА НА СТРАНИЦУ ТОВАРА  -->
    <router-link
      :to="{ name: 'Sneaker', query: { id: props.id } }"
      class="w-full h-full absolute inset-0 z-10"
    ></router-link>

    <!-- 3. СОДЕРЖИМОЕ КАРТОЧКИ -->
    <div class="w-full text-center relative z-15">
      <img :src="imageUrl" class="w-full h-30 object-cover rounded-lg" alt="Sneakers" />
      <span class="text-center w-full px-4 break-words mt-2 line-clamp-2">
        {{ title }}
      </span>
    </div>

    <!-- 4. ЦЕНЫ -->
    <div class="flex flex-col items-center w-full relative z-15">
      <div class="flex items-baseline gap-2">
        <span v-if="hasPromoPrice" class="text-2xl font-bold text-red-600">
          {{ promotionalPrice }} {{ currency }}
        </span>

        <span
          :class="{
            'text-lg line-through text-gray-500': hasPromoPrice,
          }"
          class="text-2xl"
        >
          {{ price }} {{ currency }}
        </span>
      </div>

      <span v-if="hasPromoPrice" class="mt-1 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
        Скидка {{ getDiscountPercentage }}%
      </span>
    </div>

    <!-- 5. КНОПКА ДОБАВЛЕНИЯ -->
    <div class="flex justify-center w-full relative z-20">
      <div @click.stop="onClickAdd" class="border border-black px-3 lg:px-6 py-1 whitespace-nowrap">
        <span>{{ isAdded ? 'добавлено' : 'в корзину' }}</span>
      </div>
    </div>
  </div>
</template>
