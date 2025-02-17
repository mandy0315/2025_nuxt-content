<script setup lang="ts">
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('posts').order('date', 'DESC').select('title', 'path', 'tags', 'image', 'description', 'date').all()
})
</script>
<template>
  <h1 class="text-4xl text-center font-bold py-4 capitalize">文章</h1>

  <div class="grid grid-cols-3 gap-4">

    <div v-for="post in posts" class="bg-gray-100 dark:bg-opacity-10 shadow-lg rounded overflow-hidden col-span-1">
      <NuxtLink :to="post.path">
        <div class="w-full h-0 pb-[56.25%] relative">
          <img class="h-full object-center object-cover w-full absolute" :src="post.image" />
        </div>
      </NuxtLink>

      <UDate :date="post.date" />

      <NuxtLink class="pb-2 px-2 block" :to="post.path">
        <p class="text-2xl"> {{ post.title }}</p>
        <p>{{ post.description }}</p>
      </NuxtLink>

    </div>
  </div>
</template>