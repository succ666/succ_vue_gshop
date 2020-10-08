import Vue from 'vue'
import 'lib-flexible'

import App from './App'
import router from './router'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import store from './vuex/store'

//注册全局组件
Vue.component('HeaderTop',HeaderTop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //所有组件都能看到 $router 和 $route <router-link> 和 <router-view/>
  store   //所有组件都能看到 $store
}).$mount('#app')



