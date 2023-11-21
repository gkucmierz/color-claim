
import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import ColorsList from './views/ColorsList.vue';
import CanvasBoard from './views/CanvasBoard.vue';
import CanvasBoard2d from './views/CanvasBoard2d.vue';
import Status from './views/Status.vue';
import Payment from './views/Payment.vue';
import Faq from './views/Faq.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/colors', component: ColorsList },
  { path: '/colors', component: ColorsList },
  { path: '/canvas', component: CanvasBoard },
  { path: '/canvas2d', component: CanvasBoard2d },
  { path: '/status', component: Status },
  { path: '/payment', component: Payment },
  { path: '/faq', component: Faq },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
