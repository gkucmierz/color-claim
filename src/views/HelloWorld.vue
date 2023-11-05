<script setup>
import { ref } from 'vue';

import ColorCard from '../components/ColorCard.vue';
import ColorPicker from 'primevue/colorpicker';

const color = ref('');
const colorName = ref('');
const btcAddr = ref('');

</script>

<template>
  <div class="flex">
    <div class="">
      <div>Choose, name and claim your own color.</div>
      <ColorPicker v-model="color" inline />
    </div>

    <div class="flex justify-content-center flex-column flex-wrap">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <ColorCard :color="color" :name="colorName"></ColorCard>
        <InputText type="text" v-model="colorName" placeholder="Color Name" />
        <InputText type="text" v-model="btcAddr" placeholder="BTC Address" v-tooltip.top="'Please use only Ordinals compatible wallets like UniSats, Xverse or Leather. Otherwise you might have a problem do access you inscription.'" label="Button" />
        <Button label="Claim" />
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>
