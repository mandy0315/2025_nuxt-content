<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    totalPage: number,
    limitCount?: number,
  }>()
  , {
    limitCount: 5
  })

const currentPage = defineModel<number>('currentPage', {
  required: true
})
const goToPage = (page: number) => {
  if (page > 1 || page < props.totalPage) {
    currentPage.value = page;
  };
}

const changePage = (offset: number) => {
  goToPage(currentPage.value + offset);
};

const visibleCount = computed(() => {
  const half = Math.floor(props.limitCount / 2);
  let start = currentPage.value - half; // 起始頁碼
  let end = currentPage.value + half;   // 結束頁碼

  // 起始/結束不超出範圍
  if (start < 1) {
    start = 1;
    end = Math.min(props.totalPage, props.limitCount);
  }
  if (end > props.totalPage) {
    end = props.totalPage;
    start = Math.max(1, end - props.limitCount + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

</script>
<template>
  <div>
    <button @click="goToPage(1)" class="c-border-btn w-8 h-8 rounded mx-0.5" :disabled="currentPage === 1">
      <Icon name="solar:double-alt-arrow-left-linear" size="1.3rem" class="align-middle" />
    </button>
    <button @click="changePage(-1)" class="c-border-btn w-8 h-8 rounded mx-0.5" :disabled="currentPage === 1">
      <Icon name="solar:alt-arrow-left-outline" size="1.2rem" class="align-middle" />
    </button>

    <button class="c-border-btn w-8 h-8 rounded mx-0.5" v-for="num in visibleCount"
      :class="{ 'bg-c-main-blue text-white': currentPage === num }" :key="num" @click="goToPage(num)">{{ num }}</button>

    <button @click="changePage(1)" class="c-border-btn w-8 h-8 rounded mx-0.5" :disabled="currentPage === totalPage">
      <Icon name="solar:alt-arrow-right-outline" size="1.2rem" class="align-middle" />
    </button>
    <button @click="goToPage(totalPage)" class="c-border-btn w-8 h-8 rounded mx-0.5"
      :disabled="currentPage === totalPage">
      <Icon name="solar:double-alt-arrow-right-linear" size="1.3rem" class="align-middle" />
    </button>

  </div>
</template>