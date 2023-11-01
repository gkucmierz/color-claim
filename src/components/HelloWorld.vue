<script setup>
import { ref } from 'vue'

import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Button from 'primevue/button';

let color = ref('');
let colorName = ref('');
let btcAddr = ref('');

</script>

<template>
  <div class="main">
    <div>
      Choose, name and claim your own color.
    </div>

    <div class="card flex justify-content-center">
      <ColorPicker v-model="color" inline />
      <InputText type="text" v-model="colorName" placeholder="Color Name" />
      <InputText type="text" v-model="btcAddr" placeholder="BTC Address" />
      <Button label="Claim" />
    </div>
  </div>

  <pre>
    #{{ color }}
    {{ colorName }}
    {{ btcAddr }}
  </pre>

</template>

<style scoped>
/*
.main {
  display: flex;
}

.right-panel {
  display: flex;
  flex-direction: column;
}*/

</style>
