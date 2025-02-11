<script setup lang="ts">
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('blog').order('date', 'DESC').select('title', 'path', 'category', 'image', 'description', 'date').all()
})
</script>
<template>
  <h1 class="text-4xl text-center font-bold py-4 capitalize">blog</h1>

  <div class="grid grid-cols-3 gap-4">

    <div v-for="post in posts" class="border bg-white rounded overflow-hidden col-span-1">
      <NuxtLink :to="post.path">
        <div class="w-full h-0 pb-[56.25%] relative">
          <img class="h-full object-top object-cover w-full absolute" :src="post.image" />
        </div>
      </NuxtLink>

      <NuxtLink :to="`/blog/${post.category}`" class="text-sm border rounded py-0.5 px-1 inline-block">{{
        post.category
        }}</NuxtLink>
      <p class="inline-block">{{ post.date }}</p>

      <NuxtLink :to="post.path">
        <p class="text-2xl"> {{ post.title }}</p>
        <p class="text-gray-500">{{ post.description }}</p>
      </NuxtLink>

    </div>
  </div>
</template>