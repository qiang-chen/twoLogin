// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSocketio from 'vue-socket.io';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(new VueSocketio({
  connection:'ws://127.0.0.1:7001'
}));

Vue.config.productionTip = false;
Vue.use(ElementUI);

import store from "@/store/index"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
