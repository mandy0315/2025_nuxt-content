<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    isExternal?: boolean;
  }>(),
  {
    to: undefined,
    href: undefined,
    isExternal: false,
  }
);

</script>

<template>
  <NuxtLink v-if="to" :to class="c-rounded-btn">
    <slot />
  </NuxtLink>
  <a v-else :href class="c-rounded-btn" :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined">
    <slot />
  </a>
</template>