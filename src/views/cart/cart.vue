<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>
        <span>购物车({{ cartLength }})</span>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import cartList from "./childCart/cartList";
import cartBottomBar from "./childCart/cartBottomBar";

import Scroll from "components/common/scroll/scroll";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    cartList,
    cartBottomBar,
    Scroll
  },
  computed: {
    ...mapGetters(["cartLength"])
  },
  activated() {
    // console.log("----");
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: bolder; */
}
.content {
  height: calc(100% - 44px - 49px - 40px);
}
</style>
