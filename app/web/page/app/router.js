import Vue from 'vue';

import VueRouter from 'vue-router';

import indexView from './index/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: indexView
    }
  ]
});

export default router;
