<template>
  <div>
    <div class="comment-box">
      <div
        v-if="isSignIn != 1"
        class="signInText"
      ><span
          class="login"
          @click="GotoLogin"
        >登录</span>后才能留言哟~</div>
      <div class="bottom">
        <div class="dec">
          <span>共<span class="commentTotal">{{commentArray.length}}</span>条留言</span>
        </div>
        <div class="CommentInput ">
          <img
            :src="imageUrl?imageUrl:defaultAvatar"
            alt=""
          >
          <el-input
            type="textarea"
            :rows="3"
            placeholder="欢迎来到留言板"
            v-model="text"
            class="inputbox"
            size="350"
            maxlength="350"
            resize="none"
          >
          </el-input>
          <el-button
            type="primary"
            @click="SendComment"
          >发布留言</el-button>
        </div>
        <!-- 评论区 -->
        <ul class="Commentarea">
          <h3>热门留言</h3>
          <li
            :key="item.id"
            v-for="item in commentArray"
          >
            <div class="Commentareabox">
              <div class="pic">
                <img
                  :src="item.img"
                  alt=""
                >
              </div>
              <div class="side">
                <span class="nickname">{{item.nickname}}: </span>
                <div class="CommentContent">
                  <span class="cmcontent">{{item.content}}</span>
                </div>
                <div class="timerorlike">
                  <span @click.once="clickLike(item.id)">
                    <i class="iconfont  My-new-icondianzan"></i>
                    {{item.likes || 0}}
                  </span>
                  <span
                    class="delete"
                    v-if="nickName === 'zyc'"
                    @click="handleDelect(item.id)"
                  >删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from "../network/serviceHelp";
export default {
  inject: ["reload"],
  props: ["articleId"],
  data() {
    return {
      commentArray: [],
      text: "",
    };
  },
  methods: {
    handleDelect(id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发起删除的网络请求,/api/comment/delete接口还未完善
          this.$http
            .post("/api/comment/delete", {
              comment_id: id,
            })
            .then((res) => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `评论删除成功!`,
                });
                setTimeout(() => {
                  this.reload();
                }, 500);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    GotoLogin() {
      this.$router.push({ name: "login" });
    },
    // 发送评论
    SendComment() {
      if (
        localStorage.getItem("isLoginStatus") == 1 &&
        localStorage.getItem("getToken")
      ) {
        const payload = {
          nickname: localStorage.getItem("nickname"),
          img: localStorage.getItem("userimg"),
          content: this.text,
        };
        if (payload.content.trim() === "") {
          this.$message.error("内容不能为空");
          return;
        } else {
          axios.post("/comment", payload).then(() => {
            this.$message.success("评论成功");
            const newId = this.commentArray.pop().id + 1;
            payload.id = newId;
            this.commentArray.push(payload);
            this.text = "";
          });
        }
      } else {
        this.$message({
          message: "请登录后进行操作",
          type: "warning",
        });
        this.$router.push({ name: "login" });
      }
    },
    // created时候执行
    getAllComment() {
      showFullScreenLoading();
      axios
        .get("/comment")
        .then((res) => {
          this.commentArray = res.data;
        })
        .then(() => tryHideFullScreenLoading());
    },
    // 点击点赞
    clickLike(id) {
      if (localStorage.isLoginStatus !== "1") {
        this.$message.error("未登录，请先登录");
        return;
      }
      axios.put(`/comment/${id}`).then(() => {
        this.$message.success("点赞成功");
        this.commentArray.forEach((item) => {
          if (item.id === id) {
            item.likes++;
          }
        });
      });
    },
  },
  computed: {
    // 查询登录状态
    isSignIn() {
      return localStorage.getItem("isLoginStatus");
    },
    // 名字
    nickName() {
      return localStorage.getItem("nickname");
    },
    defaultAvatar() {
      return require("@/assets/img/pl.jpg");
    },
    imageUrl() {
      return sessionStorage.getItem("avatar");
    },
  },
  created() {
    this.getAllComment();
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  .dec {
    margin-bottom: 25px;
  }
  .CommentInput {
    display: flex;
    margin-bottom: 55px;
    img {
      width: 75px;
      height: 75px;
      margin: 0 15px;
      border-radius: 5px;
    }
  }
}
.commentTotal {
  color: red;
}
.Commentarea {
  li {
    font-size: 14px;
    margin: 10px 0;
    width: 100%;
    border-bottom: 1px dashed rgb(204, 204, 204);
    .Commentareabox {
      padding: 15px 0;
      overflow: hidden;
      display: flex;
      .pic {
        img {
          width: 50px;
          margin-right: 10px;
        }
      }
      .side {
        width: 93%;
        .nickname {
          color: skyblue;
        }
        .timerorlike {
          margin-top: 15px;
          i {
            margin-right: 8px;
          }
          .delete {
            margin-right: 10px;
            color: skyblue;
            cursor: pointer;
          }
          span {
            float: right;
          }
        }
      }
    }
  }
}
.My-new-icondianzan {
  // 鼠标小手
  cursor: pointer;
}
.signInText {
  margin-bottom: 10px;
  .login {
    // 鼠标小手
    cursor: pointer;
    color: skyblue;
  }
}
.CommentContent {
  margin-top: 10px;
  font-size: 16px;
  text-indent: 1em;
}
</style>