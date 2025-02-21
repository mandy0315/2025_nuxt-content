<script setup lang="ts">
withDefaults(defineProps<{
  path: string;
  idx: number;
  title: string;
}>(), {
  title: '',
})

</script>
<template>
  <NuxtLink :to="path" class="flex justify-between p-4 h-20 rounded c-border-btn"
    :class="idx === 0 ? 'flex-row-reverse' : ''">
    <div :class="{ 'text-right': idx === 0 }">
      <p v-if="idx === 0" class="c-text-gray text-sm">上一篇</p>
      <p v-else class="c-text-gray text-sm">下一篇</p>

      <p v-if="title">{{ title }}</p>
      <p v-else>{{ `沒有${idx === 0 ? '上篇' : '下篇'}囉！回到文章列表` }}</p>
    </div>
    <div class="c-text-gray">
      <Icon v-if="idx === 0" name="solar:arrow-left-outline" size="1.5rem" />
      <Icon v-else name="solar:arrow-right-outline" size="1.5rem" />
    </div>
  </NuxtLink>
</template>
