import Vue from 'vue'
import App from './App.vue'
import Dragable from './directive/Dragable'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.directive('dragable', Dragable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
