import Toast from "./Toast"

const obj = {
  install(Vue) {
    // console.log("obj install",Vue)
    // 1.创建组件构造器
    const toastContructor = Vue.extend(Toast)
    // new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContructor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement("div"))
    // toast.$el 对应的就是 div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
  }
}

export default  obj 