/**
 * 包含n个用于直接更新状态数据的方法的对象
 * 方法不可以包含异步贺逻辑处理代码
 * vuex 的mutation 模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_TOKEN,
  LOGOUT
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, address){
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops){
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, userInfo){
    state.userInfo = userInfo
  },
  [RECEIVE_TOKEN] (state, token){
    state.token = token
  },
  [LOGOUT] (state){
    state.token = ''
    state.userInfo = {}
  }
}