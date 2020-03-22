import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Bus from './utils/Bus.js'
import create from './utils/create.js';

Vue.config.productionTip = false
Vue.prototype.$bus = new Bus();
Vue.prototype.$create = create;

// new Vue结果是根实例，$root vm
// App是根组件 $children[0]
new Vue({
  render: h => h(App),
}).$mount('#app')
