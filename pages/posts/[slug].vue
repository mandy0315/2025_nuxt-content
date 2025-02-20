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
      return queryCollectionNavigation('posts').where('title', '=', post.value?.title)
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
          <nav v-if="breadcrumbs" class="c-text-gray">
            <div class="inline-block" v-for="item in breadcrumbs" :key="item.path">
              <component :is="item.title === post.title ? 'span' : 'button'"
                :class="item.title === post.title ? 'cursor-default' : 'hover:text-blue-400'"
                @click="$router.push(item.path)" :disabled="item.title === post.title">
                {{ item.title }}
              </component>
            </div>
          </nav>


          <h1 class="text-4xl font-bold py-4">{{ post.title }}</h1>
          <div class="pb-2 grid grid-cols-2 gap-x-2">
            <div class="col-span-1">
              <UDate class="align-middle inline-block" :date="post.date" />
            </div>
            <div class="col-span-1 text-right">
              <button class="pr-1 cursor-pointer" v-for="category in post.categorys" :key="category"
                @click="goToCategoryPage(category)">
                <UTag class="text-sm">{{ category }}</UTag>
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
            <USurroundCard :path="surround?.path ? surround.path : '/posts'" :title="surround?.title" :idx />
          </li>
        </ul>
      </div>
    </template>
    <template #right-side>
      <URightSideTitle>目錄</URightSideTitle>
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
