<script setup>
import { inject } from 'vue'
import DrawerList from './DrawerList.vue'

const localName = 'корзина'

defineProps({
  name: String,
})

const { closeDrawer } = inject('cardActions')
</script>

<template>
  <div class="grid grid-cols-3 gap-8 font-regular text-2xl w-full">
    <span class="col-span-2"> {{ name + ' / ' }}{{ localName }} </span>

    <DrawerList class="col-span-2" />

    <div class="flex flex-col justify-end items-center w-full">
      <div
        class="cursor-pointer bg-black w-full flex items-center justify-center hover:shadow-2xl hover:z-10 hover:-translate-y-2 transition"
      >
        <span class="mx-16 my-6 text-white">Перейти к оформлению</span>
      </div>
      <div>
        <span>ФИО</span>
        <input type="text" />
      </div>
      <div>
        <span>Мобильный телефон</span>
        <input type="text" />
      </div>
      <div>
        <span>Страна</span>
        <input type="text" />
      </div>
      <div>
        <span>Город</span>
        <input type="text" />
      </div>
      <div>
        <span>Почтовый индекс</span>
        <input type="text" />
      </div>
      <div>
        <div>заказать</div>
        <div>
          <span>ИТОГО</span>
          <div>
            <span>100</span>
            <span>руб</span>
          </div>
        </div>
      </div>
      <div>
        <img src="" alt="" />
        <span></span>
      </div>
      <div>
        <img src="" alt="" />
        <span></span>
      </div>
    </div>
  </div>
</template>
