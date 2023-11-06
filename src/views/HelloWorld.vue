<script setup>
import { ref, watch } from 'vue';

import ColorPicker from 'primevue/colorpicker';

import ColorCard from '../components/ColorCard.vue';
import validate from 'bitcoin-address-validation';

import convert from 'color-convert';

const STORAGE_KEY_COLOR = 'color';
const STORAGE_KEY_NAME = 'name';
const STORAGE_KEY_BTC_ADDR = 'btcAddr';

const randomColor = () => {
  return convert.rgb.hex([256, 256, 256].map(n => Math.floor(Math.random()*n)));
};

const readStorage = (key, def = '') => {
  const item = localStorage.getItem(key);
  if (item === null) return def;
  return item;
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const color = ref(readStorage(STORAGE_KEY_COLOR, randomColor()));
const hashColor = ref('');
const rgbColor = ref('');
const colorName = ref(readStorage(STORAGE_KEY_NAME));
const btcAddr = ref(readStorage(STORAGE_KEY_BTC_ADDR));
const btcAddrValid = ref(true);
const btcErrorMsg = ref(false);

const claim = () => {
  if (!btcAddrValid.value) return btcErrorMsg.value = true;
  alert('processing tx');
};

watch(hashColor, () => {
  color.value = hashColor.value.trim().replace(/#/, '');
});
watch(rgbColor, () => {
  color.value = convert.rgb.hex(rgbColor.value.trim().split(' '));
});
watch(color, () => {
  hashColor.value = `#${color.value}`;
  rgbColor.value = convert.hex.rgb(color.value).join(' ');
}, { immediate: true });

watch([color, colorName, btcAddr], () => {
  writeStorage(STORAGE_KEY_COLOR, color.value);
  writeStorage(STORAGE_KEY_NAME, colorName.value);
  writeStorage(STORAGE_KEY_BTC_ADDR, btcAddr.value);
});

watch(btcAddr, () => {
  const correct = btcAddr.value === '' || validate(btcAddr.value);
  btcAddrValid.value = correct;
  if (correct) btcErrorMsg.value = false;
}, { immediate: true });

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
        
        <div class="flex flex-column gap-2">
          <InputText type="text" v-model="btcAddr" placeholder="BTC Address" :class="{'p-invalid': !btcAddrValid}"
            v-tooltip="'Please use only Ordinals compatible wallets like UniSats, Xverse or Leather. Otherwise you might have a problem to access your inscription.'" />
          <small class="error-msg" v-if="btcErrorMsg">Please provide valid bitcoin address.</small>
        </div>

        <Button label="Claim"  @click="claim()"/>
      </form>
    </div>
  </div>

</template>

<style scoped>
.error-msg {
  color: #f00;
}
</style>
