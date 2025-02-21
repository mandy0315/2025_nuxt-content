<script setup lang="ts">
const route = useRoute();
const { getCategories, goToCategoryPage } = useCategory();

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('posts').order('date', 'DESC').select('title', 'path', 'categorys', 'image', 'description', 'date').all()
})

const categorys = await getCategories(10);


// const testPost =
// {
//   title: 'test',
//   path: '/posts/test',
//   categorys: ['test'],
//   image: '/images/posts/twioon.jpg',
//   description: 'test',
//   date: '2021-10-10'
// };
// // 做十筆 testPost
// const testPosts = Array.from({ length: 10 }, () => testPost);
</script>
<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <BaseListTitle>
        文章
        <template #directions>
          目前有
          <span class="text-c-main-blue font-medium">"{{ posts?.length || 0 }}"</span>
          篇文章，紀錄著我生活大小事，歡迎閱讀！
        </template>
      </BaseListTitle>

      <div class="grid grid-cols-3 gap-4">
        <BasePostCard v-for="post in posts" v-bind="post" :key="post.title" class="col-span-1" />
      </div>

    </template>
    <template #right-side>
      <BaseSidebarTitle>分類</BaseSidebarTitle>
      <div class="flex flex-wrap gap-2">
        <button class="cursor-pointer" v-for="category in categorys" :key="category"
          @click="goToCategoryPage(category)">
          <BaseTag>{{ category }}</BaseTag>
        </button>
      </div>
      <NuxtLink class="c-text-link my-4 text-sm block px-2" to="/categorys">更多分類</NuxtLink>
    </template>
  </NuxtLayout>
</template>