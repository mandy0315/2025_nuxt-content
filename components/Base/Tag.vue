<script setup lang="ts">
withDefaults(
  defineProps<{
    isAction?: boolean;
  }>(),
  {
    isAction: false,
  }
);
</script>
<template>
  <button class="c-rounded-btn rounded-2xl px-3 hover:text-c-light-blue" :class="{ 'text-c-light-blue': isAction }">
    <slot />
  </button>
</template>