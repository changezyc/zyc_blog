<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header class="wow slideInRight common-header"></common-header>
    </nav>
    <!-- 切换大屏阅读模式按钮 -->
    <check-box></check-box>
    <!-- 中心 -->
    <section>
      <div class="wrapper marginTop">
        <el-row
          :gutter="10"
          class="head"
        >
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="18"
            :xl="18"
          >
            <div class="grid-content bg-purple slideshowBox">
              <!-- 视图切换 -->
              <article ref="article">
                <keep-alive include="timeLocus">
                  <router-view></router-view>
                </keep-alive>
              </article>
            </div>
          </el-col>
          <el-col
            :lg="6"
            :xl="6"
          >
            <!-- 侧边栏 -->
            <div
              class="grid-content bg-purple-light synopsis"
              ref="sidebar"
            >
              <!-- 侧边栏 -->
              <aside class="wow slideInRight">
                <personal-details class="wow slideInRight marginbtm"></personal-details>
                <div class="block weather">
                  <div class="weatherheader">
                    <div class="itemtext">当前实时天气</div>
                    <div class="locationtext"><i class="el-icon-location"></i>
                      {{location}}
                    </div>
                  </div>
                  <div class="smalltext">
                    <p><i class="el-icon-sunny"></i>
                      天气: {{weatherData.info}}</p>
                    <p><i class="el-icon-cloudy"></i>
                      温度: {{weatherData.temperature}}</p>
                    <p><i class="el-icon-heavy-rain"></i>
                      湿度: {{weatherData.humidity}}</p>
                    <p><i class="el-icon-stopwatch"></i>
                      空气指数: {{weatherData.aqi}}</p>
                    <p><i class="el-icon-wind-power"></i>
                      风向: {{weatherData.direct}}</p>
                    <p><i class="el-icon-timer"></i>
                      风力: {{weatherData.power}}</p>
                  </div>
                  <div class="weatherfoot">数据来源：聚合API</div>
                </div>
                <tally
                  class="marginbtm"
                  :visit="visit"
                ></tally>
                <div
                  class="block marginbtm box"
                  v-if="boxShow"
                  @mouseenter="inAdBlock"
                  @mouseleave="outAdBlock"
                >
                  <div
                    id="closeIcon"
                    @click="changeBoxShow"
                    v-show="shutdownAD"
                  >x</div>
                  <title-boxs
                    title="广告位"
                    :img="boximg"
                  ></title-boxs>
                </div>
              </aside>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <!-- 底部 -->
    <footer>
      <common-bottom></common-bottom>
    </footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue"; //头部
import CommonBottom from "./CommonBottom.vue"; //底部
import PersonalDetails from "./sidebar/personalDetails.vue"; //个人简介
import Tally from "./sidebar/tally.vue"; //计数
import TitleBoxs from "@/components/TitleBox/titleBoxs.vue"; //广告位
import CheckBox from "@/components/checkbox/checkbox.vue"; //大屏按钮
import axios from "axios";
export default {
  name: "commonLayout",
  components: {
    CommonHeader,
    CommonBottom,
    PersonalDetails,
    Tally,
    TitleBoxs,
    CheckBox,
  },
  data() {
    return {
      weatherData: {
        aqi: "62", // 空气质量
        direct: "西风",
        humidity: "49", //湿度
        info: "晴", // 天气情况
        power: "2级", //风力
        temperature: "30", // 温度
        wid: "00",
      },
      location: "合肥",
      visit: 0,
      boximg: "https://img1.baidu.com/it/u=30571864,657645104&fm=26&fmt=auto",
      boxShow: true,
      shutdownAD: false,
    };
  },
  methods: {
    showTransition() {
      window.pageYOffset = document.documentElement.scrollTop = 0;
    },
    changeBoxShow() {
      this.boxShow = false;
    },
    //进入和退出广告块
    inAdBlock() {
      this.shutdownAD = true;
    },
    outAdBlock() {
      this.shutdownAD = false;
    },
  },
  mounted() {
    axios.get("/juheapi/weather").then((res) => {
      this.weatherData = res.data.data?.result?.realtime ?? this.weatherData;
    });
    //被访问次数
    axios.get("/read").then((res) => {
      this.visit = res.data.data;
    });
  },
};
</script>

<style scoped lang="scss">
.commonLayout {
  // 导航条
  .common-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
  // 中心部分
  section {
    margin-top: 80px;
    .slideshowBox {
      margin-right: 7px;
    }
  }
  // 侧边栏
  aside {
    width: 100%;
    .marginbtm {
      margin-bottom: 20px;
      width: 100%;
    }
    .weather {
      font-family: "Courier New", Courier, monospace;
      color: black;
      height: 255px;
      background: rgba(255, 255, 255, 0.7);
      background-position: center;
      background-size: 100%;
      z-index: 3;
      margin-bottom: 10px;
      & .itemtext {
        font-size: 20px;
        margin: 3px;
      }
      & .smalltext {
        font-size: 18px;
      }
      .weatherheader {
        margin-bottom: 15px;
      }
      .locationtext {
        font-size: 20px;
      }
    }
  }
}
.weatherfoot {
  text-align: end;
  margin-top: 20px;
}
.box {
  position: relative;
}
#closeIcon {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 35px;
  color: red;
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
