import { debounce } from "common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("我是混入的内容")
  }
}

import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 判断BackTop的显示
      this.isShowBackTop = -position.y > 1000;
      // 决定 tabControl 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
  }
}