<template>
  <div id="detail" e>
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll
      class="detail-scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComponts/DetailNavBar";
import DetailSwiper from "./childComponts/DetailSwiper";
import DetailBaseInfo from "./childComponts/DetailBaseInfo";
import DetailShopInfo from "./childComponts/DetailShopInfo";
import DetailParamInfo from "./childComponts/DetailParamInfo";
import DetailGoodsInfo from "./childComponts/DetailGoodsInfo";
import DetailCommentInfo from "./childComponts/DetailCommentInfo";
import DetailBottomBar from "./childComponts/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import {
  getGoodsDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      commentInfo: {},
      paramInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    this.getGoodsDetail();
    this.getRecommend();
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); //插入一个最大值
      console.log(this.themeTopYs);
    }, 200);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    getGoodsDetail() {
      // this.$route.params.xxx
      this.iid = this.$route.params.id;
      getGoodsDetail(this.iid).then((res) => {
        // console.log(res);
        const data = res.result;
        // 获取轮播图信息
        this.topImages = res.result.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //  获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
          // console.log(this.commentInfo);
        }
        //
        this.$nextTick(() => {});
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    imageLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    contentScroll(position) {
      const positionY = Math.abs(position.y);
      this.isShowBackTop = -position.y > 1000;
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const produce = {};
      produce.image = this.topImages[0];
      produce.title = this.goods.title;
      produce.desc = this.goods.desc;
      produce.price = this.goods.realPrice;
      produce.iid = this.iid;

      // 将商品添加到购物车
      this.$store.commit("addCart",produce)
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.detail-scroll {
  height: calc(100vh - 102px);
}
</style>
