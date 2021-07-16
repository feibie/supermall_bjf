import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduce = state.cartList.find(item => item.iid === payload.iid)
      console.log(oldProduce)
      if (!oldProduce) {
        payload.count = 1
        state.cartList.push(payload)
      } else {
        oldProduce.count += 1
      }
    }
  }
})

// 挂载到Vue实例上
export default store