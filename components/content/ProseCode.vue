<template>
  <code class="bg-gray-200/20 px-2 py-1 rounded border border-gray-300 dark:bg-black/50">
    <slot />
  </code>
</template>

<style lang="scss">
.prose {
  :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::before {
    content: none;
  }

  :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::after {
    content: none;
  }
}
</style>