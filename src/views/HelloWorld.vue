<script setup>
import { ref } from 'vue';

import ColorCard from '../components/ColorCard.vue';

import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { QrcodeStream } from 'vue-qrcode-reader';


const color = ref('');
const colorName = ref('');
const btcAddr = ref('');
const qrDialog = ref(false);

const onDetect = (scans) => {
  btcAddr.value = (scans[0].rawValue || '').replace(/bitcoin\:/, '');
  qrDialog.value = false;
};

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
          <Button icon="pi pi-qrcode" severity="secondary" @click="qrDialog = true" />
        </div>
        <Button label="Claim" />
      </form>
    </div>
  </div>

  <div>
    <p>Preview</p>
    <ColorCard :color="color" :name="colorName"></ColorCard>
  </div>

  <Dialog v-model:visible="qrDialog" modal header="Scan Bitcoin Address">
    <qrcode-stream @detect="onDetect"></qrcode-stream>
  </Dialog>

</template>

<style scoped>

</style>
