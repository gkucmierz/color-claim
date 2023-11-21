<script setup>
import { ref } from 'vue';

import { STORAGE_KEY_COLOR, STORAGE_KEY_NAME, STORAGE_KEY_BTC_ADDR, readStorage } from '../utils/storage';

const color = ref(readStorage(STORAGE_KEY_COLOR));
const colorName = ref(readStorage(STORAGE_KEY_NAME));
const btcAddr = ref(readStorage(STORAGE_KEY_BTC_ADDR));

</script>

<template>
  Payment View

</template>

<style scoped>

</style>
