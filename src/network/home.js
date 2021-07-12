import { request } from "./request"

// 请求/home/multidata
export function getHomeMultidata() {
  return request({
    url:"/home/multidata"
  })
}