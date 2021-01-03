<template>
  <div class="check-button" :class="{ check: isActive }">
    <img src="~assets\img\cart\tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    isActive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}
.check {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>
