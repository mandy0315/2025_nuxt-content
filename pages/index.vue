<script setup lang="ts">

const route = useRoute();
const allPosts = await useAsyncData(route.path, () => {
  return queryCollection('blog').order('date', 'DESC').all();
})

</script>

<template>
  <div>nuxt3 contant</div>
</template>