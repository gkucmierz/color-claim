<script setup>
import { ref } from 'vue'

import InputText from 'primevue/inputtext';

let colorName = ref('');
let btcAddr = ref('')



</script>

<template>
  <h1>Color Claim</h1>

  <div>
    Choose, name and claim your own color.
  </div>

  <div>
    <InputText type="text" v-model="colorName" />
    <InputText type="text" v-model="btcAddr" />
  </div>

{{ colorName }}
{{ btcAddr }}

</template>

<style scoped>
</style>
