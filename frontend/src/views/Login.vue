<template>
  <div>
    <div class="mask"></div>
    <div>
      <div class="LoginBox">
        <div class="LoginBox-Box">
          <el-form
            :model="form"
            ref="form"
            :rules="rules"
            size="normal"
          >
            <el-form-item prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入账号"
                @input="changeInput"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="form.password"
                @keyup.enter.native="onSubmit"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login iconfont My-new-iconxuanzhonghaoyou"
                type="primary"
                @click="onSubmit"
              >登录</el-button>
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
                  @click="goReg"
                >
                  注册账号
                </el-button>
                <el-button
                  type="primary"
                  round
                  :span="12"
                  @click="Gohome"
                >
                  回到主页
                </el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    //确认密码的规则
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
      loading: false,
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
    // 去主页
    Gohome() {
      this.$router.push("/");
    },
    goReg() {
      this.$router.push("/reg");
    },
    // 登录
    onSubmit() {
      //如果输入的表单有空的，那么res会是false，this.form是表单数据
      this.$refs["form"].validate((res) => {
        if (!res) {
          this.$message.error("账号或密码未输入");
          return;
        }
        axios
          .post("/login", this.form)
          .then((res) => {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$store.commit("changIsSignIn", 1);
            localStorage.setItem("nickname", res.data.nickname);
            localStorage.setItem("username", res.data.name);
            this.$store.commit("setToken", res.data.token);
            localStorage.setItem("getToken", res.data.token);
            localStorage.setItem("isLoginStatus", 1);
            localStorage.setItem("userimg", res.data.img);
            // this.$router.go(0);
            this.$router.push("/");
          })
          .catch((e) => {
            this.$message({
              message: "账号或密码错误",
              type: "error",
            });
          });
      });
    },
    changeInput() {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginBox {
  width: 400px;
  height: 555px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  padding: 15px;
  .LoginBox-Box {
    margin-top: 30%;
  }
  .login {
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