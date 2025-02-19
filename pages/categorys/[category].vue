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
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <UPageTitle>
        文章分類
        <template #directions>
          分類：
          <span class="text-c-main-blue font-medium">"{{ route.params.category }}"</span>，
          目前有
          <span class="text-c-main-blue font-medium">"{{ posts?.length || 0 }}"</span>
          篇文章，歡迎閱讀！
        </template>
      </UPageTitle>

      <div class="grid grid-cols-3 gap-4">
        <UPostCard v-for="post in posts" v-bind="post" :key="post.title" class="col-span-1" />
      </div>
    </template>
    <template #right-side>
      分類標籤
    </template>
  </NuxtLayout>
</template>