import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [ADD_COUNTER](state, payload) {
    payload.count++
  }
}