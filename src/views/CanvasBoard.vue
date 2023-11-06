<script setup>
import { ref, watch, onMounted } from 'vue';

import Slider from 'primevue/slider';
import RadioButton from 'primevue/radiobutton';

let ctx;
const value = ref(0);
const type = ref(0);

const canvas = ref(null);
// const size = (256 ** 3) ** 0.5;
const size = 256;

const draw = (v, type) => {
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      const i = (y * size + x) * 4;
      data[i + (type + 0) % 3] = x;
      data[i + (type + 1) % 3] = y;
      data[i + (type + 2) % 3] = v;
      data[i + 3] = 255;
    }
  }
  ctx.clearRect(0, 0, size, size);
  ctx.putImageData(imageData, 0, 0);
};

watch([value, type], () => {
  draw(value.value, type.value);
});

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  draw(0, 0);
});


</script>

<template>

  <canvas ref="canvas" :width="size" :height="size"></canvas>

  <div class="flex flex-wrap gap-3">
    Slider Value
    <div class="flex align-items-center">
        <RadioButton v-model="type" inputId="opt1" value="1" />
        <label for="opt1" class="ml-2">Red</label>
    </div>
    <div class="flex align-items-center">
        <RadioButton v-model="type" inputId="opt2" value="2" />
        <label for="opt2" class="ml-2">Green</label>
    </div>
    <div class="flex align-items-center">
        <RadioButton v-model="type" inputId="opt3" value="0" />
        <label for="opt3" class="ml-2">Blue</label>
    </div>
  </div>

  <div style="margin: 20px; width:300px;">
    <InputText v-model.number="value" />
    <Slider v-model="value" :min="0" :max="255" />
  </div>
</template>

<style scoped>

</style>
