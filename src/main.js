import { createApp } from 'vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Tooltip from 'primevue/tooltip';
import InputText from 'primevue/inputtext';

import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.directive('tooltip', Tooltip);
app.component('Button', Button);
app.component('InputText', InputText);

app.mount('#app');
