<template>
  <div class="relative border border-gray-200 h-14 rounded-lg px-3 bg-white">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :readonly="readonly"
      class="block pb-2.5 pt-6 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    />
    <label
      class="absolute text-sm text-gray-500 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 rtl:peer-focus:translate-x-1/4"
    >
      {{ label }}
    </label>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: " ",
  },
  error: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
