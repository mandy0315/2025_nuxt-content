<script setup lang="ts">
const keyword = '珍奶';

const { updatedKeywords } = await useSearch();
onMounted(async () => {
  updatedKeywords(keyword);
});

const clearKeyword = async () => {
  console.log('clearKeyword');
  await updatedKeywords('');
};


</script>

<template>

  <div>search</div>
  <button @click="clearKeyword">X</button>
</template>