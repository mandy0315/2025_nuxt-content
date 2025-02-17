<script setup lang="ts">
defineProps<{
  date: Date | null
}>()
</script>
<template>
  <p class="c-text-gray text-sm p-2">
    <Icon class="align-middle mr-1" name="solar:calendar-linear" />
    <span v-if="date" v-date-format="date" class="align-middle"></span>
  </p>
</template>