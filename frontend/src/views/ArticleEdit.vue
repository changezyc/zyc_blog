<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input
      v-model="title"
      placeholder="请输入标题"
    ></el-input>
    <!-- 描述 -->
    <div class="edit_title">描述</div>
    <el-input
      v-model="descript"
      placeholder="请输入描述"
    ></el-input>
    <!-- 上传封面 -->
    <div class="edit_title">上传封面</div>
    <div>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:7001/api/article/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="head_img"
      >
        <img
          :src="imageUrl?imageUrl:defaultAvatar"
          class="avatar"
        >
      </el-upload>
    </div>
    <!-- 文章内容 -->
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content" />
    </div>
    <div class="save_btn">
      <el-button
        type="primary"
        @click="save"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      descript: "",
      imageUrl: "",
      defaultAvatar: require("@/assets/img/avatar.jpg"),
    };
  },
  methods: {
    // 文件上传成功时执行
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    // 上传文件之前执行，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goBack() {
      this.$router.go(-1);
    },
    save() {
      // 判断当前的保存是新增保存还是编辑保存,但是这两个API都没有实现
      if (this.$route.params.id) {
        //  如果是编辑保存，则发起更新请求
        let data = {
          title: this.title,
          content: this.content,
          article_id: this.$route.params.id,
          pic_url: this.imageUrl,
        };
        this.$http.post("/api/article/update", data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "article" });
          }
        });
      } else {
        //  如果是新增保存，则发起新增请求
        let data = {
          title: this.title,
          content: this.content,
          pic_url: this.imageUrl,
        };
        this.$http.post("/api/article/add", data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "article" });
          }
        });
      }
    },
    // (在有id的情况下)获取文章详情，还没实现这个api
    getDetail() {
      this.$http
        .get("/api/article/detail", {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            // 获取文章封面pic_url:this.imageUrl
            this.imageUrl = res.data.data.pic_url;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}
.classify {
  margin: 30px 0px;
  display: flex;
  .el-input {
    margin: 0 10px 0 0;
    width: 10%;
  }
}
// 封面
.avatar {
  width: 200px;
}
</style>