import axios from 'axios'
// 封装一个自己需要的axios请求，在使用请求时，直接使用这个模块，请求不用加域名，和共同的headwes
import { Toast } from 'vant' // 引入加载提示的组件
const http = axios.create({
  baseURL: 'https://m.maizuo.com/', // 一个共同的域名
  timeout: 10000,
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16108630761187940709433345","bc":"310100"}' }
  // 一个共同的headers
})

// axios拦截器：每次执行请求前都要先通过拦截器，再发送请求，请求完成还有另一个拦截器再执行一次
// axios发送请求之前的拦截器
// http.interceptors.request()
// axios请求完成之后的拦截器
// http.interceptors.response()

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // 在发送请求之前做的一些配置或者方法

  // 显示加载提示
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // 任何位于请求成功范围内的状态代码都会触发此函数
  // 对拿到的响应数据做的一些方法等
  Toast.clear() // 数据加载完成，清除加载提示
  return response
}, function (error) {
  // 任何请求失败的状态码都会触发此函数
  // 报出响应错误
  return Promise.reject(error)
})
export default http
