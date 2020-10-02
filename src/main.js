import Vue from 'vue'
import 'lib-flexible'

import App from './App'
import router from './router'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'

//注册全局组件
Vue.component('HeaderTop',HeaderTop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


// new Vue({
//   el: '#app',
//   components:{App},
//   template: '<App/>'
// })
