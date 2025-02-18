<script setup lang="ts">

</script>
<template>
  <div class="pt-6 pb-10">
    <h1 class="text-4xl text-center font-bold pb-4">
      <slot />
    </h1>
    <p class="text-lg text-center c-text-gray">
      <slot name="directions" />
    </p>
  </div>
</template>