<script setup lang="ts">
defineProps<{
  path: string,
  image: string,
  date: string,
  title: string,
  description: string,
}>()
</script>
<template>
  <div class="bg-gray-100 dark:bg-gray-100/10 border c-border-gray shadow-lg rounded overflow-hidden">
    <NuxtLink :to="path">
      <div class="w-full h-0 pb-[56.25%] relative">
        <BaseImage :src="image" fallback="/images/default-image.jpg" :alt="title"
          imgClass="h-full object-center object-cover w-full absolute" />
      </div>
    </NuxtLink>

    <UDate :date class="p-2" />

    <NuxtLink class="pb-2 px-2 block" :to="path">
      <p class="text-xl"> {{ title }}</p>
      <p>{{ description }}</p>
    </NuxtLink>
  </div>
</template>