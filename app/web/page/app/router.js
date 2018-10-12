import Vue from 'vue';

import VueRouter from 'vue-router';

import indexView from './index/index';
import searchView from './search/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: '首页',
      component: indexView
    },
    {
      path: '/search',
      name: '小说搜索',
      component: searchView
    }
  ]
});

export default router;
