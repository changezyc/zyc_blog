<template>
  <div>
    <h2>{{data.title}}</h2>
    <div class="timeBox">
      <span
        v-if="data.time"
        class="timer"
      ><i class="iconfont icon-date"></i>{{data.time}}</span>
      <span><i class="el-icon-view"></i>{{data.visited}}</span>
    </div>
    <!-- 图片 -->
    <el-image
      style="width: 600px; height: 400px"
      :src="data.img"
      fit=contain
    ></el-image>
    <!-- 具体文章内容 -->
    <div class="contenttext">
      <mavon-editor
        v-model="data.content"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :subfield="false"
        codeStyle="atom-one-dark"
        :boxShadow="false"
        style="white-space: pre-wrap"
      >
      </mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {},
  mounted() {
    console.log("data", this.data);
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  font-weight: 550;
  margin: 20px 0;
}
.timeBox {
  margin-bottom: 20px;
  .timer {
    margin-right: 15px;
  }
  i {
    margin-right: 5px;
  }
}
.contenttext {
  text-indent: 2em;
}
</style>