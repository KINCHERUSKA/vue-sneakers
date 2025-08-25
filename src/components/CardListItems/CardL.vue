<script setup>
import Card from './Card.vue'

const props = defineProps({
  items: Array,
  context: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'main'].includes(value),
  },
})

const emit = defineEmits(['addToFavorite', 'addToCard'])
</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-20"
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :productImages="item.productImages"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :on-click-add="() => emit('addToCard', item, size)"
      :on-click-favorite="() => emit('addToFavorite', item)"
      v-bind="{
        ...(context === 'main'
          ? {}
          : {
              price: item.price,
              promotionalPrice: item.promotionalPrice,
              currency: item.currency,
            }),
      }"
    />
  </div>
</template>
