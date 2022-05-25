<template>
  <div>
    <header>
      <div class="wrapper">
        <el-row>
          <el-col :span="4">
            <div class="logo threed">ZycBlog</div>
          </el-col>
          <el-col :span="20">
            <!-- 导航菜单 -->
            <el-menu
              mode="horizontal"
              :default-active="activeIndex"
              @select="handleSelect"
              background-color="rgba(255, 255, 255, .0)"
              text-color="#9d9d9d"
              active-text-color="#fff"
              class="nav"
            >
              <el-menu-item
                index="1"
                @click="goTo"
              >
                <router-link to="/"><i class="iconfont My-new-iconshouye"></i>个人作品</router-link>
              </el-menu-item>
              <el-menu-item
                index="2"
                @click="goTo"
              >
                <router-link to="/Lists"><i class="iconfont My-new-iconzixun"></i>个人总结</router-link>
              </el-menu-item>
              <el-menu-item
                index="3"
                @click="goTo"
              >
                <router-link to="/timeLocus"><i class="iconfont My-new-icondaojishi"></i>学习记录</router-link>
              </el-menu-item>
              <el-menu-item
                index="4"
                @click="goTo"
              >
                <router-link to="/recommend"><i class="iconfont My-new-icondianzan"></i>个人常用</router-link>
              </el-menu-item>
              <el-menu-item
                index="5"
                @click="goTo"
              >
                <router-link to="/aboutMe"><i class="iconfont My-new-iconwode1"></i>关于作者</router-link>
              </el-menu-item>
              <el-menu-item
                index="6"
                @click="goTo"
              >
                <router-link to="/LeaveWord"><i class="iconfont My-new-iconbianji"></i>给我留言</router-link>
              </el-menu-item>
              <el-menu-item
                index="7"
                @click="goTo"
              >
                <router-link
                  to="/article"
                  v-if="isSignIn == 1 && nickName == 'zyc'"
                >我的博客</router-link>
              </el-menu-item>
              <el-menu-item
                index="8"
                @click="goLogin"
                v-if="isSignIn != 1"
              >
                <a class="login"><i class="iconfont My-new-iconxuanzhonghaoyou"></i>马上登录</a>
              </el-menu-item>
              <el-menu-item
                index="9"
                @click="goTo"
                v-if="isSignIn == 1 "
              >
                <router-link
                  to="/personal"
                  class="login"
                >{{nickName}},欢迎您</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    // 修改当前活跃
    handleSelect(index) {
      this.activeIndex = index + "";
    },
    goTo() {
      this.$emit("goTo");
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    isSignIn() {
      return localStorage.getItem("isLoginStatus");
    },
    nickName() {
      return localStorage.getItem("nickname");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  .logo {
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .nav {
    float: right;
    li {
      padding: 0;
    }
    a {
      padding: 20px;
      .iconfont {
        color: #fff;
        // 垂直居中
        vertical-align: top;
        margin: 0 5px 0 0;
      }
    }
    .login {
      background: rgb(19, 167, 226);
      color: #fff;
      height: 100%;
      margin: 0;
    }
  }
}
i {
  margin-right: 8px;
}
.el-menu--horizontal {
  border-bottom: 0;
}
</style>