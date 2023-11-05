<script setup>
import { ref } from 'vue';

import ColorCard from '../components/ColorCard.vue';

const colorsList = ref([
  { color: 'e0218a', name: 'Barbie Pink' },
  { color: '0088ff', name: 'Sky Blue' },
  { color: 'ddffdd', name: 'Light Green' },
  { color: 'a3ff00', name: 'Super Lime' },
  { color: 'fe6f00', name: 'Prime Orange' },
  { color: '7d1716', name: 'Bloody Red' },
]);

</script>

<template>
  Colors List
  <ul>
    <li v-for="item in colorsList">
      <ColorCard :color="item.color" :name="item.name" :size="100"></ColorCard>
    </li>
  </ul>
</template>

<style scoped>

</style>
