
import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from './views/HelloWorld.vue';
import ColorsList from './views/ColorsList.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/colors', component: ColorsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
