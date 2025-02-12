<script setup lang="ts">
import { NuxtLink } from '#components';


const route = useRoute();

// 文章列表
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('blog').where('category', '=', route.params.category).order('date', 'DESC').select('title', 'path', 'category', 'image', 'description', 'date').all()
})


</script>
<template>
  <div class="text-center pb-6">
    <h1 class="text-4xl text-center font-bold py-4 capitalize">category: {{ route.params.category }}</h1>
    <NuxtLink class="capitalize hover:text-blue-400" to="/blog">back to blog</NuxtLink>
  </div>

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

<style lang="scss" scoped>
nav {
  li::after {
    content: '>';
    margin: 0 0.5rem;
  }

  li:last-child::after {
    content: '';
  }
}
</style>