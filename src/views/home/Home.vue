<template>
  <div id="home">
    <nav-bar>
      <div class="home-nav" slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @tabItemClick="tabItemClick"
      class="tab"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabItemClick="tabItemClick"
      />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComponts/HomeSwiper";
import RecommendView from "./childComponts/RecommendView";
import FeatureView from "./childComponts/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",

      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 请求多个数据（轮播图等）
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 这里的内容与Detail.vue里面的内容重复，已加入混入的js里面，减少代码量
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // // 监听item中图片加载完成
    // // 对监听的事件进行保存
    // this.homeItemListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // 网络请求相关

    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        const list = res.data.list;

        this.goods[type].list.push(...list);
        this.goods[type].page += 1;
        // 完成上拉下载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    // 业务逻辑相关

    tabItemClick(currentIndex) {
      this.currentType = Object.keys(this.goods)[currentIndex];
      this.$refs.tabControl1.currentIndex = currentIndex;
      this.$refs.tabControl2.currentIndex = currentIndex;
    },

    contentScroll(position) {
      // 判断BackTop的显示
      this.isShowBackTop = -position.y > 1000;
      // 决定 tabControl 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
}
.nav-bar {
  position: relative;
  background: var(--color-tint);
  color: white;
  z-index: 9;
}
.tab {
  position: absolute;
  width: 100%;
  background: #fff;
  z-index: 9;
}
.content {
  height: calc(100vh - 93px);
}
</style>
