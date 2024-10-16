<template>
  <div class="container mx-auto flex items-center justify-between py-1.5 px-3">
    <Logo />
    <ul>
      <li class="flex items-center gap-3 relative">
        <div class="flex items-center gap-3">
          <div v-if="!user" class="text-sm flex flex-col leading-none gap-1">
            <router-link to="/login">Giriş Yapın</router-link>
            <router-link to="/register">Kaydolun</router-link>
          </div>
          <div
            v-else
            class="text-sm flex flex-col leading-none gap-1 cursor-pointer"
            @click="menu = !menu"
          >
            <p>{{ user.firstname }} {{ user.lastname }}</p>
            <p>{{ user.email }}</p>
          </div>
          <div
            class="h-10 w-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center"
          >
            <div v-if="user">
              <p>{{ user.firstname[0] }}{{ user.lastname[0] }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="menu"
          class="absolute top-full left-0 w-full pt-3 z-10 shadow-2xl shadow-black/5"
        >
          <ul class="w-full bg-white rounded-xl border border-gray-200 p-3">
            <li class="h-10 flex items-center text-sm cursor-pointer">
              <router-link to="/profile">Profil Ayarlarım</router-link>
            </li>
            <li
              @click="logout()"
              class="h-10 flex items-center text-sm hover:text-red-500 cursor-pointer transition duration-300"
            >
              Çıkış Yap
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { computed, watch } from "vue";
import Logo from "./Logo.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const menu = ref(false);

watch(
  () => authStore.user,
  (newUser, oldUser) => {
    console.log("Kullanıcı değişti:", oldUser, "=>", newUser);
  }
);

const logout = () => {
  authStore.logout();
  menu.value = false;
};
</script>
