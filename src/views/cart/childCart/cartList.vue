<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :item-info="item"
    >
    </cart-list-item>
  </div>
</template>

<script>
import cartListItem from "./cartListItem";

import { mapGetters } from "vuex";

export default {
  name: "cartList",
  components: {
    cartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped></style>
