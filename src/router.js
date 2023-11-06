
import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from './views/HelloWorld.vue';
import ColorsList from './views/ColorsList.vue';
import CanvasBoard from './views/CanvasBoard.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/colors', component: ColorsList },
  { path: '/colors', component: ColorsList },
  { path: '/canvas', component: CanvasBoard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
