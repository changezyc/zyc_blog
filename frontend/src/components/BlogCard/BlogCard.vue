<template>
  <el-collapse
    accordion
    style="margin: 10px"
  >
    <el-collapse-item
      v-for="item in WorksData"
      :name="item.id"
      :key="item.id"
      style="margin: 10px"
    >
      <template
        slot="title"
        class="slot-style"
      >
        <p class="collapse-slot">
          {{item.title}}
        </p>
        <p class="slot-tags">
          <el-tag
            v-for="(tag, index) in item.tags"
            :key="tag"
            style="margin-right: 5px"
          >
            {{item.tags[index]}}</el-tag>
        </p>
      </template>
      <el-divider content-position="left">Code By Zyc，详情请查看对应Git的readme文件</el-divider>
      <div class="collapse-head">作品主题：{{item.title}}</div>
      <span class="collapse-title">相关技术栈：</span>
      <el-tag
        v-for="(tag, index) in item.tags"
        :key="tag"
        style="margin-right: 5px"
      >
        {{item.tags[index]}}</el-tag>
      <div></div>
      <p class="collapse-title">作品部分截图：<span>(截图较大，可能加载较慢)</span></p>
      <el-image
        v-for="(img, index) in item.images"
        :key="img"
        style="width: 200px; height: 200px; margin: 10px"
        :src="item.images[index]"
        :preview-src-list="item.images"
        fit="cover"
      >
      </el-image>
      <p class="collapse-title">相关简介：</p>
      <div
        class="collapse-text"
        style="white-space: pre-wrap"
      >{{item.content}}</div>

      <el-button
        type="warning"
        round
        v-if="item.url === ''"
        disabled
      >
        <a target="_blank">该项目尚未上线</a>
      </el-button>

      <el-button
        type="primary"
        round
        v-else
      >
        <a
          :href="item.url"
          target="_blank"
        >查看上线效果</a>
      </el-button>
      <el-button
        type="primary"
        round
      >
        <a
          :href="item.giturl"
          target="_blank"
        >查看GIT代码</a>
      </el-button>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: ["WorksData"],
};
</script>

<style lang="scss" scoped>
.collapse-slot {
  font-size: 25px;
  font-style: italic;
  color: darkblue;
  margin-right: 10%;
}
.collapse-head {
  font-size: 30px;
  margin: 10px 0;
}
.collapse-title {
  font-size: 18px;
  margin: 10px 0;
}
.collapse-text {
  font-size: 15px;
  // text-indent: 2em;
  margin: 10px 0;
}
.slot-style .slot-tags {
  padding-left: 80%;
}
</style>