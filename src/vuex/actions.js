/**
 * 包含n个用于间接更新状态数据的方法的对象
 * 方法可以包含异步贺逻辑处理代码
 * vuex 的 actions 模块
 */
import {
  reqAddress, 
  reqCategorys, 
  reqShops,
  reqAutoLogin
} from '../api'
import {
  RECEIVE_ADDRESS, 
  RECEIVE_CATEGORYS, 
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_TOKEN,
  LOGOUT
} from './mutation-types'

export default {

  async getAddress ({commit,state}){
    const {latitude, longitude} = state
    // 发异步请求
    const result = await reqAddress(`${latitude},${longitude}`)
    //请求成功后，提交给mutation
    if(result.code === 0){
      // const address = result.data
      commit(RECEIVE_ADDRESS,result.data)
    }
  },

  async getCategorys ({commit}){
    // 发异步请求
    const result = await reqCategorys()
    //请求成功后，提交给mutation
    if(result.code === 0){
      // const address = result.data
      commit(RECEIVE_CATEGORYS,result.data)
    }
  },

  async getShops ({commit,state}){
    const {latitude, longitude} = state
    // 发异步请求
    const result = await reqShops({latitude, longitude})
    //请求成功后，提交给mutation
    if(result.code === 0){
      // const address = result.data
      commit(RECEIVE_SHOPS,result.data)
    }
  },

  //同步保存用户和token的信息
  syncUserInfo({commit},userInfo){
    const {token} = userInfo
    delete userInfo.token
    localStorage.setItem('token_key',token)
    commit(RECEIVE_USER_INFO,userInfo)
    commit(RECEIVE_TOKEN,token)
  },
  
  //退出登录
  logout({commit}){
    localStorage.removeItem('token_key')
    //清除token和userInfo
    commit(LOGOUT)
  },

  // 自动登录
  async autoLogin({commit}){
    const result = await reqAutoLogin()
    const user = result.data
    commit(RECEIVE_USER_INFO,user)
  }
}