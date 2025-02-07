<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
</script>

<template>
  <!-- <h1>{{ post?.title }}</h1>
  <p>{{ post?.description }}</p> -->
  <article class="prose prose-primary dark:prose-invert">
    <ContentRenderer v-if="post" :value="post" />
  </article>
</template>
