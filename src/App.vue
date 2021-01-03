<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <mai-tab-bar />
  </div>
</template>

<script>
import MaiTabBar from "components/content/MaiTabBar/maitabbar";

export default {
  name: "App",
  components: {
    MaiTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
.van-toast--text {
  z-index: 1000001 !important;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
