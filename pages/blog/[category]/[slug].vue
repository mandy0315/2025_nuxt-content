<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const route = useRoute();

// 文章
const { data: post } = await useAsyncData('post', () => {
  return queryCollection('blog').path(route.path).first();
})

// 麵包屑-內頁
const breadcrumbs = ref<Array<{
  title: string;
  path: string;
}>>([]);
// -遞迴函式：從 JSON 解析出路徑
const extractBreadcrumbs = (data: ContentNavigationItem) => {
  breadcrumbs.value.push({
    title: data.title, path: data.path
  });
  if (data.children && data.children.length) {
    return extractBreadcrumbs(data.children[0]);
  }
  return;
};
const setBreadcrumbs = watch(post, async () => {
  if (post.value) {
    const { data: navs } = await useAsyncData('navigation', () => {
      return queryCollectionNavigation('blog').where('title', '=', post.value?.title)
    })
    if (navs.value) {
      extractBreadcrumbs(navs.value[0]);
    }
  }
}, {
  immediate: true,
  deep: true
})
onMounted(async () => {
  setBreadcrumbs();
});

// 右側 toc
const { data: sections } = await useAsyncData('sections', async () => {
  const sections = await queryCollectionSearchSections('blog', {
    ignoredTags: ['code', 'p']
  })
  const filteredSections = sections.filter(section =>
    section.id.startsWith(route.path)
  )
  return filteredSections
})

// 上下篇文章
const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('blog', route.path).where('category', '=', route.params.category);
})
</script>

<template>
  <div v-if="post" class="grid grid-cols-10 gap-x-8 pb-10">

    <div class="col-span-8">

      <div class="border-b pb-6 pt-4">
        <nav>
          <ul v-if="breadcrumbs">
            <li class="inline-block" v-for="item in breadcrumbs" :key="item.path">
              <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <h1 class="text-3xl">{{ post.title }}</h1>
        <p class="text-gray-600">{{ post.description }}</p>
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
    <aside class="col-span-2">
      <p class="font-medium pb-2">Table of Contents</p>
      <ul class="text-gray-600">
        <li v-for="section in sections">
          <NuxtLink v-if="section.level >= 2" class="hover:text-blue-400" :class="{ 'pl-4': section.level === 3 }"
            :to="`${route.path}#${section.title}`">{{ section.title }}</NuxtLink>
        </li>
      </ul>
    </aside>
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
