import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import Button from "primevue/button";

import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(PrimeVue);
app.component('Button', Button);

app.mount('#app');
