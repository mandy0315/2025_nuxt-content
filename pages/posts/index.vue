<script setup lang="ts">
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('posts').order('date', 'DESC').select('title', 'path', 'categorys', 'image', 'description', 'date').all()
})
</script>
<template>
  <div>
    <UPageTitle>
      文章
      <template #directions>
        目前有
        <span class="text-c-main-blue font-medium">"{{ posts?.length || 0 }}"</span>
        篇文章，紀錄著我生活大小事，歡迎閱讀！
      </template>
    </UPageTitle>

    <div class="grid grid-cols-3 gap-4">
      <UPostCard v-for="post in posts" v-bind="post" :key="post.title" class="col-span-1" />
    </div>
  </div>
</template>