<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <span class="center" slot="center">商品分类</span>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
          ></tab-content-category>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @itemClick="tabClick"
          ></tab-control>
          <tab-content-detail
            :category-detail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabMenu from "./childComponts/TabMenu";
import TabControl from "components/content/tabControl/TabControl";
import TabContentCategory from "./childComponts/TabContentCategory";
import TabContentDetail from "./childComponts/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

import { POP, SELL, NEW } from "common/const";
import { tabControlMixin } from "common/mixin";

export default {
  name: "Category",
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      currentIndex: -1,
      categoryData: {},
    };
  },
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabControl,
    TabContentCategory,
    TabContentDetail,
  },
  created() {
    // 获取目录
    this.getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this.getSubcategories(0);
      });
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail(POP);
        this.getCategoryDetail(SELL);
        this.getCategoryDetail(NEW);
      });
    },
    getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    selectItem(index) {
      this.getSubcategories(index);
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  background: var(--color-tint);
  color: white;
  z-index: 9;
}
#category {
  height: 100vh;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
