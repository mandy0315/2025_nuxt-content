<script setup lang="ts">
const route = useRoute();
const { goToCategoryPage, getCategories } = useCategory();

const categorys = await getCategories();
</script>
<template>
  <div>
    <BaseListTitle>
      文章分類
      <template #directions>
        目前有
        <span class="text-c-main-blue font-medium">"{{ categorys?.length || 0 }}"</span>
        個標籤，歡迎點選分類列表！
      </template>
    </BaseListTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <button class="cursor-pointer" v-for="category in categorys" :key="category" @click="goToCategoryPage(category)">
        <BaseTag class="text-lg rounded-3xl" :class="{ 'text-c-main-blue': route.params.category === category }">{{
          category
        }}</BaseTag>
      </button>
    </div>

    <NuxtPage />
  </div>
</template>