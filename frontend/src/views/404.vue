<template>
  <div id="404">
    <main>
      <section>404!找不到页面</section>
      <section class="smallfont">芜湖~您所寻找的页面不存在，请检查输入的url或者点击下方按钮返回主页</section>
      <div id="frozen-btn">
        <button
          class="green"
          @click="goBack"
        >回到主页</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  section {
    font-size: 50px;
    margin: 10px;
    &.smallfont {
      font-size: 20px;
    }
  }
  #frozen-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>