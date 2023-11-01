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
  <div class="flex">
    <div class="">
      <div>Choose, name and claim your own color.</div>
    </div>

    <div class="flex justify-content-center flex-column flex-wrap">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <ColorPicker v-model="color" inline />
        <InputText type="text" v-model="colorName" placeholder="Color Name" />
        <div class="p-inputgroup flex-1">
          <InputText type="text" v-model="btcAddr" placeholder="BTC Address" />
          <Button icon="pi pi-qrcode" severity="secondary" />
        </div>
        <Button label="Claim" />
      </form>
    </div>
  </div>

  <pre>
    #{{ color }}
    {{ colorName }}
    {{ btcAddr }}
  </pre>

</template>

<style scoped>

</style>
