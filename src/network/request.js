// 很可能会封装多个实例,所以不使用export default
import axios from "axios"

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    
    baseURL:'http://152.136.185.210:7878/api/hy66',
    // baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器
  //config是指回调函数传过来的参数，名称可以随意起，其实内容就是配置config
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })


  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })


  // 3. 发送真正的网络请求
  // 直接return instance(config) 因为它这个本身就是一个Promise
  return instance(config)  
}