<script setup>
import { ref } from 'vue';

import { generate } from '../utils/certificate';
import { STORAGE_KEY_COLOR, STORAGE_KEY_NAME, STORAGE_KEY_BTC_ADDR, readStorage } from '../utils/storage';


const color = ref(readStorage(STORAGE_KEY_COLOR));
const colorName = ref(readStorage(STORAGE_KEY_NAME));
const btcAddr = ref(readStorage(STORAGE_KEY_BTC_ADDR));

const downloadPDF = () => {
  generate(colorName.value, color.value, btcAddr.value);
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
