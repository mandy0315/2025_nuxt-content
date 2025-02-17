<script setup lang="ts">

const colorMode = useColorMode();
</script>

<template>
  <Body :class="colorMode.value">
    <AppHeader />

    <main class="min-h-[calc(100vh-theme(spacing.c-header-height))]">
      <NuxtPage />
    </main>

    <AppFooter />
  </Body>
</template>
