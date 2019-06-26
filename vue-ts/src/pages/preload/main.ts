import Vue from 'vue';
import App from './App.vue';

import '@/styles/common.scss';

import store from '@/store/PreloadStore';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
