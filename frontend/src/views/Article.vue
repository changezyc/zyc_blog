<template>
  <div class="wrapper">
    <h1 class="title">文章列表</h1>
    <div class="article">
      <el-button
        class="addBtn"
        @click="handleAdd"
      >新增+</el-button>
      <el-table
        :data="articleList"
        stripe
      >
        <el-table-column
          label="标题"
          width="280"
          header-align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="250"
          header-align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleLook(scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
    };
  },
  computed: {
    newId() {
      return '';
    },
  },
  methods: {
    // 新增按钮
    handleAdd() {
      this.$router.push({ name: "editArticle", params: { id: this.newId } });
    },
    // 查看按钮
    handleLook(row) {
      let id = row.id;
      this.$router.push({ path: "/detail/" + id });
    },
    // 编辑按钮
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ name: "editArticle", params: { id: id } });
    },
    // 删除按钮
    handleDelect(row) {
      let id = row.id;
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: `文章删除成功!`,
          });
          // // 发起删除的网络请求,但是没实现
          // this.$http
          //   .post("/api/article/delete", {
          //     article_id: id,
          //   })
          //   .then((res) => {
          //     if (res.data.code === 0) {
          //       //发起删除请求操作
          //       this.$message({
          //         type: "success",
          //         message: `${id}文章删除成功!`,
          //       });
          //       setTimeout(() => {
          //         location.reload();
          //       }, 500);
          //     }
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 得到博客列表
    getMyBlogList() {
      this.$http.get("/article").then((res) => {
        console.log(res);
        this.articleList = res.data.data;
      });
    },
  },
  created() {
    this.getMyBlogList();
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  color: #bbb;
}
.article {
  .addBtn {
    float: right;
    margin-bottom: 20px;
  }
}
</style>