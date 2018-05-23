import Vue from 'vue'
import App from './App.vue'
import Dragable from './directive/Dragable'
Vue.config.productionTip = false
Vue.directive('dragable', Dragable)

new Vue({
  render: h => h(App)
}).$mount('#app')
