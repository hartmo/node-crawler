import Vue from 'vue';

import Layout from 'component/layout/app';
import Mtable from 'component/table';
import VueSocketio from 'vue-socket.io';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueSocketio, 'http://127.0.0.1:7001');
Vue.use(ElementUI);
Vue.component(Layout.name, Layout);
Vue.component(Mtable.name, Mtable);
