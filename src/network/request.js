import axios from "axios"

export function request(config) {
  // 创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w-6',
    timeout: 5000,
  })

  // axios 的拦截器
  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(errs)
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  return instance(config)
}