<template>
  <div class="home">
    <el-carousel
      height="250px"
      class="slideInLeft"
    >
      <el-carousel-item
        v-for="item in LbtArticle"
        :key="item.id"
      >
        <el-image
          style="width: 100%; height: 100%"
          :src="item.idView"
          @click="toLbtBlog(item.url)"
          fit=cover
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="block main marginTop wow slideInLeft">
      <title-box
        title="个人作品展示"
        data-wow-delay="0.4s"
      ></title-box>
    </div>
    <div class="title-box slideInLeft block main marginTop slideInLeft">
      <blog-card :WorksData="worksdata"></blog-card>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import TitleBox from "../components/TitleBox/titleBox.vue";
import BlogCard from "../components/BlogCard/BlogCard.vue";
import axios from "axios";
import {
  tryHideFullScreenLoading,
  showFullScreenLoading,
} from "../network/serviceHelp";
export default {
  name: "Home",
  components: {
    TitleBox,
    BlogCard,
  },
  data() {
    return {
      AllArticleClassName: [],
      // 轮播图数据
      LbtArticle: [
        {
          url: "https://juejin.cn/post/7006518993385160711",
          idView:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73234eb50ab24619a4c105746f872061~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844903512845860872",
          idView:
            "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd9dfc3293a5c~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844903959283367950",
          idView:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07525f7f55dc492c9e70157f45140e37~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844904182843965453",
          idView:
            "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/8/17291677b3e079dd~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
      ],
      worksdata: [],
    };
  },
  methods: {
    GotoDetail(id) {
      this.$router.push({ path: "detail/" + id });
    },
    toLbtBlog(url) {
      window.open(url);
    },
    getWorksData() {
      showFullScreenLoading();
      return axios.get("/getworks").then((res) => {
        console.log('qian:', this.worksdata);
        this.worksdata = res.data.data;
        console.log('hou:', this.worksdata);
      });
    },
  },
  created() {
    this.getWorksData().then(() => {
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
.home {
  width: 100%;
}
.slideInLeft {
  padding: 0;
}
.main {
  padding: 20px !important;
  background-color: white !important;
}
</style>
