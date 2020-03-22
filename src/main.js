import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Bus from './utils/Bus.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Bus();

new Vue({
  render: h => h(App),
}).$mount('#app')
