<script setup>
import { ref } from 'vue';

import { generate } from '../utils/certificate';

const STORAGE_KEY_COLOR = 'color';
const STORAGE_KEY_NAME = 'name';

const readStorage = (key, def = '') => {
  const item = localStorage.getItem(key);
  if (item === null) return def;
  return item;
};

const color = ref(readStorage(STORAGE_KEY_COLOR));
const colorName = ref(readStorage(STORAGE_KEY_NAME));

const downloadPDF = () => {
  generate(colorName.value, color.value);
};

</script>

<template>
  Status View

  <p>
    Color Name: {{ colorName }}
  </p>
  <p>
    Color: #{{ color }}
  </p>

  <div>
    <Button label="Download Certificate" @click="downloadPDF()" />
  </div>
</template>

<style scoped>

</style>
