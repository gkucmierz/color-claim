<script setup>
import { ref, watch, onMounted } from 'vue';

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
      data[i + 0] = a;
      data[i + 1] = b;
      data[i + 2] = c;
      data[i + 3] = 255;
    }
  }
  ctx.clearRect(0, 0, size, size);
  ctx.putImageData(imageData, 0, 0);
};

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  draw();
});

</script>

<template>
  <canvas ref="canvas" :width="size" :height="size"></canvas>
</template>

<style scoped>

</style>
