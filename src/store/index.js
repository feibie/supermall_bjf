import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 挂载到Vue实例上
export default store