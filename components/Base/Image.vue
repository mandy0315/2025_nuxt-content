<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
  fallback?: string;
  imgClass?: string;
}>();

const currentSrc = ref(props.src);

const handleError = () => {
  currentSrc.value = props.fallback || '/images/default-image.jpg';
};
</script>
<template>
  <NuxtImg :src="currentSrc" :alt :class="imgClass" @error="handleError" />

</template>
