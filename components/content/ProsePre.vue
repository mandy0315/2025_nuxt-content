<template>
  <div class="my-6 group">
    <div class="p-2 bg-gray-200/20 rounded-t border border-gray-300 dark:bg-black/50 flex items-center">
      <Icon v-if="language && LanguageIconList[language]" :name="LanguageIconList[language]" class="align-middle" />
      <span class="pl-2">{{ filename }}</span>

      <button class="hidden cursor-pointer text-xl ml-auto group-hover:inline-block" @click="copyToClipboard">
        <Icon v-if="isCopied" name="solar:clipboard-check-outline" />
        <Icon v-else name="solar:clipboard-text-outline" />
      </button>
    </div>
    <pre class="!my-0 border-b border-l border-r border-gray-300 !rounded-t-none " :class="$props.class">
      <slot />
    </pre>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  code?: string;
  language?: LanguageIconKey | null;
  filename?: string | null;
  highlights?: number[] | null;
  meta?: string | null;
  class?: string | null;
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: null,
  meta: null,
  class: null,
})

type LanguageIconKey = keyof typeof LanguageIconList;
const LanguageIconList = {
  javascript: 'logos:javascript',
  typescript: 'logos:typescript-icon',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  scss: 'vscode-icons:file-type-scss',
  vue: 'logos:vue',
  react: 'logos:react',
  nodejs: 'logos:nodejs',
} as const;

const isCopied = ref(false);
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;

    // 2秒後重置按鈕狀態
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('無法複製內容: ', err);
  }
};
</script>

<style lang="scss">
pre code .line {
  display: block;
}

.prose {
  :where(pre):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
    background-color: rgba(229, 231, 235, 20%) !important;
  }
}

.dark .prose {
  :where(pre):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
    background-color: rgba(0, 0, 0, 50%) !important;
  }
}
</style>