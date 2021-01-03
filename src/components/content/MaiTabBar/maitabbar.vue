<template>
  <tabbar class="tabbar">
    <!-- 首页-->
    <tabbaritem path="/home" activeColor="blue">
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" />
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tabbaritem>

    <!-- 分类 -->
    <tabbaritem path="/category">
      <template #item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tabbaritem>

    <!-- 购物车 -->
    <tabbaritem path="/cart">
      <template #item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tabbaritem>

    <!-- 我的 -->
    <tabbaritem path="/profile">
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tabbaritem>
  </tabbar>
</template>

<script>
import tabbar from "components/common/tabbar/tabbar";
import tabbaritem from "components/common/tabbar/tabbaritem";
export default {
  components: {
    tabbar,
    tabbaritem
  }
};
</script>

<style>
.tabbar {
  z-index: 10;
}
</style>
