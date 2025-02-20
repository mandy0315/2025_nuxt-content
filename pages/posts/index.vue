<script setup lang="ts">
const route = useRoute();
const { getCategories, goToCategoryPage } = useCategory();

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('posts').order('date', 'DESC').select('title', 'path', 'categorys', 'image', 'description', 'date').all()
})

const categorys = await getCategories(10);
</script>
<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
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
    </template>
    <template #right-side>
      <URightSideTitle>分類</URightSideTitle>
      <div class="flex flex-wrap gap-2">
        <button class="cursor-pointer" v-for="category in categorys" :key="category"
          @click="goToCategoryPage(category)">
          <UTag>{{ category }}</UTag>
        </button>
      </div>
      <NuxtLink class="c-text-link my-4 text-sm block px-2" to="/categorys">更多分類</NuxtLink>
    </template>
  </NuxtLayout>
</template>