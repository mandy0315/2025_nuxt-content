<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>

  <div>
    <ClientOnly>
      <button @click="toggleTheme" class="w-8 h-8 hover:bg-gray-100/20 rounded">
        <Icon v-if="colorMode.value === 'light'" size="1.5rem" name="solar:sun-outline" class="align-middle" />
        <Icon v-else size="1.3rem" name="solar:moon-outline" class="align-middle" />
      </button>
    </ClientOnly>
  </div>
</template>