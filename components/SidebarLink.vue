<template>
  <NuxtLink :to="to" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
