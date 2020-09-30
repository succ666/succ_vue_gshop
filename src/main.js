import Vue from 'vue'
import App from './App'
import 'lib-flexible'

import router from './router'

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
