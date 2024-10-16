<template>
  <div class="container mx-auto flex">
    <div class="flex w-full gap-5">
      <div
        class="w-2/12 transition-all duration-300"
        :class="{ '!w-12': !menu }"
      >
        <div class="flex items-center h-20">
          <div
            @click="menu = !menu"
            class="h-8 min-w-5 flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <div v-for="i in 3" :key="i" class="h-0.5 bg-black w-full"></div>
          </div>
          <Logo v-if="menu" />
        </div>
        <Menu :menu="menu" />
      </div>
      <div class="w-10/12 p-5 transition-all duration-300" :class="{ '!w-full': !menu }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "../components/Menu.vue";
import Logo from "../components/Logo.vue";

const menu = ref(true);
</script>
