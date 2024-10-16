<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-3 relative">
      <div
        class="min-h-10 min-w-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center"
      >
        <div v-if="user">
          <p>{{ user.firstname[0] }}{{ user.lastname[0] }}</p>
        </div>
      </div>
      <div
        v-if="menu"
        class="text-sm flex flex-col leading-none gap-1 cursor-pointer"
        @click="usermenu = !usermenu"
      >
        <p>{{ user.firstname }} {{ user.lastname }}</p>
        <p>{{ user.email }}</p>
      </div>
      <div
        v-if="usermenu"
        class="absolute top-full left-0 w-full pt-3 z-30 shadow-2xl shadow-black/5"
      >
        <ul class="w-full bg-white rounded-xl border border-gray-200 p-3">
          <li class="h-10 flex items-center text-sm cursor-pointer">
            <router-link class="cursor-pointer"
            
            to="/profile">Profil Ayarlarım</router-link>
            
          </li>
          <li
            @click="logout()"
            class="h-10 flex items-center text-sm hover:text-red-500 cursor-pointer transition duration-300"
          >
            Çıkış Yap
          </li>
        </ul>
      </div>
    </div>
    <ul class="w-full relative">
      <li
        class="h-12 w-full z-10 relative flex items-center px-3 transition duration-300 gap-3 cursor-pointer"
        @click="go('/')"
        :class="{ 'text-white': $route.path == '/' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          :class="{ 'fill-white': $route.path == '/' }"
        >
          <path
            d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"
          />
        </svg>
        <p v-if="menu">Anasayfa</p>
      </li>
      <li
        class="h-12 w-full z-10 relative flex items-center px-3 transition duration-300 gap-3"
        @click="go('/profile')"
        :class="{ 'text-white': $route.path == '/profile' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          :class="{ 'fill-white': $route.path == '/profile' }"
        >
          <path
            d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"
          />
          <path
            d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"
          />
        </svg>
        <p v-if="menu" class="cursor-pointer">Profil Ayarları</p>
      </li>
      <li
        class="h-12 w-full bg-blue-500 absolute top-0 left-0 z-0 transition-all duration-300 rounded-xl"
        :class="{
          'top-0': $route.path == '/',
          'top-12': $route.path == '/profile',
        }"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { computed, watch } from "vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
const usermenu = ref(false);

const router = useRouter();

const go = (path) => {
  router.push(path);
};

defineProps({
  menu: {
    required: false,
  },
});

const logout = () => {
  authStore.logout();
  usermenu.value = false;
  useRouter().push('/login')
};
</script>
