/**
 * 包含 n 个接口请求函数的模块
 * 每个函数返回的都是 promise
 */
import ajax from './ajax' 

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash)=> ajax(`/position/${geohash}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category',{
  headers: {
    checkToken: true
  }
})

// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude}) => ajax('/shops',{
  params: {latitude,longitude},
  headers: {
    checkToken: true
  }
})

// 4、根据经纬度和关键字搜索商铺列表

// 5、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha})=> ajax({
  url: '/login_pwd',
  method: 'POST',
  data: {
    name,
    pwd,
    captcha
  }
})
// 6、发送短信验证码
export const reqSendcode = (phone) => ajax('/sendcode',{
  params:{phone}
})
// 7、手机号验证码登陆
export const reqSmsLogin = ({phone,code})=> ajax({
  url: '/login_sms',
  method: 'POST',
  data: {
    phone,
    code
  }
})
// 8、自动登录
export const reqAutoLogin = () => ajax("/auto_login",{
  headers: {
    checkToken: true
  }
})

// 9、根据会话获取用户信息

