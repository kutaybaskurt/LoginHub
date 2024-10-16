<template>
  <div class="container mx-auto flex items-center justify-center page">
    <div
      class="w-full lg:w-4/12 border border-gray-200 bg-white p-5 rounded-xl flex flex-col gap-5"
    >
      <p class="text-xl">Giriş Yapın</p>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-2">
        <Input v-model="email" label="E-posta Adresiniz" />
        <Input v-model="password" label="Parolanız" type="password" />
        <Button label="Giriş Yapın" />
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center text-sm">
        {{ errorMessage }}
      </p>
      <p class="text-center text-sm">
        Hesabınız yok mu?
        <router-link class="text-blue-500" to="/register"
          >Ücretsiz Kaydolun</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Input from "./../components/Input.vue";
import Button from "./../components/Button.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

async function handleLogin() {
  try {
    const response = await fetch("http://localhost:3001/v1/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Giriş başarısız!");
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.access_token);

    authStore.login(data.user, data.access_token);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>
