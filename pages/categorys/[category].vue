<script setup lang="ts">
const route = useRoute();

// 分類文章列表
const { data: posts } = await useAsyncData(route.path, async () => {
  const category = decodeURIComponent(`${route.params.category}`);

  const allPost = await queryCollection('posts')
    .order('date', 'DESC')
    .select('title', 'path', 'categorys', 'image', 'description', 'date')
    .all();

  return allPost.filter(post => post.categorys.includes(category)) || [];
})

</script>
<template>
  <div class="grid grid-cols-3 gap-4">
    <UPostCard v-for="post in posts" v-bind="post" :key="post.title" class="col-span-1" />
  </div>
</template>