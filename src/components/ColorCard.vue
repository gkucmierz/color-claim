<script setup>
import { ref } from 'vue';
import { encode } from 'js-base64';

const props = defineProps(['color', 'name']);

const svg = `
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100%" height="100%" fill="#${props.color}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="70%" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${props.name}</text>
  </svg>
`;

const svgURI = `data:image/svg+xml;base64,${encode(svg)}`;

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
