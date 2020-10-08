/**
 * 包含n个状态数据属性的对象
 */
export default {
  // 45.714492    黑龙江大学（主校区）    126.625392
  // latitude: 40.10038, // 纬度
  // longitude: 116.36867, // 经度
  latitude: 45.714492, // 纬度
  longitude: 126.625392, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
  userInfo: {},  //保存用户信息
  token: localStorage.getItem('token_key')  //保存token信息
}