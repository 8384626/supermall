<template>
  <div id="app">
    <router-view />
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
</style>
