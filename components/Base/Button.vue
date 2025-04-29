// customClass
<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

</script>

<template>
  <button class="c-rounded-btn" :disabled="disabled">
    <slot />
  </button>
</template>