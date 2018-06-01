import Vue from 'vue'
import App from './App.vue'
import Dragable from './directive/Dragable'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.directive('dragable', Dragable)

new Vue({
  render: h => h(App)
}).$mount('#app')
