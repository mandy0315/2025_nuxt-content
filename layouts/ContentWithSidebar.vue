<script setup lang="ts">
const cookie = useCookie('isShowSidebar', {
  maxAge: 60 * 60 * 24 * 7, // 設定 7 天
  path: '/'
});
const isShowSidebar = ref(true);
const toggleSidebar = () => {
  isShowSidebar.value = !isShowSidebar.value;
  cookie.value = String(isShowSidebar.value);
}
onMounted(() => {
  isShowSidebar.value = Boolean(cookie.value);
});


</script>
<template>
  <div class="flex">
    <div class="pb-10 relative w-full">
      <button class="sticky top-c-header-height left-full pt-2" @click="toggleSidebar">
        <div class="rounded-l c-border-btn border-r-transparent">
          <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" size="1.5rem"
            class="align-middle" />
          <span v-else>
            <Icon name="solar:double-alt-arrow-left-line-duotone" size="1.5rem" class="align-middle" />
            <span class="align-middle pr-1 text-xs">側邊欄</span>
          </span>
        </div>
      </button>
      <div class="pr-4">
        <slot name="content" />
      </div>
    </div>
    <div class="transition-all ease-in delay-150" :class="isShowSidebar ? 'w-60' : 'w-0'">
      <!-- 右側目錄 -->
      <aside class="sticky top-c-header-height transition-all pt-10 px-4"
        :class="isShowSidebar ? 'opacity-100 delay-300' : 'opacity-0'">
        <slot name="right-side" />
      </aside>
    </div>
  </div>
</template>