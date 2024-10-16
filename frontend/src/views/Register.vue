<template>
  <div class="container mx-auto flex items-center justify-center page">
    <div
      class="w-full lg:w-4/12 border border-gray-200 bg-white p-5 rounded-xl flex flex-col gap-5"
    >
      <p class="text-xl">Kayıt Olun</p>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-2">
          <Input v-model="firstName" label="Adınız" />
          <Input v-model="lastName" label="Soyadınız" />
        </div>
        <Input v-model="username" label="Kullanıcı Adı" />
        <Input v-model="email" label="E-posta Adresiniz" />
        <Input v-model="phone" label="Telefon Numaranız" />
        <Input v-model="birthDate" label="Doğum Tarihi" type="date" />
        <Input v-model="address" label="Adres" />
        <Input v-model="password" label="Parolanız" type="password" />
        <Button label="Kayıt Olun" />
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center text-sm">
        {{ errorMessage }}
      </p>
      <p class="text-center text-sm">
        Zaten kayıtlı mısınız?
        <router-link class="text-blue-500" to="/login">Giriş Yapın</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "./../components/Input.vue";
import Button from "./../components/Button.vue";

// Form verileri için reaktif değişkenler
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const birthDate = ref("");
const address = ref("");
const password = ref("");
const errorMessage = ref("");
const username = ref("");

const router = useRouter();

// Kayıt işlemi
async function handleRegister() {
  try {
    const response = await fetch(
      "http://localhost:3001/v1/auth/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          phone: phone.value,
          birthdate: birthDate.value,
          address: address.value,
          password: password.value,
          username: username.value,
        }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Kayıt işlemi başarısız!");
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user)); // Kullanıcıyı kaydet
    router.push("/"); // Başarılı kayıt sonrası ana sayfaya yönlendir
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>
