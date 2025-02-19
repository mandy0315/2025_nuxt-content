<script setup lang="ts">

</script>
<template>
  <div class="grid grid-cols-10 gap-x-4">
    <div class="col-span-8 pb-10">
      <slot />
    </div>
    <div class="col-span-2">
      <!-- 右側目錄 -->
      <aside class="sticky top-c-header-height">
        <slot name="right-side" />
      </aside>
    </div>
  </div>
</template>