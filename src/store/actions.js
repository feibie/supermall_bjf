import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
  addCart(context, payload) {
    // console.log(context)
    return new Promise((resolve, reject) => {
      let oldProduce = context.state.cartList.find(item => item.iid === payload.iid)
      if (!oldProduce) {
        payload.count = 1
        // context.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve("添加购物车成功")
      } else {
        // oldProduce.count += 1
        context.commit(ADD_COUNTER, oldProduce)
        resolve("当前商品的数量+1")
      }
    })

  }
}