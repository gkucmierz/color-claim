import { createApp } from 'vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Button from "primevue/button";

import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.component('Button', Button);

app.mount('#app');
