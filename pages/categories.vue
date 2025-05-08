<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { goToCategoriesPage, getCategories } = useCategory();

const categories = await getCategories();
const categoriesCount = computed(() => categories.value?.length || 0);
const currentCategory = computed(() => {
  const category = route.params.category;
  return category ? category : null;
});
if (categoriesCount.value > 0 && currentCategory.value === null) {
  categories.value && router.push('/categories/' + categories.value[0]);
}
</script>
<template>
  <div>
    <BaseListTitle>分類</BaseListTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)"
        :isAction="route.params.category === category">
        {{ category }}
      </BaseTag>
    </div>

    <NuxtPage />
  </div>
</template>