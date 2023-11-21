<script setup>
import { ref, watch, onMounted } from 'vue';

import validate from 'bitcoin-address-validation';
import convert from 'color-convert';
// import * as ColorPicker from 'a-color-picker';
import iro from '@jaames/iro';

import ColorCard from '../components/ColorCard.vue';
import { STORAGE_KEY_COLOR, STORAGE_KEY_NAME, STORAGE_KEY_BTC_ADDR, readStorage, writeStorage } from '../utils/storage';

const randomColor = () => {
  return convert.rgb.hex([256, 256, 256].map(n => Math.floor(Math.random()*n)));
};

const color = ref(readStorage(STORAGE_KEY_COLOR, randomColor()));
const hashColor = ref('');
const rgbColor = ref('');
const colorName = ref(readStorage(STORAGE_KEY_NAME));
const btcAddr = ref(readStorage(STORAGE_KEY_BTC_ADDR));
const btcAddrValid = ref(true);
const btcErrorMsg = ref(false);
// const colorPicker = ref(null);
const colorPicker2 = ref(null);

let iroPicker;
// let pickerObj;

const claim = () => {
  if (!btcAddrValid.value) return btcErrorMsg.value = true;
  if (btcAddr.value === '') return btcErrorMsg.value = true;
  alert('processing tx');
};

onMounted(() => {
  // const pickerHeightDiff = 0;
  // const pickerWidthDiff = 0;
  // const previewSize = 30 + 22;
  // pickerObj = ColorPicker.from(colorPicker.value, {
  //   color: `#${color.value}`,
  //   showHSL: false,
  //   showRGB: false,
  //   showHEX: false,
  //   hueBarSize: [150 + pickerWidthDiff + previewSize, 11],
  //   slBarSize: [232 + pickerWidthDiff, 150 + pickerHeightDiff],
  // });
  // pickerObj.on('change', arg => {
  //   color.value = arg.color.slice(1);
  // });

  iroPicker = new iro.ColorPicker(colorPicker2.value, {
    // Set the size of the color picker
    width: 320,
    // Set the initial color to pure red
    color: `#${color.value}`,
  });
  iroPicker.on('color:change', c => {
    color.value = c.hexString.slice(1);
  });
});

watch(hashColor, () => {
  color.value = hashColor.value.trim().replace(/#/, '');
});
watch(rgbColor, () => {
  color.value = convert.rgb.hex(rgbColor.value.trim().split(' '));
});
watch(color, () => {
  hashColor.value = `#${color.value}`;
  rgbColor.value = convert.hex.rgb(color.value).join(' ');

  iroPicker?.setColors([`#${color.value}`]);
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
      <!-- <div ref="colorPicker"></div> -->
      <div ref="colorPicker2"></div>
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

        <div class="flex flex-column gap-2">
          <p>Color price: $5</p>
          <p>Blockchain fees: $2.34 (17 sat / byte)</p>
          <p>Overall cost: $7.34</p>
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

<style>
/*.a-color-picker-circle {
  display: none;
}*/
</style>
