<script setup lang="ts">
const route = useRoute();
const { goToCategoryPage } = useCategory();

const { data: categorys } = await useAsyncData(route.path, async () => {
  const selectItemInPosts = await queryCollection('posts').order('date', 'DESC').select('title', 'categorys').all();
  // 從物件陣列取出 categorys 並合併成一個陣列
  const categorys = selectItemInPosts.map(item => item.categorys).flat();
  // 用 Set 去除重複的分類
  const uniqueCategorys = Array.from(new Set(categorys));
  return uniqueCategorys;
})
</script>
<template>
  <div>
    <UPageTitle>
      文章分類
      <template #directions>
        目前有
        <span class="text-c-main-blue font-medium">"{{ categorys?.length || 0 }}"</span>
        個標籤，歡迎點選進入分類列表！
      </template>
    </UPageTitle>

    <div class="flex flex-wrap justify-center gap-2">
      <button class="cursor-pointer" v-for="category in categorys" :key="category" @click="goToCategoryPage(category)">
        <UTag class="text-lg rounded-3xl">{{ category }}</UTag>
      </button>
    </div>
  </div>
</template>