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
  <NuxtLink :to="path"
    class="bg-gray-100 dark:bg-gray-100/10 border c-border-gray shadow-lg rounded-lg overflow-hidden group">

    <div class="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden">
      <BaseImage :src="image" fallback="/images/default-image.jpg" :alt="title"
        imgClass="h-full transition object-center object-cover w-full absolute duration-500 ease-in-out group-hover:blur-sm group-hover:scale-110" />
    </div>
    <div class="p-2">
      <UDate :date />

      <p class="text-xl"> {{ title }}</p>
      <p>{{ description }}</p>
    </div>
  </NuxtLink>
</template>