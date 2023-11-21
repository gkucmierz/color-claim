
import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from './views/HelloWorld.vue';
import ColorsList from './views/ColorsList.vue';
import CanvasBoard from './views/CanvasBoard.vue';
import CanvasBoard2d from './views/CanvasBoard2d.vue';
import Status from './views/Status.vue';
import Payment from './views/Payment.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/colors', component: ColorsList },
  { path: '/colors', component: ColorsList },
  { path: '/canvas', component: CanvasBoard },
  { path: '/canvas2d', component: CanvasBoard2d },
  { path: '/status', component: Status },
  { path: '/payment', component: Payment },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
