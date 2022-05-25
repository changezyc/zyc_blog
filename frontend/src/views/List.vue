<template>
  <div class="wow slideInLeft">
    <article-lists :AllArticle="AllArticle"></article-lists>
    <!-- 分页 -->
    <el-pagination
      class="listBox"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange(curPage)"
      :page-size.sync="pageSize"
      :total="count"
      :current-page.sync="curPage"
      :page-sizes="pageSizes"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import WOW from "wowjs";
import ArticleLists from "../components/articleLists/ArticleLists.vue";
import {
  tryHideFullScreenLoading,
  showFullScreenLoading,
} from "../network/serviceHelp";
export default {
  inject: ["reload"],
  components: { ArticleLists },
  data() {
    return {
      AllArticle: [],
      // 当前的页，默认为第一页
      curPage: 1,
      // 设置每页的数量
      pageSize: 4,
      // 全部文章数量,暂时没实现
      count: 5,
      pageSizes: [4, 8, 12],
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.reload();
    next();
  },
  methods: {
    getAllArticle() {
      showFullScreenLoading();
      return axios.get("/article").then((res) => {
        this.AllArticle = res.data.data;
      });
    },
    handleCurrentChange(curPage) {
      showFullScreenLoading();
      axios
        .get(`/article?page=${curPage}`)
        .then((res) => {
          this.AllArticle = res.data.data;
        })
        .then(() => tryHideFullScreenLoading());
    },
  },
  created() {
    // 分页请求
    this.getAllArticle().then(() => {
      tryHideFullScreenLoading();
    });
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
.listBox {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>