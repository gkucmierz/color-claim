<script setup>
import { ref } from 'vue'

import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';

let color = ref('');
let colorName = ref('');
let btcAddr = ref('');

</script>

<template>
  <h1>Color Claim</h1>

  <div>
    Choose, name and claim your own color.
  </div>

  <div>
    <ColorPicker v-model="color" inline />
    <InputText type="text" v-model="colorName" placeholder="Color Name" />
    <InputText type="text" v-model="btcAddr" placeholder="BTC Address" />
  </div>

  <pre>
    #{{ color }}
    {{ colorName }}
    {{ btcAddr }}
  </pre>

</template>

<style scoped>
</style>
