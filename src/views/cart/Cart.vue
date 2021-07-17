<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <span class="center" slot="center">购物车({{ length }})</span>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComponts/CartList";
import CartBottomBar from "./childComponts/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 2种写法
    // ...mapGetters(["cartLength"]),
    ...mapGetters({
      length: "cartLength",
      // 其他
    }),
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
</style>
