<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const route = useRoute();
// 文章內容
const { data: post } = await useAsyncData('post', () => {
  return queryCollection('blog').path(route.path).first();
})
// 導航
const { data: navs } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('blog').where('title', '=', route.params.slug)
})


// 上下篇文章
const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('blog', route.path).where('category', '=', route.params.category);
})

const breadcrumbs = ref<Array<{
  title: string;
  path: string;
}>>([]);
// 遞迴函式：從 JSON 解析出路徑
const extractBreadcrumbs = (data: ContentNavigationItem) => {
  breadcrumbs.value.push({
    title: data.title, path: data.path
  });
  if (data.children && data.children.length) {
    return extractBreadcrumbs(data.children[0]);
  }
  return;
};

// 取得 `Blog > [category] > [title]`
onMounted(() => {
  if (navs.value) {
    extractBreadcrumbs(navs.value[0]);
  }
});

</script>

<template>
  <div v-if="post">
    <div class="border">
      <nav>
        <ul v-if="breadcrumbs">
          <li class="inline-block" v-for="item in breadcrumbs" :key="item.path">
            <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>
    </div>

    <article class="prose prose-primary dark:prose-invert">
      <ContentRenderer :value="post" />
    </article>


    <ul class="grid grid-cols-2 gap-8">
      <li class="col-span-1 w-full last:text-right" v-for="surround in surroundings">
        <NuxtLink v-if="surround" class="w-full p-2 border block" :to="surround.path">
          <p>{{ surround.title }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
nav {
  li::after {
    content: '>';
    margin: 0 0.5rem;
  }

  li:last-child::after {
    content: '';
  }
}
</style>
