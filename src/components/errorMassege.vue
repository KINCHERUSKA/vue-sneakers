<script setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  error: String,
})

const emit = defineEmits(['clear'])

watch(
  () => props.error,
  (newError) => {
    if (newError) {
      setTimeout(() => {
        emit('clear')
      }, 5000)
    }
  },
  { immediate: true },
)
</script>

<template>
  <transition name="slide-up" mode="out-in">
    <div
      v-if="error"
      class="bg-red-900 text-red-100 px-8 py-3 flex items-center gap-2 text-sm mb-4 border border-red-700 shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-red-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ error }}</span>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
