<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import validate from 'bitcoin-address-validation';
import convert from 'color-convert';
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
const colorPicker = ref(null);
let iroPicker;

const claim = () => {
  if (!btcAddrValid.value) return btcErrorMsg.value = true;
  if (btcAddr.value === '') return btcErrorMsg.value = true;
  router.push({ path: '/payment' });
};

onMounted(() => {
  iroPicker = new iro.ColorPicker(colorPicker.value, {
    width: 320,
    color: `#${color.value}`,
    borderWidth: 3,
    borderColor: '#fff',
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
  <h1 class="flex justify-content-around text-2xl md:text-4xl lg:text-5xl text-primary">Choose, name and claim your own color.</h1>
  <div class="flex flex-wrap justify-content-evenly" style="max-width: 1500px">
    <div class="flex justify-content-around p-2"><ColorCard :color="color" :name="colorName"></ColorCard></div>
    <div class="flex justify-content-center flex-column flex-wrap">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <div class="flex flex-wrap justify-content-evenly" ref="colorPicker"></div>
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
h1 {
  text-shadow: 0 0 25px #fff, 0 0 25px #fff;
}
</style>
