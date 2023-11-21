<script setup>
import { ref } from 'vue';

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';

import QRCode from 'qrcode';

import { STORAGE_KEY_COLOR, STORAGE_KEY_NAME, STORAGE_KEY_BTC_ADDR, readStorage } from '../utils/storage';

const color = ref(readStorage(STORAGE_KEY_COLOR));
const colorName = ref(readStorage(STORAGE_KEY_NAME));
// const btcAddr = ref(readStorage(STORAGE_KEY_BTC_ADDR));

const btcAddr = ref('3J9EjVWsGk4p4mc3JDpMpQBNBDoQSiwvvP');
const invoice = ref('lnbc2680n1pj4ck4vpp5tqpnt2nzdmg7pgpzg2ezemtp8wwasamtg3fet94kzgy89dg485wqdq9fch5zcqzzsxqzjhsp5szwgmea0rv7ce3nmkcg8t3ttlawa7vzpg3jht7f3jh2gghyn6nzq9qyyssqlyeqrdxgscmd4kyltmn72pnmhqt4aewwj7amtxxktgpgf75yyp9szkcsm3f8weqqqz6p7mej9k6qwl3y33kk4hdlmenzqmp35cc4g5cqw64u6d');
const btcQr = ref('');
const lnQr = ref('');

(async () => {
  btcQr.value = await QRCode.toDataURL('bitcoin:3J9EjVWsGk4p4mc3JDpMpQBNBDoQSiwvvP?amount=0.00000268&label=N%2FA');
  //&lightning=lnbc2680n1pj4ck4vpp5tqpnt2nzdmg7pgpzg2ezemtp8wwasamtg3fet94kzgy89dg485wqdq9fch5zcqzzsxqzjhsp5szwgmea0rv7ce3nmkcg8t3ttlawa7vzpg3jht7f3jh2gghyn6nzq9qyyssqlyeqrdxgscmd4kyltmn72pnmhqt4aewwj7amtxxktgpgf75yyp9szkcsm3f8weqqqz6p7mej9k6qwl3y33kk4hdlmenzqmp35cc4g5cqw64u6d');
  lnQr.value = await QRCode.toDataURL(invoice.value);
})();

</script>

<template>
  
  <TabView class="tabview-custom">
    <TabPanel>
        <template #header>
            <div class="flex align-items-center gap-2">
                <Avatar image="btc.png" shape="circle" />
                <span class="font-bold white-space-nowrap">Bitcoin</span>
            </div>
        </template>
        <p class="m-0">
          <img :src="btcQr" alt="Bitcoin payment"/>
          <p>Amount: 0.00001568 BTC</p>
          <p>Address: {{ btcAddr }}</p>
        </p>
    </TabPanel>
    <TabPanel>
        <template #header>
            <div class="flex align-items-center gap-2">
                <Avatar image="ln.png" shape="circle" />
                <span class="font-bold white-space-nowrap">Lightning Network</span>
            </div>
        </template>
        <p class="m-0">
          <img :src="lnQr" alt="Lightning Network payment"/>
          <p>Amount: 1568 sats</p>
          <p>Invoice: <span class="invoice">{{ invoice }}</span></p>
          <p>Expiraction: 5:42 (countdown)</p>
        </p>
    </TabPanel>
  </TabView>

  <p>Payment processor: <a href="https://checkout.opennode.com/0977c7e6-6134-4b65-bf5a-30780defef45">https://checkout.opennode.com/0977c7e6-6134-4b65-bf5a-30780defef45</a></p>
  <pre>
    {{ resp }}
  </pre>

</template>

<style scoped>
.invoice {
  text-overflow: ellipsis;
}
</style>
