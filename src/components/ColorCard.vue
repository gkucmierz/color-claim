<script setup>
import { ref, watch } from 'vue';
import { encode } from 'js-base64';
import fontColorContrast from 'font-color-contrast';
import xss from 'xss';

const px = n => `${n}px`;

const naturalSearch = (cond, retFirstTrue = true) => {
  let min = 1;
  let max = 1;
  while(1) {
    const stop = cond(max);
    if (stop) break;
    min = max;
    max *= 2;
  }
  let mid;
  while (1) {
    mid = Math.floor((min + max) / 2);
    const stop = cond(mid);
    if (stop) {
      max = mid;
    } else {
      min = mid;
    }
    const diff = max - min;
    if (max - min <= 1) {
      return retFirstTrue ? max : min;
    }
  }
};

const getSvgBody = (color, name, size) => {
  return `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="#${xss(color)}" rx="5"/>

      <text x="50%" y="50%" font-family="Arial" font-size="${Math.round(size)}%" fill="${fontColorContrast('#'+color)}" text-anchor="middle" dominant-baseline="middle">${xss(name)}</text>
    </svg>
  `;
};

const buildURI = (color, name, size) => {
  return `data:image/svg+xml;base64,${encode(getSvgBody(color, name, size))}`;
};

const MARGIN = 5;
const props = defineProps({
  color: { type: String },
  name: { type: String },
  size: { type: Number, default: 320 },
});
const svgURI = ref(buildURI(props.color, props.name));
const textSize = ref(50);

const measureSvgTextSize = name => {
  if (name === '') return 0;
  const measure = document.createElement('div');
  document.body.append(measure);
  const size = naturalSearch(size => {
    measure.innerHTML = getSvgBody('000', props.name, size);
    const bbox = measure.querySelector('text').getBBox();
    return bbox.x < MARGIN || bbox.y < MARGIN;
  }, false);
  measure.remove();
  return size;
};

const showSvg = (color, name) => {
  const textSize = measureSvgTextSize(name);
  svgURI.value = buildURI(color, name, textSize);  
}

watch(props, (newProps) => {
  showSvg(newProps.color, newProps.name);
});

showSvg(props.color, props.name);

</script>

<template>
  <img :src="svgURI" />
</template>

<style scoped>
img {
  width: v-bind(px(props.size));
  height: v-bind(px(props.size));
  border-radius: 20px;
  border: 3px solid #fff;
}
</style>
