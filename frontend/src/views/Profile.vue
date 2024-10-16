<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <!-- Profil Bilgileri Bölümü -->
    <div class="flex flex-col gap-5">
      <p class="text-2xl">Profil Bilgileri</p>
      <div
        v-if="successprofile"
        class="bg-green-50 text-green-500 rounded-xl p-3 text-sm"
      >
        {{ successprofile }}
      </div>
      <form @submit.prevent="updateprofile" class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <Input v-model="firstName" label="Adınız" />
            <p v-if="profileErrors.firstName" class="text-red-500 text-sm">
              {{ profileErrors.firstName }}
            </p>
          </div>
          <div>
            <Input v-model="lastName" label="Soyadınız" />
            <p v-if="profileErrors.lastName" class="text-red-500 text-sm">
              {{ profileErrors.lastName }}
            </p>
          </div>
        </div>

        <div>
          <Input v-model="username" label="Kullanıcı Adı" readonly />
        </div>

        <div>
          <Input v-model="email" label="E-posta Adresiniz" />
          <p v-if="profileErrors.email" class="text-red-500 text-sm">
            {{ profileErrors.email }}
          </p>
        </div>

        <div>
          <Input v-model="phone" label="Telefon Numaranız" />
          <p v-if="profileErrors.phone" class="text-red-500 text-sm">
            {{ profileErrors.phone }}
          </p>
        </div>

        <div>
          <Input v-model="birthDate" label="Doğum Tarihi" type="date" />
          <p v-if="profileErrors.birthDate" class="text-red-500 text-sm">
            {{ profileErrors.birthDate }}
          </p>
        </div>

        <div>
          <Input v-model="address" label="Adres" />
          <p v-if="profileErrors.address" class="text-red-500 text-sm">
            {{ profileErrors.address }}
          </p>
        </div>

        <Button label="Bilgilerimi Güncelle" />
      </form>
    </div>

    <!-- Şifre Güncelleme Bölümü -->
    <div class="flex flex-col gap-5">
      <p class="text-2xl">Parolanızı Güncelleyin</p>
      <div>
        <div
          v-if="passworderror"
          class="bg-red-100 text-red-500 text-sm p-3 rounded-xl"
        >
          {{ passworderror }}
        </div>
        <div
          v-if="successpassword"
          class="bg-green-50 text-green-500 rounded-xl p-3 text-sm"
        >
          {{ successpassword }}
        </div>
      </div>
      <form @submit.prevent="updatepassword" class="flex flex-col gap-2">
        <div class="grid grid-cols-1 gap-2">
          <Input v-model="password" label="Mevcut Parolanız" type="password" />
          <Input v-model="newpassword" label="Yeni Parolanız" type="password" />
          <Input
            v-model="confirmpassword"
            label="Yeni Parolanızı Onaylayın"
            type="password"
          />
        </div>
        <Button label="Parolanızı Değiştirin" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "./../components/Input.vue";
import Button from "./../components/Button.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const user = authStore.user;

const firstName = ref(user.firstname);
const lastName = ref(user.lastname);
const email = ref(user.email);
const phone = ref(user.phone);
const birthDate = ref(user.birthdate ? user.birthdate.split("T")[0] : "");
const address = ref(user.address);
const username = ref(user.username);

const password = ref(null);
const newpassword = ref(null);
const confirmpassword = ref(null);
const passworderror = ref(null);
const successprofile = ref(null);
const successpassword = ref(null);

// Profil güncelleme formu hatalarını izlemek için reactive obje
const profileErrors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  address: "",
});

async function updateprofile() {
  // Hata durumlarını sıfırla
  resetProfileErrors();

  let isValid = true;

  // Ad ve Soyad kontrolü
  if (!firstName.value) {
    profileErrors.value.firstName = "Adınız boş bırakılamaz.";
    isValid = false;
  }
  if (!lastName.value) {
    profileErrors.value.lastName = "Soyadınız boş bırakılamaz.";
    isValid = false;
  }

  // E-posta kontrolü (Regex ile basit doğrulama)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailPattern.test(email.value)) {
    profileErrors.value.email = "Geçerli bir e-posta adresi girin.";
    isValid = false;
  }

  // Telefon numarası kontrolü (10 haneli olmalı)
  const phonePattern = /^\d{10}$/;
  if (phone.value && !phonePattern.test(phone.value)) {
    profileErrors.value.phone = "Geçerli bir telefon numarası girin.";
    isValid = false;
  }

  // Doğum tarihi kontrolü
  if (!birthDate.value) {
    profileErrors.value.birthDate = "Doğum tarihinizi seçin.";
    isValid = false;
  }

  // Adres kontrolü
  if (!address.value) {
    profileErrors.value.address = "Adres bilgisi boş bırakılamaz.";
    isValid = false;
  }

  // Tüm alanlar geçerliyse, profili güncelle
  if (isValid) {
    try {
      const updatedUser = {
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        phone: phone.value,
        birthdate: birthDate.value,
        address: address.value,
        username: username.value,
      };

      // // Pinia Store'da güncelle
      // authStore.user = updatedUser;

      // alert("Profil bilgileriniz başarıyla güncellendi!");

      const res = await fetch("http://localhost:3001/v1/user/profile/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`, // Token'ı header'a ekliyoruz
          "Content-Type": "application/json", // JSON formatında veri bekleniyor
        },
        body: JSON.stringify({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          phone: phone.value,
          birthdate: birthDate.value,
          address: address.value,
        }),
      });

      if (!res.ok) throw new Error(`İstek başarısız oldu: ${res.statusText}`);

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.access_token);

      authStore.user = data.user;
      authStore.token = data.access_token;

      if (data.status == "success") {
        successprofile.value =
          "Tebrikler, profil bilgileriniz başarıyla güncellendi.";

        setTimeout(() => {
          successprofile.value = null;
        }, 5000);
      }
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      alert("Profil bilgilerinizi güncellerken bir hata oluştu.");
    }
  }
}

// Profil güncelleme formu hatalarını sıfırlayan fonksiyon
function resetProfileErrors() {
  profileErrors.value = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
  };
}

async function updatepassword() {
  passworderror.value = null;
  if (!password.value || !newpassword.value || !confirmpassword.value) {
    return (passworderror.value = "Tüm şifre alanları doldurulmalıdır.");
  }
  if (newpassword.value !== confirmpassword.value) {
    return (passworderror.value = "Şifreler uyuşmuyor.");
  }
  passworderror.value = null;

  const res = await fetch("http://localhost:3001/v1/user/profile/password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.token}`, // Token'ı header'a ekliyoruz
      "Content-Type": "application/json", // JSON formatında veri bekleniyor
    },
    body: JSON.stringify({
      password: password.value,
      newpassword: newpassword.value,
    }),
  });

  if (!res.ok) throw new Error(`İstek başarısız oldu: ${res.statusText}`);

  const data = await res.json();
  if (data.status == "success") {
    successpassword.value = "Tebrikler, parolanız başarıyla güncellendi.";

    setTimeout(() => {
      successpassword.value = null;
    }, 5000);
  } else {
    passworderror.value = data.message;
  }
}
</script>
