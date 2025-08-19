<script setup>
import { ref } from 'vue';

const passwordInputType = ref('password');
const passwordValue = ref('');

const onClickShowPass = () => {
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div class="flex flex-col bg-black font-raleway text-white items-start px-20 py-8 gap-6 min-w-[40%]" v-auto-animate>
    <router-link to="/" class="flex justify-center w-full">
      <span class="font-bold text-6xl text-transparent" style="-webkit-text-stroke: 1px white">21</span>
    </router-link>
    
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Почта</span>
      <input type="text" class="px-4 py-2 text-black  focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300" placeholder="ivan.ivanov@pochta.ru">
    </div>
   
    <div class="flex flex-col gap-2 w-full">
      <span class="font-bold text-xl">Пароль</span>
      <input 
        v-model="passwordValue"
        :type="passwordInputType" 
        placeholder="Что то серкетное" 
        class="px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      >
      <transition name="fade">
        <div 
          v-if="passwordValue.length > 0"
          class="flex items-center mt-1 transition-all duration-300"
        >
          <input 
            class="mr-2 w-4 h-4 cursor-pointer" 
            type="checkbox" 
            id="opt-in" 
            @change="onClickShowPass"
          />
          <label for="opt-in" class="cursor-pointer select-none">Показать пароль</label>
        </div>
      </transition>
    </div>
    
    <router-link to="/" class="w-full">    
        <button 
            class="font-bold text-2xl flex justify-center w-full border border-white py-2 
                transition-all duration-300 hover:text-black hover:border-black hover:bg-white
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Войти
        </button>
    </router-link>



    <div class="flex gap-4 justify-between w-full">
      <img src="/public/icons8-google-30.png" alt="" class="w-6 h-6 cursor-pointer">
      <img src="/public/Inst-icon.svg" alt="" class="w-6 h-6 cursor-pointer">
      <img src="/public/Facebook-icon.svg" alt="" class="w-6 h-6 cursor-pointer">
      <img src="/public/github-mark-white.svg" alt="" class="w-6 h-6 cursor-pointer">
    </div>
    
    <div class="w-full gap-2 flex flex-col">
         <span class="text-lg w-full text-center">Хей, впервые тут?</span>
    
    <router-link to="/registration" >
          <button 
      class="font-bold text-2xl flex justify-center w-full border border-white py-2 
             transition-all duration-300 hover:text-black hover:border-black hover:bg-white
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
    >
      Регистрация
    </button>
    </router-link>
    </div>
   
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>