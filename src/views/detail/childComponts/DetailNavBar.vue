<template>
  <div>
    <nav-bar>
      <div class="left" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div class="center" slot="center">
        <span
          v-for="(item, index) in titles"
          :key="item"
          :class="{ active: index === currentIndex }"
          @click="itemClick(index)"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick",index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.left img {
  margin-top: 10px;
}
.center {
  display: flex;
  justify-content: center;
  font-size: 14px;
}
.center span {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>
