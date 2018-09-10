import Vue from 'vue';

import Layout from 'component/layout/app';
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://127.0.0.1:7001');
Vue.component(Layout.name, Layout);
