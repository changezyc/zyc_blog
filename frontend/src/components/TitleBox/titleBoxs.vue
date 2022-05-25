<template>
  <div id="outdiv">
    <span class="rb_hot_click_title">{{title}}</span>
    <el-image
      style="width: 100%; height: 100px"
      :src="img"
      fit="cover"
    ></el-image>
  </div>
</template>

<script>
export default {
  props: ["title", "img"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#outdiv {
  position: relative;
}
.rb_hot_click_title {
  display: block;
  margin: 0 auto;
  line-height: 32px;
  color: #000;
  position: relative;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.rb_hot_click_title::before {
  content: "";
  display: block;
  width: 60px;
  height: 2px;
  background: #000;
  position: absolute;
  top: 15px;
  right: 175px;
  transition: all 0.5s ease;
}
.rb_hot_click_title::after {
  content: "";
  display: block;
  width: 60px;
  height: 2px;
  background: #000;
  position: absolute;
  top: 15px;
  left: 175px;
  transition: all 0.5s ease;
}
</style>