<template>
  <button class="h-14 w-full bg-blue-500 text-white rounded-xl flex items-center justify-center">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
