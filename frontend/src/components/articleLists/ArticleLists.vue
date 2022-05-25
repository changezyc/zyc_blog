<template>
  <div>
    <div class="block trans">
      <!-- 标题 -->
      <title-box title="个人日常技术总结"></title-box>
    </div>
    <div
      class="block trans"
      style="margin:10px 0"
    >
      <el-row>
        <el-col
          :span="12"
          v-for="item in AllArticle"
          :key="item.id"
          :offset="item.id > 0 ? 2 : 0"
          style="margin: 10px"
          class="contanincard"
        >
          <el-card
            :body-style="{ padding: '10px' }"
            class="contanincard"
          >
            <el-image
              style="width: 400px; height: 200px"
              :src="item.img"
              fit=cover
            ></el-image>
            <div style="padding: 10px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <p style="margin: 10px 0">{{item.descript}}</p>
                <time style="margin: 10px 0">{{item.time}}</time>
              </div>
              <el-button
                type="text"
                class="button"
                @click="GotoArticleDetail(item.id)"
              >查看详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TitleBox from "../TitleBox/titleBox.vue";
export default {
  props: ["AllArticle"],
  components: {
    TitleBox,
  },
  methods: {
    // 去文章详情
    GotoArticleDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.contanincard {
  width: 400px;
}
.trans {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
</style>