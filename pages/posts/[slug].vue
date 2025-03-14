<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { currSection,
  setNavListener } = useNavListener();
const route = useRoute();
const { goToCategoryPage } = useCategory();

// 文章
const { data: post } = await useAsyncData('post', () => {
  return queryCollection('posts').path(route.path).first();
})

// 上下篇文章
const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('posts', route.path)
})

// 右側目錄
type Section = {
  title: string;
  element: HTMLElement | null;
  level: number;
}
const { data: sections } = await useAsyncData('sections', async () => {
  const sections = await queryCollectionSearchSections('posts', {
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
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="post">
        <div class="border-b pb-6 pt-4 c-border-gray">
          <!-- 麵包屑 -->
          <nav class="c-text-gray">
            <NuxtLink to="/posts" class="hover:text-blue-400">文章列表</NuxtLink>
            <span class="px-2">></span>
            <span class="text-c-main-blue cursor-default">{{ post.title }}</span>
          </nav>


          <h1 class="text-4xl font-bold py-4">{{ post.title }}</h1>
          <div class="pb-2 grid grid-cols-2 gap-x-2">
            <div class="col-span-1">
              <BaseDate class="align-middle inline-block" :date="post.date" />
            </div>
            <div class="col-span-1 text-right">
              <button class="pr-1 cursor-pointer" v-for="category in post.categorys" :key="category"
                @click="goToCategoryPage(category)">
                <BaseTag class="text-sm">{{ category }}</BaseTag>
              </button>
            </div>
          </div>
          <p>{{ post.description }}</p>
        </div>

        <!-- 文章內容 -->
        <article class="prose prose-primary max-w-full dark:prose-invert">
          <ContentRenderer :value="post" />
        </article>

        <!-- 上下篇文章 -->
        <ul class="grid grid-cols-2 gap-x-4">
          <li class="col-span-1 w-full block " v-for="(surround, idx) in surroundings" :key="idx">
            <BaseSurroundCard :path="surround?.path ? surround.path : '/posts'" :title="surround?.title" :idx />
          </li>
        </ul>
      </div>
    </template>
    <template #right-side>
      <BaseSidebarTitle>目錄</BaseSidebarTitle>
      <ul class="c-text-gray">
        <li v-for="section in sectionsInfo">
          <div class=" hover:text-blue-400 cursor-pointer"
            :class="[{ 'text-blue-400': currSection === section.title }, { 'pl-4': section.level === 3 }]"
            @click="handleScrollToSection(section)">{{
              section.title }}</div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>
