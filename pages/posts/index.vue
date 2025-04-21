<script setup lang="ts">


const { getCategories, goToCategoryPage } = useCategory();
const categories = await getCategories(10);
const currentPage = ref(1);
const currentSort = ref('desc');
const { updatePosts, posts } = usePost();
updatePosts(currentPage.value, currentSort.value);

watch([currentPage, currentSort], ([page, sort]) => {
  updatePosts(page, sort);
});

</script>
<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="posts">
        <BaseListTitle>
          文章
          <template #directions>
            目前有
            <span class="text-c-main-blue font-medium">"{{ posts.totalList || 0 }}"</span>
            篇文章，紀錄著我生活大小事，歡迎閱讀！
          </template>
        </BaseListTitle>

        <div class="pb-4 ml-auto text-right">
          <p class="c-text-gray inline-block">文章排序：</p>
          <select v-model="currentSort" class="c-border-btn rounded py-1 px-2">
            <option value="desc">新到舊</option>
            <option value="asc">舊到新</option>
          </select>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <BasePostCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
        </div>

        <BasePagination v-model:current-page="currentPage" :totalPage="posts.totalPage" />

      </div>
    </template>
    <template #right-side>
      <BaseSidebarTitle>分類</BaseSidebarTitle>
      <div class="flex flex-wrap gap-2">
        <button class="cursor-pointer" v-for="category in categories" :key="category"
          @click="goToCategoryPage(category)">
          <BaseTag>{{ category }}</BaseTag>
        </button>
      </div>
      <NuxtLink class="c-text-link my-4 text-sm block px-2" to="/categorys">更多分類</NuxtLink>
    </template>
  </NuxtLayout>
</template>