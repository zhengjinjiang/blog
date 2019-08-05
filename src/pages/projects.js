import 'promise-polyfill/src/polyfill';

import 'normalize.css';
import '@/styles/common.css';

import Vue from 'vue';
import App from '@/pages/Projects.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
