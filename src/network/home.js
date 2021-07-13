import { request } from "./request"

// 请求/home/multidata
export function getHomeMultidata() {
  return request({
    url:"/home/multidata"
  })
}

// /home/data?type=pop&page=1
// 请求商品数据
export function getHomeGoods(type,page) {
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}