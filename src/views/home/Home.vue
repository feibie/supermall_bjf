<template>
  <div id="home">
    <nav-bar>
      <div class="home-nav" slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComponts/HomeSwiper";
import RecommendView from "./childComponts/RecommendView";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 请求多个数据（轮播图等）
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: white;
}
</style>
