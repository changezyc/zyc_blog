<template>
  <div>
    <div class="mask"></div>
    <div class="register">
      <el-form
        :model="regform"
        ref="regform"
        :rules="regrules"
        label-width="0"
        :inline="false"
        size="normal"
      >
        <el-form-item prop="regname">
          <el-input
            v-model="regform.regname"
            placeholder="请输入用户名(用作登录账号)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="regform.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="regform.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="regform.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="regbtn"
            type="primary"
            @click="register"
          >注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-row
            type="flex"
            justify="space-around"
          >
            <el-button
              type="success"
              round
              :span="12"
              @click="Gologin"
            >返回登录</el-button>
            <el-button
              type="primary"
              round
              :span="12"
              @click="Gohome"
            >回到主页</el-button>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  tryHideFullScreenLoading,
  showFullScreenLoading,
} from "../network/serviceHelp";
export default {
  data() {
    // 确认密码的规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regform.checkPass !== "") {
          this.$refs.regform.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regform.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
      },
      regform: {
        regname: "",
        nickname: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      regrules: {
        regname: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入您的昵称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 注册
    register() {
      this.$refs["regform"].validate((res) => {
        if (res) {
          const data = {
            name: this.regform.regname,
            nickname: this.regform.regname,
            password: this.regform.pass,
          };
          showFullScreenLoading();
          axios
            .post("/user/new", data)
            .then((res) => {
              console.log(res, data, data, "regok");
              tryHideFullScreenLoading();
              this.$message.success("注册成功");
              this.$router.push("/login");
            })
            .catch((e) => {
              this.$message.error("该用户名已被注册");
            });
        } else {
          this.$message.error("注册失败，请检查是否符合输入规则");
        }
      });
    },
    // 去主页
    Gohome() {
      this.$router.push({ name: "home" });
    },
    Gologin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 400px;
  height: 555px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  padding: 15px;
  .regbtn {
    width: 100%;
  }
}
.el-input--normal {
  position: relative;
  overflow: hidden;
}
.el-input--normal::before {
  content: "";
  position: absolute;
  left: 0;
  height: 3px;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    white,
    #3498db,
    #1abc9c,
    #8e44ad,
    #e67e22,
    #e74c,
    white
  );
  transform: translateX(-100%);
  transition: 1s;
}
.el-input--normal:hover::before {
  transform: translateX(100%);
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
</style>