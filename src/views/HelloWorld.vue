<script setup>
import { ref, watch } from 'vue';

import ColorCard from '../components/ColorCard.vue';
import ColorPicker from 'primevue/colorpicker';

import convert from 'color-convert';

const color = ref('');
const colorName = ref('');
const btcAddr = ref('');

const getHEX = () => `#${color.value}`;
const getRGB = () => convert.hex.rgb(color.value).join(' ');

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
        <div class="flex flex-row gap-2">
          <InputText type="text" :value="getRGB()" v-tooltip="'RGB'" readonly/>
          <InputText type="text" :value="getHEX()" v-tooltip="'HEX'" readonly/>
        </div>
        <InputText type="text" v-model="colorName" placeholder="Color Name" v-tooltip="'Color Name'" />
        <InputText type="text" v-model="btcAddr" placeholder="BTC Address" v-tooltip="'Please use only Ordinals compatible wallets like UniSats, Xverse or Leather. Otherwise you might have a problem to access your inscription.'" label="Button" />
        <Button label="Claim" />
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>
