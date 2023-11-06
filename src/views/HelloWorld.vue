<script setup>
import { ref, watch } from 'vue';

import ColorCard from '../components/ColorCard.vue';
import ColorPicker from 'primevue/colorpicker';

import convert from 'color-convert';

const randomColor = () => {
  return convert.rgb.hex([256, 256, 256].map(n => Math.floor(Math.random()*n)));
};

const color = ref('');
const hashColor = ref('');
const rgbColor = ref('');
const colorName = ref('');
const btcAddr = ref('');

const getHEX = () => `#${color.value}`;
const getRGB = () => convert.hex.rgb(color.value).join(' ');

watch(hashColor, () => {
  color.value = hashColor.value.trim().replace(/#/, '');
});
watch(rgbColor, () => {
  color.value = convert.rgb.hex(rgbColor.value.trim().split(' '));
});
watch(color, () => {
  hashColor.value = `#${color.value}`;
  rgbColor.value = convert.hex.rgb(color.value).join(' ');
});

color.value = randomColor();

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
          <InputText type="text" v-model="rgbColor" v-tooltip="'RGB'"/>
          <InputText type="text" v-model="hashColor" v-tooltip="'HEX'"/>
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
