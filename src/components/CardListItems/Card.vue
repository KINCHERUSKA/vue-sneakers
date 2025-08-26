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
    imageUrl.value = '/order-success-icon.png'
    return
  }

  const mainImage = props.productImages.find((img) => img.isMain)
  imageUrl.value = mainImage?.url || props.productImages[0].url
  console.log
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
    class="grid items-center justify-center cursor-pointer py-8 md:py-12 hover:-translate-y-2 transition relative font-raleway text-lg md:text-2xl font-normal items-center gap-[10px] hover:shadow-2xl hover:z-10"
  >
    <router-link
      :to="{
        name: 'Sneaker',
        query: { id: props.id },
      }"
      class="-z-10 w-full"
    >
      <div class="w-full items-center jusify-center text-center">
        <img
          @click="onClickFavorite"
          :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
          alt=""
          class="z-20 absolute top-8 left-8 cursor-pointer transition"
        />
        <img :src="imageUrl" class="" alt="Sneakers" />
        <span class="text-center w-full px-4 break-words mt-2">{{ title }}</span>
      </div>
    </router-link>

    <div class="flex flex-col items-center w-full">
      <div class="flex items-baseline gap-2">
        <!-- Акционная цена -->
        <span v-if="hasPromoPrice" class="text-2xl font-bold text-red-600">
          {{ promotionalPrice }}
        </span>

        <span
          :class="{
            'text-lg line-through text-gray-500': hasPromoPrice,
          }"
          class="text-2xl"
        >
          {{ price }}
        </span>
        <span class="text-lg">{{ currency }}</span>
      </div>

      <!-- Метка "Акция" при наличии скидки -->
      <span v-if="hasPromoPrice" class="mt-1 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
        Скидка {{ getDiscountPercentage }}%
      </span>
    </div>

    <div class="flex justify-center w-full">
      <div @click="onClickAdd" class="border border-black px-3 lg:px-6 py-1 whitespace-nowrap">
        <span>{{ isAdded ? 'добавлено' : 'в корзину' }}</span>
      </div>
    </div>
  </div>
</template>
