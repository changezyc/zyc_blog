<template>
  <div id="app">
    <!-- 返回顶部 -->
    <back-top></back-top>
    <!-- 整个视图 -->
    <router-view></router-view>
    <!-- 背景 -->
    <div id="background">
      <img
        src="~@/assets/img/bg.jpeg"
        alt=""
      >
    </div>

  </div>
</template>

<script>
import BackTop from "./components/backTop/BackTop.vue";
export default {
  components: { BackTop },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterShow: true,
    };
  },
  methods: {
    // 定义刷新子组件的方法
    async reload() {
      this.isRouterShow = false;
      await this.$nextTick();
      this.isRouterShow = true;
    },
  },
  created() {
    setTimeout(() => {
      // 加载页面完后移除加载动画
      document.body.removeChild(document.getElementById("Loading"));
    }, 1000);
  },
};
</script>
<style lang="scss">
#app {
  width: 100%;
}
#background {
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
