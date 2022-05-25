<template>
  <div>
    <el-card
      shadow="hover"
      class="trans"
    >
      <div class="header">
        <p>当前主页已被访问</p>
      </div>
      <div class="number">{{visit}}</div>
      <div class="foot">次</div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["visit"],
};
</script>

<style lang="scss" scoped>
.trans {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
.header {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.number {
  margin: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
  color: red;
}
.foot {
  text-align: end;
}
</style>