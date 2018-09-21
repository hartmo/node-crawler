import Vue from 'vue';

import VueRouter from 'vue-router';

import indexView from './index/index';
import ipView from './ip/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      name: '首页',
      path: '/',
      component: indexView
    },
    {
      name: '代理ip',
      path: '/ip',
      component: ipView
    },
  ]
});

export default router;
