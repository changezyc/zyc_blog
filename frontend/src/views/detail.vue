<template>
  <div>
    <div class="block wow slideInLeft">
      <!-- 具体文章 -->
      <article-contents
        :data="data"
        class="wow slideInLeft"
      ></article-contents>
      <!-- 点赞 -->
      <div class="likeBox">
        <el-button
          type="primary"
          round
          @click.once="like()"
        >
          <i class="iconfont  My-new-icondianzan"></i>
          点赞（{{data.likeCount}})
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import comment from "@/components/Comment.vue";
import ArticleContents from "../components/ArticleContents/ArticleContents.vue";
import {
  tryHideFullScreenLoading,
  showFullScreenLoading,
} from "../network/serviceHelp";
import axios from "axios";
export default {
  components: {
    comment,
    ArticleContents,
  },
  data() {
    return {
      id: this.$route.params.id,
      data: {},
    };
  },
  methods: {
    // 通过ID得到文章
    getArtcileByID() {
      showFullScreenLoading();
      axios
        .get(`/article/${this.id}`)
        .then((res) => {
          this.data = res.data.data;
        })
        .then(() => {
          tryHideFullScreenLoading();
        });
    },
    // 点赞
    like() {
      // 判断是否登录了
      if (localStorage.getItem("isLoginStatus") === "1") {
        axios.put(`/article/${this.id}`).then(() => {
          this.$message.success("点赞成功");
          this.data.likeCount++;
        });
      } else {
        this.$message({
          message: "请登录后进行操作",
          type: "warning",
        });
      }
    },
  },
  created() {
    this.getArtcileByID();
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
.likeBox {
  display: flex;
  justify-content: center;
  margin: 25px 0;
  .el-button {
    margin: 0 10px;
  }
  i {
    margin-right: 8px;
  }
}
</style>