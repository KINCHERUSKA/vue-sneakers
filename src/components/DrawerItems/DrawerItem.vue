<script setup>
import { computed, ref, onMounted, watch } from 'vue'

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
  quantity: Number,
  size: { type: Number, default: 42 },
  isFavorite: Boolean,
  onClickFavorite: Function,
  onClickRemove: Function,
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

console.log(props.isFavorite)

onMounted(setImage)

watch(() => props.productImages, setImage)
</script>

<template>
  <hr class="w-full black border-solid border-1 border-black" />
  <div class="w-full justify-between flex items-start">
    <div class="grid w-full grid-flow-col grid-template-4 items-center gap-8">
      <!--     <img :src="imageUrl" class="" alt="Sneakers" /> -->
      <img :src="imageUrl" :alt="title" class="object-contain" />
      <div class="flex gap-8">
        <router-link :to="{ name: 'Sneaker', query: { id: props.id } }">
          <span class="">{{ title }}</span>
        </router-link>
        <span class="underline underline-offset-1">{{ size }}</span>
        <span>{{ quantity }} ед.</span>
      </div>
      <div class="flex flex-col gap-4 p-10 justify-center">
        <div class="flex gap-2 text-gray-400">
          <div class="flex flex-col items-center w-full relative z-15">
            <div class="flex items-baseline gap-2">
              <span v-if="hasPromoPrice" class="text-2xl font-bold text-red-600">
                {{ promotionalPrice }} {{ currency }}
              </span>

              <span
                :class="{
                  'text-lg line-through text-gray-500': hasPromoPrice,
                }"
                class="text-2xl text-black"
              >
                {{ price }} {{ currency }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <img
          @click="onClickFavorite"
          :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
          alt=""
          class="cursor-pointer"
          v-auto-animate
        />
        <img @click="onClickRemove" src="\public\close.svg" alt="" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>
