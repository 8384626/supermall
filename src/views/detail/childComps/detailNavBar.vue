<template>
  <div id="detailnavbar">
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{ active: currentIndex === index }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 16px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-left: 25px;
  margin-top: 10px;
}
</style>
