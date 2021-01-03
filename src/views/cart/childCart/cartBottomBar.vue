<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button
        :is-active="ischeckAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="total">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <div class="calculate">
      <span>去计算{{ checkLength }}</span>
    </div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton";

export default {
  components: {
    checkButton
  },
  methods: {
    checkClick() {
      if (this.ischeckAll) {
        // 全部选中
        this.$store.getters.cartList.forEach(element => {
          return (element.checked = false);
        });
      } else {
        this.$store.getters.cartList.forEach(element => {
          return (element.checked = true);
        });
      }
      // this.$store.getters.cartList.forEach(element => {
      //   return (element.checked = !this.ischeckAll);
      // });
    }
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    ischeckAll() {
      // return !this.$store.getters.cartList.filter(item => !item.checked).length;
      if (this.$store.getters.cartList.length === 0) return false;
      return !this.$store.getters.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-all {
  display: flex;
  align-items: center;
  margin: 0 10px;
  width: 60px;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 5px;
}
.total {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
