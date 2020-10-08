/**
 * 对axios进行2此封装
 * 一个能发送 ajax 请求的函数
 * 1、统一处理请求异常
 * 2、异步请求成功的数据不是 response，而是 response.data
 * 3、对请求体参数进行 urlencode 处理，而不是使用默认的 json 方式（后台接口不支持）
 * 4、配置请求超时的时间
 * 5、通过请求头携带 token 数据
 * 6、请求loading...
 */
import axios from 'axios'
import qs from 'qs'
import { Indicator,Toast } from 'mint-ui'
import store from '../vuex/store'
import router from '../router'

const instance = axios.create({
  // baseURL: 'http://localhost:4000', 出跨域请求问题
  baseURL: '/api', //让代理服务器转发请求4000
  timeout: 20000 // 4、配置请求超时的时间
})

// 添加请求拦截器
instance.interceptors.request.use((config)=>{
  console.log('req interceptor')
  //  显示请求loading
  Indicator.open()
  //  3、对请求体参数进行 urlencode 处理，而不是使用默认的 json 方式（后台接口不支持）
  const data = config.data
  if(data instanceof Object){
    config.data = qs.stringify(data)
  }

  //  处理token问题
  const token = store.state.token
  // 只要浏览端token就携带给服务端
  if (token) {
    config.headers['Authorization'] = token
  } else {
    // 如果没有token但请求必须要token
    if (config.headers.checkToken) {
      throw new Error('没有token, 不发请求')
    }
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('res interceptor')
    //  隐藏请求loading
    Indicator.close()

    // 2、异步请求成功的数据不是 response，而是 response.data
    return response.data
  },
  error => {
    //  隐藏请求loading
    Indicator.close()
    // 1. 没有token直接发请求的错误
    if (!error.response) {
      if (router.currentRoute.path!=='/login') {
        Toast(error.message)
        // 跳转到登陆页面
        router.replace('/login')
      }
    } else {
      // 2. 发了请求, 但token失效了
      if (error.response.status==401) {
        // 退出登陆
        store.dispatch('logout')
        // 如果当前没有在登陆界面, 自动跳转到登陆页面
        if (router.currentRoute.path!=='/login') {
          Toast(error.message)
          // 跳转到登陆页面
          router.replace('/login')
        }
      } else if (error.response.status==404) { // 3. 404错误
        Toast('此资源不存在')
      }
      // 4. 其它
      Toast('提示', error.message)
    }
    return new Promise(()=>{}) //返回一个pending状态的promise =》 中断promise链
  }
)

export default instance

