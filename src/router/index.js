/**
 * 向外暴露路由器对象模块
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Search from '@/pages/Search/Search.vue'

// const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({

  mode: 'history', // 路由路径没有#

  // 项目中所有路由
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
})

