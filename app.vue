<script setup lang="ts">
import { AppHeader } from '#components';

</script>

<template>
  <div>
    <AppHeader />

    <main class="min-h-[calc(100vh-var(--header-height))]">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>
