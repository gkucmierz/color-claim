<script setup>
import { ref } from 'vue';

import ColorCard from '../components/ColorCard.vue';

const colorsList = ref([
  { name: 'Barbie Pink', color: 'e0218a' },
  { name: 'Sky Blue', color: '0088ff' },
  { name: 'Light Green', color: 'ddffdd' },
  { name: 'Dark Green', color: '005500' },
]);

</script>

<template>
  Colors List
  <ul>
    <li v-for="item in colorsList">
      <ColorCard :color="item.color" :name="item.name"></ColorCard>
    </li>
  </ul>
</template>

<style scoped>

</style>
