<script setup>
import { ref, watch } from 'vue';
import { encode } from 'js-base64';
import fontColorContrast from 'font-color-contrast';


const buildURI = (color, name) => {
  const svg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="#${color}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="70%" fill="${fontColorContrast('#'+color)}" text-anchor="middle" dominant-baseline="middle">${name}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${encode(svg)}`;
};

const props = defineProps(['color', 'name']);
const svgURI = ref(buildURI(props.color, props.name));

watch(props, (newProps) => {
  svgURI.value = buildURI(newProps.color, newProps.name);
});

</script>

<template>
  <img :src="svgURI" />
</template>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
