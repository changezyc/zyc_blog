<template>
  <div>
    <div class="block wow slideInRight bgtrans">
      <title-box title="学习平台"></title-box>
      <div>
        <ul>
          <li
            :key="index"
            v-for="(item,index) in ArrayBlog"
          >
            <a
              :href="item.url"
              target="_blank"
            >{{item.name}}</a>
          </li>
        </ul>
      </div>
      <title-box
        class="assets"
        title="常用工具"
      ></title-box>
      <div>
        <ul>
          <li
            :key="index"
            v-for="(item,index) in ArrayStudy"
          ><a
              :href="item.url"
              target="_blank"
            >{{item.name}}</a></li>
        </ul>
      </div>
      <title-box
        class="assets"
        title="常逛论坛"
      ></title-box>
      <div>
        <ul>
          <li
            :key="index"
            v-for="(item,index) in blogs"
          ><a
              :href="item.url"
              target="_blank"
            >{{item.name}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import titleBox from "../components/TitleBox/titleBox.vue";
export default {
  name: "recommend",
  components: { titleBox },
  data() {
    return {
      ArrayBlog: [
        { name: "慕课网", url: "https://wangdoc.com/javascript/" },
        { name: "中国大学Mooc", url: "https://www.iconfont.cn/" },
        { name: "MDN", url: "https://developer.mozilla.org/zh-CN/" },
        { name: "W3school", url: "https://www.w3school.com.cn/html/index.asp" },
        { name: "牛客", url: "https://codepen.io/" },
        { name: "阮一峰ES6", url: "https://es6.ruanyifeng.com/" },
        { name: "Vue", url: "https://cn.vuejs.org/" },
        { name: "React", url: "https://react.docschina.org/" },
        { name: "Egg.js", url: "https://eggjs.org/zh-cn/intro/" },
      ],
      ArrayStudy: [
        { name: "网道 / WangDoc.com", url: "https://wangdoc.com/javascript/" },
        { name: "阿里图标", url: "https://www.iconfont.cn/" },
        { name: "W3school", url: "https://www.w3school.com.cn/html/index.asp" },
        { name: "Element UI", url: "https://element.eleme.cn/#/zh-CN" },
        { name: "Echarts", url: "https://echarts.apache.org/zh/index.html" },
        { name: "BootStarp", url: "https://v3.bootcss.com/" },
        {
          name: "十六进制颜色查询",
          url: "https://www.sioe.cn/yingyong/yanse-rgb-16/",
        },
        { name: "Ant Desgin", url: "https://ant.design/index-cn" },
        { name: "在线编码平台 codepen.io", url: "https://codepen.io/" },
      ],
      blogs: [
        { name: "知乎", url: "https://www.zhihu.com/" },
        { name: "掘金", url: "https://juejin.cn/" },
        { name: "博客园", url: "https://www.cnblogs.com/" },
        { name: "github", url: "https://github.com/" },
        { name: "stackoverflow", url: "https://stackoverflow.com/" },
      ],
    };
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
ul {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 8px 9px;
    border-radius: 5px;
    padding: 10px 17px;
    border: 1px solid rgba(195, 194, 194, 0.5);
    cursor: pointer;
  }
  li:nth-child(n + 1):hover {
    background: rgb(230, 54, 54);
    color: white;
  }
  li:nth-child(2n + 2):hover {
    background: rgb(198, 230, 54);
    color: white;
  }
  li:nth-child(n + 3):hover {
    background: rgb(54, 180, 230);
    color: white;
  }
  li:nth-child(2n + 4):hover {
    background: rgb(230, 54, 163);
    color: white;
  }
}
.assets {
  margin-top: 20px;
}
.bgtrans {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
ul li a {
  display: block;
}
</style>