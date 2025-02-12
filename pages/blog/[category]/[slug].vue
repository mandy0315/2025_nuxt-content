<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { currSection,
  setNavListener } = useNavListener();
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
onMounted(() => {
  setBreadcrumbs();
});

// 上下篇文章
const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('blog', route.path).where('category', '=', route.params.category);
})

// 右側目錄
type Section = {
  title: string;
  element: HTMLElement | null;
  level: number;
}
const { data: sections } = await useAsyncData('sections', async () => {
  const sections = await queryCollectionSearchSections('blog', {
    ignoredTags: ['code', 'p']
  })
  const filteredSections = sections.filter(section =>
    section.id.startsWith(route.path)
  )
  return filteredSections
})
const sectionsInfo = ref<Array<Section>>([]);
const handleScrollToSection = (section: Section) => {
  const FIXED_HEADER_HEIGHT = 64;

  // 更新 URL 錨點，但不觸發默認滾動行為
  history.pushState(null, '', `#${section.title}`);

  if (section?.element) {
    window.scrollTo({
      top: section?.element.offsetTop - FIXED_HEADER_HEIGHT,
      behavior: 'smooth',
    });
  }
}
onMounted(() => {
  if (sections.value) {
    sectionsInfo.value = sections.value.filter((section) => section.level >= 2).map((section) => {
      return {
        title: section.title,
        element: document.getElementById(section.title),
        level: section.level
      }
    });

    setNavListener({
      navs: sectionsInfo.value.map(section => {
        return {
          title: section.title,
          element: section.element
        }
      }),
    });
  }
})
</script>

<template>
  <div v-if="post" class="grid grid-cols-10 gap-x-8 ">
    <div class="col-span-8 pb-10">
      <div class="border-b pb-6 pt-4">
        <!-- 麵包屑 -->
        <nav v-if="breadcrumbs">
          <div class="inline-block" v-for="item in breadcrumbs" :key="item.path">
            <NuxtLink class="capitalize hover:text-blue-400" :to="item.path">{{ item.title }}</NuxtLink>
          </div>
        </nav>

        <h1 class="text-3xl">{{ post.title }}</h1>
        <p class="text-gray-600">{{ post.description }}</p>
      </div>

      <!-- 文章內容 -->
      <article class="prose prose-primary dark:prose-invert">
        <ContentRenderer :value="post" />
      </article>

      <!-- 上下篇文章 -->
      <ul class="grid grid-cols-2 gap-8">
        <li class="col-span-1 w-full last:text-right" v-for="surround in surroundings">
          <NuxtLink v-if="surround" class="w-full p-2 border block" :to="surround.path">
            <p>{{ surround.title }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="col-span-2">
      <!-- 右側目錄 -->
      <aside class="sticky top-[--header-height] pt-10 pl-4">
        <p class="font-medium pb-2">Table of Contents</p>
        <ul class="text-gray-600">
          <li v-for="section in sectionsInfo">
            <div class=" hover:text-blue-400 cursor-pointer"
              :class="[{ 'text-blue-400': currSection === section.title }, { 'pl-4': section.level === 3 }]"
              @click="handleScrollToSection(section)">{{
                section.title }}</div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
nav {
  div::after {
    content: '>';
    margin: 0 0.5rem;
  }

  div:last-child::after {
    content: '';
  }
}
</style>
