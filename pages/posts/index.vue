<script setup lang="ts">
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('posts').order('date', 'DESC').select('title', 'path', 'tags', 'image', 'description', 'date').all()
})
</script>
<template>
  <h1 class="text-4xl text-center font-bold py-4 capitalize">文章</h1>

  <div class="grid grid-cols-3 gap-4">
    <UPostCard v-for="post in posts" v-bind="post" :key="post.title" />
  </div>
</template>