<template>
  <div>
    <div class="wrapper marginTop wow slideInLeft">
      <div class="block aboutMe">
        <div class="avatar">
          <img
            src="../../src/assets/img/myavatar.jpg"
            alt=""
          >
        </div>
        <p><span class="threed threeds">Zyc</span></p>
        <p><span class="threed threeds">一个码农</span></p>
        <p><span class="threed threeds">男，180cm，67kg，以前土木的，现在计科的</span></p>
        <p><span class="threed threeds">现居安徽合肥</span></p>
        <p><span class="threed threeds">如果你和我一样也想干前端，希望你能在学校好好学，在课堂后认真学习以下知识：HTML，CSS，JavaScript(包括NodeJS)，Vue(2 and 3)，微信小程序基础，Python基础，Java及后端生态</span></p>
        <p><span class="threed threeds">正在学习的东西：TypeScript，Egg.js，Koa2，Docker</span></p>
        <p><span class="threed threeds">我用的数据库：MySQL</span></p>
        <p><span class="threed threeds">想要成为一名前端工程师，正在向目标努力着</span></p>
        <p><span class="threed threeds">除了写论文，搞深度学习算法，每天没事喜欢刷各种知识论坛和技术论坛，啥都想了解，啥都想看看</span></p>
        <p><span class="threed threeds">个人邮箱：1627417177@qq.com</span></p>
        <p><span class="threed threeds">最喜欢的东西：小猫咪</span></p>
        <p><span class="threed threeds">最讨厌的东西：写论文</span></p>
        <el-button
          type="primary"
          round
          class="btn"
        >
          <a
            href="https://www.bilibili.com/video/BV14P4y1p7VT?spm_id_from=333.337.search-card.all.click"
            target="_blank"
          >遇到困难和挫折不要怕，奥利给，希望这首歌能给你动力</a>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
export default {
  name: "aboutMe",
  methods: {},
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
.aboutMe {
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  margin-bottom: 350px;
  .avatar {
    display: flex;
    justify-content: center;
    img {
      border-radius: 50%;
      width: 100px;
    }
  }
  p {
    font-size: 15px;
    text-align: center;
    span {
      line-height: 45px;
    }
  }
}
.threed {
  font-size: 18px !important;
}
.btn {
  margin-top: 10px;
  width: 100%;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>