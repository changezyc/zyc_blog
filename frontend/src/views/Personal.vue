<template>
  <div class="wrapper wow slideInLeft">
    <el-form
      label-width="80px"
      :inline="false"
      size="medium"
    >
      <el-form-item>
        <span slot="label">
          <span style="color: #ccc">昵称</span>
        </span>
        <el-input v-model="nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <span style="color: #ccc">头像</span>
        </span>
        <!-- action="http://1.116.134.48:7001/upload" -->
        <el-upload
          action="http://localhost:7001/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="head_img"
        >
          <div>
            <el-avatar
              :size="250"
              :src="imageUrl"
            ></el-avatar>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <span style="color: #ccc">个人签名</span>
        </span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="content"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button
            type="primary"
            @click="updateUserInfo"
            :span="12"
          >保存</el-button>
          <el-button
            @click="exit"
            :span="12"
          >退出登录</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import WOW from "wowjs";
import Cookie from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      imageUrl: "",
      nickname: "",
      content: "",
    };
  },
  methods: {
    // 文件上传成功时执行
    handleAvatarSuccess(res) {
      this.imageUrl = res.url;
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
    // 退出登录
    exit() {
      // 清除Cookie
      Cookie.set("token", "");
      // 清除sessionStorage
      localStorage.clear();
      localStorage.setItem("isLoginStatus", 0);
      localStorage.setItem("getToken", "");
      // 这里用go会刷新一次，所以不用to
      this.$router.go(0);
    },
    // 更改并保存用户信息
    updateUserInfo() {
      // personal是个性签名
      const updateData = {
        name: localStorage.getItem("username"),
        nickname: this.nickname,
        img: this.imageUrl,
        personal: this.content,
      };
      axios
        .put("/user/update", updateData)
        .then((res) => {
          this.$message.success("更新成功");
          location.reload();
        })
        .catch(() => this.$message.error("更新个人信息出错"));
    },
    // 得到用户信息
    getUserInfo() {
      const username = localStorage.getItem("username");
      axios.get(`/user/${username}`).then((res) => {
        this.nickname = res.data.data.nickname;
        this.imageUrl = res.data.data.img;
        this.content = res.data.data.personal;
      });
    },
  },
  mounted() {
    this.getUserInfo();
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
</style>