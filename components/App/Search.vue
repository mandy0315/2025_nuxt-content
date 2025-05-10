<script setup lang="ts">

const { keywords, updatedKeywords, isShowSearchModal } = useSearch();
watch(keywords, (newVal) => {
  updatedKeywords(newVal);
});
onMounted(() => {
  updatedKeywords('');
});



</script>

<template>

  <button @click="isShowSearchModal = !isShowSearchModal">search</button>
  <Teleport to="body">
    <div v-if="isShowSearchModal">
      <div class="w-5/10 fixed top-20 transform -translate-x-1/2 left-1/2 overflow-hidden z-110">
        <button @click="updatedKeywords('')" class="absolute top-3 right-3 text-gray-500 z-20 text-2xl">
          <Icon name="solar:close-circle-bold" />
        </button>
        <label class="relative w-full h-12 flex bg-white rounded-t border border-gray-300">
          <input type="text" v-model.lazy="keywords" class=" px-10 w-full" placeholder="搜尋網站..." />
          <Icon name="solar:magnifer-linear" class="absolute top-3.5 left-3 text-gray-500 z-10 text-lg" />
        </label>
      </div>

      <div></div>

      <div @click.stop="isShowSearchModal = false" class="fixed inset-0 w-full h-full bg-black/80 z-100"></div>
    </div>
  </Teleport>


</template>