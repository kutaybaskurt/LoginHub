<template>
  <div>
    <apexchart
      class="w-full"
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Grafik için ayarları tanımlıyoruz
const chartOptions = ref({
  chart: {
    id: "exchange-rate-chart",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: [], // Kategorileri API'den dolduracağız
  },
  yaxis: {
    title: {
      text: "Döviz Kuru (TRY)",
    },
  },
  title: {
    text: "Son 7 Günlük Döviz Kuru",
    align: "center",
  },
});

// Grafik serisini tanımlıyoruz
const series = ref([
  {
    name: "TRY",
    data: [], // Veriyi API'den aldıktan sonra dolduracağız
  },
]);

// API'den son 7 günün verisini getiren fonksiyon
const getLast7DaysUrl = () => {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0]; // Bugün
  const startDate = new Date(today.setDate(today.getDate() - 9)) // Kaç Gün Önce
    .toISOString()
    .split("T")[0]; // 6 gün öncesi
  return `https://api.frankfurter.app/${startDate}..${endDate}`;
};

const fetchData = async () => {
  const url = getLast7DaysUrl();
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // API'den gelen veriyi işliyoruz
    const dates = Object.keys(result.rates);
    const rates = dates.map((date) => result.rates[date].TRY);

    // Grafik kategorilerini ve verisini güncelliyoruz
    chartOptions.value.xaxis.categories = dates;
    series.value[0].data = rates;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
};

// Bileşen yüklendiğinde veriyi çekiyoruz
onMounted(fetchData);
</script>
