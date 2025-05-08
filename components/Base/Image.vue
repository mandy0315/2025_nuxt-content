<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
  fallback?: string;
  imgClass?: string;
}>();

const currentSrc = ref(props.src);

const handleError = () => {
  console.log('test', currentSrc.value);
  currentSrc.value = props.fallback || '/images/default-image.jpg';
};
</script>
<template>
  <ClientOnly>
    <img :src="currentSrc" :alt :class="imgClass" @error="handleError" />
  </ClientOnly>
</template>
