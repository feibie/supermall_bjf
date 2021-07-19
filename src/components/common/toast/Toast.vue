<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message="弹出文字信息", duration=1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  font-size: 15px;
  padding: 20px;
  z-index: 9;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}
</style>
