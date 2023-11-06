<script setup>
import { ref, watch, onMounted } from 'vue';

import ToggleButton from 'primevue/togglebutton';

const grid = ref(true);

let ctx;

const canvas = ref(null);
const size = (256 ** 3) ** 0.5;

const draw = () => {
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      const i = ((y * size) + x) * 4;
      const a = y % 256;
      const b = x % 256;
      const c = (y >> 8) << 4 | (x >> 8);
      const r = grid.value ? (x + y) % 2 : 1;
      data[i + 0] = a * r;
      data[i + 1] = b * r;
      data[i + 2] = c * r;
      data[i + 3] = 255;
    }
  }
  ctx.clearRect(0, 0, size, size);
  ctx.putImageData(imageData, 0, 0);
};

watch(grid, draw);

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  draw();
});

</script>

<template>
  <canvas ref="canvas" :width="size" :height="size"></canvas>
  <ToggleButton v-model="grid" onLabel="hide grid" offLabel="show grid" />
</template>

<style scoped>

</style>
