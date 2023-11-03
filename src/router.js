
import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from './components/HelloWorld.vue';
import Colors from './components/Colors.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/colors', component: Colors },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
